import { useEffect } from "react";
import { useNotificationStore } from "./Store/notificationStore";
import { useAuthStore } from "./Store/authStore";
import Sidebar from "./Components/Sidebar";

export default function NotificationsPage() {
  const { userEmail } = useAuthStore();
  const { markAsRead, clearNotifications, getUserNotifications } =
    useNotificationStore();

  // Filter notifications for current user
  const userNotifications = getUserNotifications(userEmail);

  useEffect(() => {
    userNotifications.forEach((notification) => {
      if (!notification.read) {
        markAsRead(notification.id);
      }
    });
  }, [userEmail]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-gray-300 pb-4 bg-white py-6 px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-purple-700 ml-18">
              Notifications
            </h2>
          </div>
          <button
            onClick={clearNotifications}
            className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
          >
            Clear All Notifications
          </button>
        </div>
        <div className="p-4 bg-purple-50 min-h-[calc(110vh-120px)]">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {userNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <h3 className="text-2xl font-medium text-purple-600">
                  No notifications yet
                </h3>
                <p className="text-purple-400 mt-4 text-lg">
                  Your notifications will appear here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-purple-100">
                {userNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-6 py-4 hover:bg-purple-50 cursor-pointer transition-colors ${
                      !notification.read ? "bg-purple-50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <p className="text-base text-gray-800 font-medium">
                      {notification.message}
                    </p>
                    <p className="text-sm text-purple-400 mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
