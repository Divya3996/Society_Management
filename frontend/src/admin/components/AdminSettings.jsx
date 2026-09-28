import { useState, useEffect } from "react";
import { FaUserShield, FaSave, FaLock, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile, changePassword } from "../../services/authService";
import { toast } from "react-toastify";

function AdminSettings() {
  const { user, updateCurrentUser } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setSavingProfile(true);
    try {
      const updated = await updateProfile(profileForm);
      updateCurrentUser(updated);
      toast.success("Admin profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error("Please fill in current and new password.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      toast.success("Password changed successfully.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">
          <FaUserShield />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Account</h2>
          <p className="text-slate-500">Manage your administrator credentials and security.</p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              placeholder="Admin Name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Email Address</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              placeholder="+91 9876543210"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={savingProfile}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-60 shadow-sm"
          >
            {savingProfile && <FaSpinner className="animate-spin" />}
            <FaSave />
            Save Profile Info
          </button>
        </div>
      </form>

      <hr className="my-8 border-slate-200" />

      {/* Password Change Form */}
      <form onSubmit={handleSavePassword}>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FaLock className="text-indigo-600 text-base" />
            Change Password
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Ensure your account uses a long, unique password.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={savingPassword}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition disabled:opacity-60"
          >
            {savingPassword && <FaSpinner className="animate-spin" />}
            <FaLock />
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminSettings;