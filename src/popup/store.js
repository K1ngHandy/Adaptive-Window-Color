import { configureStore, createSlice } from '@reduxjs/toolkit';

const extensionSlice = createSlice({
  name: 'extension',
  initialState: {
    enabled: true,
    currentColor: null
  },
  reducers: {
    toggleEnabled: (state) => {
      state.enabled = !state.enabled;
    },
    setEnabled: (state, action) => {
      state.enabled = action.payload;
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
    }
  }
});

export const { toggleEnabled, setEnabled, setCurrentColor } = extensionSlice.actions;

export const store = configureStore({
  reducer: {
    extension: extensionSlice.reducer
  }
});
