import { useState } from "react";
import { FaShieldAlt, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

function SecuritySettings() {
  const [autoLogout, setAutoLogout] = useState(
    () => localStorage.getItem("dsm_auto_logout") !== "false"
  );

  const handleSave = () => {
    localStorage.setItem("dsm_auto_logout", String(autoLogout));
    window.dispatchEvent(new Event("dsm-security-settings-changed"));
    toast.success("Session security preference saved.");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 text-2xl">
          <FaShieldAlt />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Session Security</h2>
          <p className="text-slate-500">Control the inactivity protection applied in this browser.</p>
        </div>
      </div>

      <label className="flex items-center justify-between border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition cursor-pointer">
        <div>
          <h4 className="font-semibold text-slate-800">Automatic session sign-out</h4>
          <p className="text-sm text-slate-500">Sign out after 30 minutes without activity on this device.</p>
        </div>
        <input
          type="checkbox"
          checked={autoLogout}
          onChange={(event) => setAutoLogout(event.target.checked)}
          className="w-5 h-5 accent-red-600 cursor-pointer"
        />
      </label>

      <p className="mt-4 text-sm text-slate-500">Passwords and access control are enforced by the API. Multi-factor authentication, IP allowlists, and database backups require infrastructure services and are intentionally not represented as inactive switches.</p>

      <div className="flex justify-end mt-8">
        <button type="button" onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition shadow-sm">
          <FaSave /> Save Session Security
        </button>
      </div>
    </div>
  );
}

export default SecuritySettings;
