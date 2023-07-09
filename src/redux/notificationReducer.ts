import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type notificationType = {
  notifications: any[];
};

const initialState: notificationType = {
  notifications: [],
};

const NotificationReducer = createSlice({
  name: "notifications-reducer",
  initialState,
  reducers: {
    notificationAction: (state, action: PayloadAction<notificationType>) => {
      const newItems = action.payload.notifications;
      state.notifications.push(...newItems);
    },

    removeNotification: (state, action) => {
      const itemId = action.payload.bookingID;
      state.notifications = state.notifications.filter(
        (id) => id.bookingID !== itemId
      );
    },

    clearNotification: (state) => {
      state.notifications = [];
    },
  },
});

export const { notificationAction, clearNotification, removeNotification } =
  NotificationReducer.actions;
export default NotificationReducer.reducer;
