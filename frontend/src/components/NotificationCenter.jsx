import { useEffect, useState } from "react";
import { FaBell, FaCheck, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  readNotifications,
  writeNotifications,
  subscribeToNotifications,
} from "../services/notificationStore";

function timeAgo(date) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function NotificationCenter() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(readNotifications);

  useEffect(() => {
    const sync = () => setNotifications(readNotifications());
    return subscribeToNotifications(sync);
  }, []);

  const update = (next) => {
    setNotifications(next);
    writeNotifications(next);
  };

  const markAllRead = () => update(notifications.map((item) => ({ ...item, read: true })));
  const clearAll = () => update([]);
  const unreadCount = notifications.filter((item) => !item.read).length;

  const openNotification = (item) => {
    update(notifications.map((entry) => entry.id === item.id ? { ...entry, read: true } : entry));
    setOpen(false);
    if (item.path) navigate(item.path);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <button type="button" aria-label="Close notifications" className="fixed inset-0 cursor-default" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <div>
                <h2 className="font-semibold text-slate-800">Notifications</h2>
                <p className="text-xs text-slate-500">{unreadCount ? `${unreadCount} unread update${unreadCount === 1 ? "" : "s"}` : "You're all caught up"}</p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && <button type="button" onClick={markAllRead} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600" title="Mark all as read" aria-label="Mark all as read"><FaCheck /></button>}
                {notifications.length > 0 && <button type="button" onClick={clearAll} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Clear notifications" aria-label="Clear notifications"><FaTrash /></button>}
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-slate-500">No notifications yet.</div>
              ) : notifications.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => openNotification(item)}
                  className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 ${item.read ? "bg-white" : "bg-blue-50/60"}`}
                >
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.read ? "bg-slate-200" : item.type === "success" ? "bg-emerald-500" : item.type === "warning" ? "bg-amber-500" : "bg-blue-500"}`} />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-800">{item.title}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-500">{item.message}</span>
                    <span className="mt-1 block text-[11px] text-slate-400">{timeAgo(item.createdAt)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationCenter;
