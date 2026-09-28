import { useEffect, useState } from "react";
import { FaLock, FaSave, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../services/authService";

function ProfileForm({ onChangePassword }) {
  const { user, updateCurrentUser } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", flatNumber: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      flatNumber: user?.flatNumber || "",
    });
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateProfile(form);
      updateCurrentUser(updated);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-2xl font-bold text-slate-800">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
            className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
          />
          <span className="text-xs text-slate-400 mt-1 block">
            Email is your login identifier.
          </span>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-2">
            Office / Flat Number
          </label>
          <input
            type="text"
            value={form.flatNumber}
            onChange={(e) => setForm({ ...form, flatNumber: e.target.value })}
            placeholder="e.g. Admin Suite 101"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-end gap-4 border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={onChangePassword}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          <FaLock />
          Change Password
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 transition disabled:opacity-60 shadow-sm"
        >
          {saving && <FaSpinner className="animate-spin" />}
          <FaSave />
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
