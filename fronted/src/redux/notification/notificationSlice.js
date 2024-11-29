import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationsCount: 0,  // Add this
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsCount(state, action) {
      state.notificationsCount = action.payload; // Update the count
    },
    // Other notification actions if needed
  },
});

export const { setNotificationsCount } = notificationSlice.actions;
export default notificationSlice.reducer;
