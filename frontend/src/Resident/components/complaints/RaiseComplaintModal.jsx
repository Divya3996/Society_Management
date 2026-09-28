import { useState, useEffect } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { createComplaint, updateComplaint } from "../../../services/complaintService";
import { publishNotification } from "../../../services/notificationStore";

function RaiseComplaintModal({ isOpen, onClose, onSuccess, complaint = null }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    category: "",
    priority: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (complaint) {
      setForm({
        subject: complaint.subject || "",
        category: complaint.category || "",
        priority: complaint.priority || "",
        location: complaint.location || "",
        description: complaint.description || "",
      });
    } else {
      setForm({
        subject: "",
        category: "",
        priority: "",
        location: "",
        description: "",
      });
    }
  }, [complaint, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.subject.trim() || !form.category || !form.priority || !form.description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      if (complaint) {
        await updateComplaint(complaint._id, {
          subject: form.subject,
          category: form.category,
          priority: form.priority,
          location: form.location,
          description: form.description,
        });
        toast.success("Complaint updated successfully!");
      } else {
        await createComplaint({
          subject: form.subject,
          category: form.category,
          priority: form.priority,
          location: form.location,
          description: form.description,
        });
        toast.success("Complaint submitted successfully!");
        publishNotification({
          title: "Complaint submitted",
          message: `${form.subject} is now being reviewed by society management.`,
          path: "/resident/complaints",
          type: "info",
        });
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold">
              {complaint ? "Edit Complaint" : "Raise Complaint"}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {complaint
                ? "Update details of your pending complaint."
                : "Submit a new complaint to the society management."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto p-8">
          <form id="raiseComplaintForm" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Complaint Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter complaint subject"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-slate-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Lift">Lift</option>
                  <option value="Parking">Parking</option>
                  <option value="Security">Security</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Flat 402, Basement Parking, 3rd Floor Lobby"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your complaint in detail..."
                className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 px-8 py-5 flex justify-end gap-4 shrink-0 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="raiseComplaintForm"
            disabled={loading}
            className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin" /> : null}
            {complaint ? "Update Complaint" : "Submit Complaint"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RaiseComplaintModal;
