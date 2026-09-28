import { useState } from "react";
import { FaTimes, FaPoll, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { createPoll } from "../../services/pollService";

function CreatePollModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", ""],
    expiresAt: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ""] });
  };

  const removeOption = (index) => {
    if (formData.options.length <= 2) {
      toast.warning("A poll must have at least 2 options.");
      return;
    }
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      toast.error("Please enter a poll question.");
      return;
    }

    const validOptions = formData.options.filter(opt => opt.trim() !== "");
    if (validOptions.length < 2) {
      toast.error("Please provide at least 2 valid options.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        question: formData.question,
        options: validOptions,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : null,
      };

      await createPoll(payload);
      toast.success("Poll created successfully!");
      setFormData({
        question: "",
        options: ["", ""],
        expiresAt: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create poll.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto flex flex-col">
          
          <div className="flex justify-between items-center border-b px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <FaPoll />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Create New Poll</h2>
                <p className="text-slate-500 text-sm mt-1">Ask a question and collect resident opinions.</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center">
              <FaTimes />
            </button>
          </div>

          <div className="p-8 flex-1">
            <form id="pollForm" onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block mb-2 font-semibold text-slate-700">Poll Question <span className="text-red-500">*</span></label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g. Should we install solar panels on the clubhouse?"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Voting Options <span className="text-red-500">*</span></label>
                <div className="space-y-3">
                  {formData.options.map((opt, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="w-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addOption}
                  className="mt-4 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition flex items-center gap-2"
                >
                  <FaPlus size={12} /> Add Another Option
                </button>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Expiry Date (Optional)</label>
                <input
                  type="date"
                  name="expiresAt"
                  value={formData.expiresAt}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-sm text-slate-500 mt-2">If left blank, the poll will remain active until manually closed.</p>
              </div>

            </form>
          </div>

          <div className="border-t px-8 py-5 bg-slate-50 flex justify-end gap-3 shrink-0 rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="pollForm"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Publish Poll"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default CreatePollModal;