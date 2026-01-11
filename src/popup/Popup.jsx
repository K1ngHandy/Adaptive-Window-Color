import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEnabled, setEnabled } from './store';
import './popup.css';

function Popup() {
  const dispatch = useDispatch();
  const enabled = useSelector(state => state.extension.enabled);

  useEffect(() => {
    // Get initial status from background script
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
      if (response) {
        dispatch(setEnabled(response.enabled));
      }
    });
  }, [dispatch]);

  const handleToggle = () => {
    const newEnabled = !enabled;
    dispatch(toggleEnabled());
    
    // Send message to background script
    chrome.runtime.sendMessage({ 
      action: 'toggleExtension', 
      enabled: newEnabled 
    });
  };

  return (
    <div className="popup-container">
      <div className="header">
        <h1 className="title">Adaptive Window Color</h1>
        <p className="subtitle">Dynamic browser theming</p>
      </div>
      
      <div className="content">
        <div className="feature-description">
          <p>Automatically adapts your browser theme to match the dominant color of the webpage you&apos;re viewing.</p>
        </div>

        <div className="toggle-container">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={enabled}
              onChange={handleToggle}
              className="toggle-checkbox"
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">
              {enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>

        <div className="info">
          <p className="info-text">
            {enabled 
              ? 'Theme will update as you browse' 
              : 'Enable to start adapting colors'}
          </p>
        </div>
      </div>

      <div className="footer">
        <p className="version">Version 1.0.0</p>
      </div>
    </div>
  );
}

export default Popup;
