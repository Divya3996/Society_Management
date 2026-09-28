import { useState, useEffect } from "react";
import { FaBell, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { updateNotificationPreferences } from "../../services/authService";

function NotificationSettings() {
  const { user, updateCurrentUser } = useAuth();
  const [settings, setSettings] = useState({
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
    emergencyAlerts: true,
  });

  useEffect(() => {
    if (user?.notificationPreferences) {
      setSettings((current) => ({ ...current, ...user.notificationPreferences }));
    }
  }, [user]);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      const updated = await updateNotificationPreferences(settings);
      updateCurrentUser(updated);
      toast.success("Notification preferences saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save notification preferences.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600 text-2xl">
          <FaBell />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Notification Settings</h2>
          <p className="text-slate-500">Configure how notifications and alerts are dispatched.</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center justify-between border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition cursor-pointer">
          <div>
            <h4 className="font-semibold text-slate-800">Email Notifications</h4>
            <p className="text-sm text-slate-500">Send invoices and critical notice copies to email.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotif}
            onChange={() => toggle("emailNotif")}
            className="w-5 h-5 accent-yellow-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition cursor-pointer">
          <div>
            <h4 className="font-semibold text-slate-800">SMS Notifications</h4>
            <p className="text-sm text-slate-500">Dispatch SMS alerts for urgent maintenance issues.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.smsNotif}
            onChange={() => toggle("smsNotif")}
            className="w-5 h-5 accent-yellow-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition cursor-pointer">
          <div>
            <h4 className="font-semibold text-slate-800">In-App Push Alerts</h4>
            <p className="text-sm text-slate-500">Instant browser notifications for new complaints and visitors.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.pushNotif}
            onChange={() => toggle("pushNotif")}
            className="w-5 h-5 accent-yellow-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition cursor-pointer">
          <div>
            <h4 className="font-semibold text-slate-800">Emergency Broadcast</h4>
            <p className="text-sm text-slate-500">High-priority alerts override quiet hours.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.emergencyAlerts}
            onChange={() => toggle("emergencyAlerts")}
            className="w-5 h-5 accent-yellow-500 cursor-pointer"
          />
        </label>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition shadow-sm"
        >
          <FaSave />
          Save Notification Settings
        </button>
      </div>
    </div>
  );
}

export default NotificationSettings;
