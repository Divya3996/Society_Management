import { useState } from "react";
import { FaSpinner, FaTimes, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { createResident } from "../../services/userService";

const initialForm = { name: "", email: "", password: "", phone: "", flatNumber: "" };

function AddResidentModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  if (!isOpen) return null;

  const submit = async (event) => {
    event.preventDefault();
    if (form.password.length < 6) return toast.error("Password must contain at least 6 characters.");
    setSubmitting(true);
    try {
      await createResident(form);
      toast.success("Resident added successfully.");
      setForm(initialForm);
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add resident.");
    } finally {
      setSubmitting(false);
    }
  };

  const field = (label, name, type = "text", required = false) => (
    <label className="block text-sm font-semibold text-slate-700">
      {label}{required && <span className="text-red-500"> *</span>}
      <input
        required={required}
        type={type}
        name={name}
        value={form[name]}
        onChange={(event) => setForm({ ...form, [name]: event.target.value })}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <form onSubmit={submit} className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
          <div className="flex items-center gap-3"><FaUserPlus className="text-2xl text-blue-600" /><div><h2 className="text-2xl font-bold">Add resident</h2><p className="text-sm text-slate-500">Create a secure resident account.</p></div></div>
          <button type="button" onClick={onClose} aria-label="Close"><FaTimes /></button>
        </div>
        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
          {field("Full name", "name", "text", true)}
          {field("Email", "email", "email", true)}
          {field("Temporary password", "password", "password", true)}
          {field("Phone", "phone", "tel")}
          {field("Flat number", "flatNumber", "text", true)}
        </div>
        <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-5 py-2.5">Cancel</button>
          <button disabled={submitting} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60">
            {submitting && <FaSpinner className="animate-spin" />} Add resident
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddResidentModal;
