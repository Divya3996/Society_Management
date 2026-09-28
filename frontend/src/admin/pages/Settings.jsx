import SocietySettings from "../components/SocietySettings";
import AdminSettings from "../components/AdminSettings";
import NotificationSettings from "../components/NotificationSettings";
import SecuritySettings from "../components/SecuritySettings";

function Settings() {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Settings</h1>
        <p className="mt-2 text-slate-500">
          Manage society configuration, admin preferences, notifications, and security options.
        </p>
      </div>

      <SocietySettings />

      <AdminSettings />

      <NotificationSettings />

      <SecuritySettings />
    </>
  );
}

export default Settings;