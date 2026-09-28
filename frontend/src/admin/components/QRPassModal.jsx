import { useState, useEffect } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { createVisitor } from "../../services/visitorService";
import { getAllResidents } from "../../services/userService";

function QRPassModal({ isOpen, onClose, onGenerate }) {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [formData, setFormData] = useState({
    residentId: "",
    name: "",
    phone: "",
    purpose: "",
    vehicleNumber: "",
    visitDate: "",
    visitTime: "",
    guests: 1,
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      const fetchResidents = async () => {
        setFetching(true);
        try {
          const data = await getAllResidents();
          setResidents(data);
        } catch (error) {
          toast.error("Failed to fetch residents");
        } finally {
          setFetching(false);
        }
      };
      fetchResidents();

      // Reset form
      setFormData({
        residentId: "",
        name: "",
        phone: "",
        purpose: "",
        vehicleNumber: "",
        visitDate: "",
        visitTime: "",
        guests: 1,
        notes: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.residentId) {
      toast.error("Please select a resident.");
      return;
    }

    if (!formData.name || !formData.purpose || !formData.visitDate) {
      toast.error("Name, Purpose, and Visit Date are required.");
      return;
    }

    setLoading(true);

    try {
      let expectedDate = formData.visitDate;
      if (formData.visitTime) {
        expectedDate = new Date(`${formData.visitDate}T${formData.visitTime}`).toISOString();
      }

      let finalNotes = formData.notes;
      if (formData.guests > 1) {
        finalNotes = `Guests: ${formData.guests}. ${finalNotes}`;
      }

      const payload = {
        residentId: formData.residentId,
        name: formData.name,
        phone: formData.phone,
        vehicleNumber: formData.vehicleNumber,
        purpose: formData.purpose,
        expectedDate,
        notes: finalNotes,
      };

      const newVisitor = await createVisitor(payload);
      toast.success("Visitor QR Pass generated successfully!");
      
      onGenerate(newVisitor); // Pass the newly created visitor to preview
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate QR Pass.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Generate Visitor QR Pass</h2>
                <p className="text-slate-500 text-sm mt-1">Create a secure QR Pass for a walk-in visitor.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white transition flex items-center justify-center text-slate-600"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8">
            <form id="qrPassForm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Resident Selection */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-semibold text-slate-700">Select Resident *</label>
                  <select
                    name="residentId"
                    value={formData.residentId}
                    onChange={handleChange}
                    disabled={fetching}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">{fetching ? "Loading residents..." : "Select Resident"}</option>
                    {residents.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.flatNumber || 'No Flat'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Visitor Name */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Visitor Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter visitor name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Purpose *</label>
                  <select 
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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

                {/* Vehicle */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Vehicle Number</label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="GJ03AB1234"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Visit Date *</label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Visit Time</label>
                  <input
                    type="time"
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                
                {/* Number of Visitors */}
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Number of Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="mt-6">
                <label className="block mb-2 font-semibold text-slate-700">Remarks</label>
                <textarea
                  rows="3"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Optional remarks..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-slate-50 border-t px-8 py-5 flex justify-end gap-4 rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition font-medium text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="qrPassForm"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <FaSpinner className="animate-spin" /> : null}
              Generate QR Pass
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QRPassModal;