import { useState, useEffect } from "react";
import { FaTimes, FaBullhorn, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { createNotice, updateNotice } from "../../services/noticeService";
import { publishNotification } from "../../services/notificationStore";

function CreateNoticeModal({ isOpen, onClose, notice = null, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    priority: "Normal",
    description: "",
    expiresAt: "",
    isActive: true,
  });

  useEffect(() => {
    if (isOpen) {
      if (notice) {
        setFormData({
          title: notice.title || "",
          category: notice.category || "General",
          priority: notice.priority || "Normal",
          description: notice.description || "",
          expiresAt: notice.expiresAt
            ? new Date(notice.expiresAt).toISOString().split("T")[0]
            : "",
          isActive: notice.isActive !== undefined ? notice.isActive : true,
        });
      } else {
        setFormData({
          title: "",
          category: "General",
          priority: "Normal",
          description: "",
          expiresAt: "",
          isActive: true,
        });
      }
    }
  }, [isOpen, notice]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please provide both a notice title and description.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        priority: formData.priority,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined,
        isActive: formData.isActive,
      };

      if (notice?._id) {
        await updateNotice(notice._id, payload);
        toast.success("Notice updated successfully!");
      } else {
        await createNotice(payload);
        toast.success("Notice published successfully!");
        publishNotification({
          title: "Notice published",
          message: payload.title,
          path: "/admin/notices",
          type: payload.priority === "Urgent" ? "warning" : "info",
        });
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save notice.");
    } finally {
      setLoading(false);
    }
  };

  const priorityBadgeClasses = {
    Normal: "bg-blue-100 text-blue-700",
    Important: "bg-amber-100 text-amber-700",
    Urgent: "bg-red-100 text-red-700 font-bold",
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center border-b px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <FaBullhorn />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {notice ? "Edit Notice" : "Create New Notice"}
                </h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  {notice
                    ? "Update and republish this announcement."
                    : "Broadcast an announcement to all society residents."}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-slate-500 transition"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto flex-1">
            <form id="noticeForm" onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Notice Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Annual General Body Meeting & Budget Review"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Category & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="General">General</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Event">Event</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Rules">Rules & Regulations</option>
                    <option value="Parking">Parking</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Important">Important</option>
                    <option value="Urgent">Urgent (Red Alert)</option>
                  </select>
                </div>
              </div>

              {/* Expiry Date & Active Checkbox */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">
                    Expiry Date <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="pt-6">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                    <span className="font-semibold text-slate-700">
                      Active / Published to residents
                    </span>
                  </label>
                  <p className="text-xs text-slate-500 ml-8 mt-1">
                    Uncheck if you want to keep this notice as a draft.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-semibold text-slate-700">
                  Notice Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Type the full message details for the residents..."
                  className="w-full rounded-2xl border border-slate-300 px-5 py-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Live Preview Box */}
              <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Resident View Preview
                  </span>
                  <div className="flex gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        priorityBadgeClasses[formData.priority] || "bg-slate-100"
                      }`}
                    >
                      {formData.priority}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-200 text-slate-700 font-medium">
                      {formData.category}
                    </span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-800">
                  {formData.title || "Your Notice Title Here"}
                </h4>
                <p className="text-slate-600 mt-2 whitespace-pre-line text-sm line-clamp-4">
                  {formData.description || "Notice content will preview here as you type..."}
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 bg-slate-50 border-t shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 transition font-medium text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="noticeForm"
              disabled={loading}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <FaSpinner className="animate-spin" />}
              {notice ? "Save Changes" : "Publish Notice"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNoticeModal;