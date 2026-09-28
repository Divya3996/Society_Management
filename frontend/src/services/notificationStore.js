const STORAGE_KEY = "dsm_notifications";
const EVENT_NAME = "dsm-notifications-changed";

export const readNotifications = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const writeNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const subscribeToNotifications = (listener) => {
  window.addEventListener(EVENT_NAME, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(EVENT_NAME, listener);
    window.removeEventListener("storage", listener);
  };
};

export const publishNotification = ({ title, message, path = "/", type = "info" }) => {
  const notification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title,
    message,
    path,
    type,
    read: false,
    createdAt: new Date().toISOString(),
  };
  writeNotifications([notification, ...readNotifications()].slice(0, 30));
  return notification;
};
