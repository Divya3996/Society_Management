import { useState } from "react";
import { FaTimes, FaUserPlus, FaSpinner } from "react-icons/fa";
import { createVisitor } from "../../../services/visitorService";
import { toast } from "react-toastify";
import { publishNotification } from "../../../services/notificationStore";

function InviteVisitorModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicleNumber: "",
    purpose: "",
    visitDate: "",
    visitTime: "",
    guests: 1,
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.purpose) {
      toast.error("Name and Purpose are required.");
      return;
    }

    if (!formData.visitDate) {
      toast.error("Please select an expected visit date.");
      return;
    }

    setLoading(true);

    try {
      // Combine date and time to create a valid ISO Date string
      let expectedDate = formData.visitDate;
      if (formData.visitTime) {
        expectedDate = new Date(`${formData.visitDate}T${formData.visitTime}`).toISOString();
      }

      // Combine guests into notes if needed since schema doesn't have guests
      let finalNotes = formData.notes;
      if (formData.guests > 1) {
        finalNotes = `Guests: ${formData.guests}. ${finalNotes}`;
      }

      const payload = {
        name: formData.name,
        phone: formData.phone,
        vehicleNumber: formData.vehicleNumber,
        purpose: formData.purpose,
        expectedDate,
        notes: finalNotes,
      };

      await createVisitor(payload);
      toast.success("Visitor pass generated successfully!");
      publishNotification({
        title: "Visitor pass created",
        message: `${formData.name} was added to your visitor list.`,
        path: "/resident/visitors",
        type: "success",
      });
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        vehicleNumber: "",
        purpose: "",
        visitDate: "",
        visitTime: "",
        guests: 1,
        notes: "",
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to invite visitor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Invite Visitor</h2>
            <p className="text-slate-500 text-sm mt-1">Fill in the visitor details below.</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <form id="inviteVisitorForm" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-medium text-slate-700">Visitor Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter visitor name"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                  placeholder="GJ03AB1234"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">Purpose <span className="text-red-500">*</span></label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select Purpose</option>
                  <option value="Guest">Guest</option>
                  <option value="Relative">Relative</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Service">Service / Repair</option>
                  <option value="Official">Official</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">Visit Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">Visit Time</label>
                <input
                  type="time"
                  name="visitTime"
                  value={formData.visitTime}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block mb-2 font-medium text-slate-700">Additional Notes</label>
              <textarea
                rows="3"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Any additional information..."
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-slate-50 shrink-0 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="inviteVisitorForm"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaUserPlus />}
            Generate Visitor Pass
          </button>
        </div>
      </div>
    </div>
  );
}

export default InviteVisitorModal;