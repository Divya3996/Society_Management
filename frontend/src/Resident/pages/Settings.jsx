import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChangePasswordModal from "../../admin/components/ChangePasswordModal";
import { useAuth } from "../../hooks/useAuth";
import { updateNotificationPreferences } from "../../services/authService";
import {
  FaBell,
  FaLock,
  FaEnvelope,
  FaMobileAlt,
  FaSave,
} from "react-icons/fa";



function Settings() {
  const { user, updateCurrentUser } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (user?.notificationPreferences) {
      const preferences = user.notificationPreferences;
      setNotifications(preferences.pushNotif);
      setEmailNotifications(preferences.emailNotif);
      setSmsNotifications(preferences.smsNotif);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updated = await updateNotificationPreferences({
        pushNotif: notifications,
        emailNotif: emailNotifications,
        smsNotif: smsNotifications,
        emergencyAlerts: user?.notificationPreferences?.emergencyAlerts ?? true,
      });
      updateCurrentUser(updated);
      toast.success("Notification preferences saved.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save notification preferences.");
    }
  };

  return (
    <>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your account and notification preferences.
        </p>
      </div>

      <div className="space-y-6">

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaBell />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Choose how you want to receive updates.
              </p>
            </div>
          </div>

          <div className="space-y-5">

            {/* Push Notifications */}
            <div className="flex items-center justify-between gap-4">

              <div>
                <h3 className="font-semibold text-slate-800">
                  Push Notifications
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Receive important society updates.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition ${
                  notifications
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    notifications
                      ? "left-7"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between gap-4">

              <div className="flex items-start gap-3">

                <FaEnvelope className="text-slate-400 mt-1" />

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Email Notifications
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Receive notices and updates by email.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setEmailNotifications(!emailNotifications)
                }
                className={`relative w-12 h-6 rounded-full transition ${
                  emailNotifications
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    emailNotifications
                      ? "left-7"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between gap-4">

              <div className="flex items-start gap-3">

                <FaMobileAlt className="text-slate-400 mt-1" />

                <div>
                  <h3 className="font-semibold text-slate-800">
                    SMS Notifications
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Receive important alerts through SMS.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSmsNotifications(!smsNotifications)
                }
                className={`relative w-12 h-6 rounded-full transition ${
                  smsNotifications
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    smsNotifications
                      ? "left-7"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

          </div>

        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FaLock />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Security
              </h2>

              <p className="text-sm text-slate-500">
                Manage your account security.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-medium text-slate-700 transition"
          >
            Change Password
          </button>

        </div>

        {/* Save Button */}
        <div className="flex justify-end">

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            <FaSave />
            Save Settings
          </button>

        </div>

      </div>

      <ChangePasswordModal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} />

    </>
  );
}

export default Settings;
