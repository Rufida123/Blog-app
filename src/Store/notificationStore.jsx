import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notification) => {
        set((state) => ({
          notifications: [notification, ...state.notifications],
        }));
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id
              ? { ...notification, read: true }
              : notification
          ),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
      getUnreadCount: (userEmail) => {
        return get().notifications.filter(
          (n) => n.toUser === userEmail && !n.read
        ).length;
      },
      getUserNotifications: (userEmail) => {
        return get()
          .notifications.filter((n) => n.toUser === userEmail)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      },
    }),
    {
      name: "notification-storage",
    }
  )
);
