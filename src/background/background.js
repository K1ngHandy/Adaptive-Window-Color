/**
 * Background service worker for managing theme updates
 */

// Configuration constants
const THEME_UPDATE_DELAY = 500; // ms to wait before updating theme
const INITIAL_LOAD_DELAY = 1000; // ms to wait on initial load
const TOOLBAR_DARKEN_FACTOR = 0.1;
const FRAME_LIGHTEN_FACTOR = 0.05;

// Store for current theme state
let isEnabled = true;

/**
 * Applies theme based on dominant color
 * @param {Object} color - RGB color object
 */
async function applyTheme(color) {
	if (!isEnabled) return;

	const { r, g, b } = color;

	// Get appropriate text color for contrast
	const textColor = getTextColor(r, g, b);

	// Create darker variant for toolbar
	const toolbarColor = darkenColor(r, g, b, TOOLBAR_DARKEN_FACTOR);

	// Create lighter variant for frame
	const frameColor = lightenColor(r, g, b, FRAME_LIGHTEN_FACTOR);

	const theme = {
		colors: {
			frame: [frameColor.r, frameColor.g, frameColor.b],
			toolbar: [toolbarColor.r, toolbarColor.g, toolbarColor.b],
			tab_text: textColor === '#FFFFFF' ? [255, 255, 255] : [0, 0, 0],
			tab_background_text:
				textColor === '#FFFFFF' ? [255, 255, 255] : [0, 0, 0],
			bookmark_text:
				textColor === '#FFFFFF' ? [255, 255, 255] : [0, 0, 0],
			ntp_background: [r, g, b],
			ntp_text: textColor === '#FFFFFF' ? [255, 255, 255] : [0, 0, 0],
		},
	};

	try {
		await updateThemePromise(theme);
	} catch (error) {
		console.error('Error applying theme:', error);
	}
}

/**
 * Promise wrapper for chrome.theme.update
 * @param {Object} theme
 */
function updateThemePromise(theme) {
	return new Promise((resolve, reject) => {
		try {
			chrome.theme.update(theme, () => {
				if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
				else resolve();
			});
		} catch (e) {
			reject(e);
		}
	});
}

/**
 * Promise wrapper for chrome.theme.reset
 */
function resetThemePromise() {
	return new Promise((resolve, reject) => {
		try {
			chrome.theme.reset(() => {
				if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
				else resolve();
			});
		} catch (e) {
			reject(e);
		}
	});
}

/**
 * Promise wrapper for chrome.tabs.sendMessage
 * @param {number} tabId
 * @param {Object} message
 */
function sendMessageToTab(tabId, message) {
	return new Promise((resolve, reject) => {
		try {
			chrome.tabs.sendMessage(tabId, message, (response) => {
				if (chrome.runtime.lastError)
					return reject(chrome.runtime.lastError);
				resolve(response);
			});
		} catch (e) {
			reject(e);
		}
	});
}

/**
 * Gets appropriate text color for background
 * @param {number} r - Red
 * @param {number} g - Green
 * @param {number} b - Blue
 * @returns {string} Text color hex
 */
function getTextColor(r, g, b) {
	const luminance = getLuminance(r, g, b);
	return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Calculates relative luminance
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {number} Luminance value
 */
function getLuminance(r, g, b) {
	const [rs, gs, bs] = [r, g, b].map((c) => {
		c = c / 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Darkens a color by a factor
 * @param {number} r - Red
 * @param {number} g - Green
 * @param {number} b - Blue
 * @param {number} factor - Darkening factor (0-1)
 * @returns {Object} Darkened RGB color
 */
function darkenColor(r, g, b, factor) {
	return {
		r: Math.max(0, Math.round(r * (1 - factor))),
		g: Math.max(0, Math.round(g * (1 - factor))),
		b: Math.max(0, Math.round(b * (1 - factor))),
	};
}

/**
 * Lightens a color by a factor
 * @param {number} r - Red
 * @param {number} g - Green
 * @param {number} b - Blue
 * @param {number} factor - Lightening factor (0-1)
 * @returns {Object} Lightened RGB color
 */
function lightenColor(r, g, b, factor) {
	return {
		r: Math.min(255, Math.round(r + (255 - r) * factor)),
		g: Math.min(255, Math.round(g + (255 - g) * factor)),
		b: Math.min(255, Math.round(b + (255 - b) * factor)),
	};
}

/**
 * Requests color from content script
 * @param {number} tabId - Tab ID
 */
async function updateThemeForTab(tabId) {
	if (!isEnabled) return;

	try {
		const response = await sendMessageToTab(tabId, { action: 'getColor' });
		if (response && response.color) {
			await applyTheme(response.color);
		}
	} catch (error) {
		// Tab might not have content script injected yet
		console.debug('Could not update theme for tab:', error.message);
	}
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && tab.active) {
		setTimeout(() => updateThemeForTab(tabId), THEME_UPDATE_DELAY);
	}
});

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
	setTimeout(() => updateThemeForTab(activeInfo.tabId), THEME_UPDATE_DELAY);
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'pageLoaded' && sender.tab) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0] && tabs[0].id === sender.tab.id) {
				updateThemeForTab(sender.tab.id);
			}
		});
	} else if (request.action === 'toggleExtension') {
		isEnabled = request.enabled;
		if (!isEnabled) {
			resetThemePromise().catch((err) =>
				console.error('Error resetting theme:', err)
			);
		} else {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				if (tabs[0]) {
					updateThemeForTab(tabs[0].id);
				}
			});
		}
		sendResponse({ success: true });
	} else if (request.action === 'getStatus') {
		sendResponse({ enabled: isEnabled });
	}
	return true;
});

// Initialize with current tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	if (tabs[0]) {
		setTimeout(() => updateThemeForTab(tabs[0].id), INITIAL_LOAD_DELAY);
	}
});
