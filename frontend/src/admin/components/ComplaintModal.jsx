import { useState, useEffect } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { createComplaint, updateComplaint } from "../../services/complaintService";
import { getAllResidents } from "../../services/userService";

function ComplaintModal({ isOpen, onClose, onSubmit, complaint = null }) {
  const [residents, setResidents] = useState([]);
  const [fetchingResidents, setFetchingResidents] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    residentId: "",
    subject: "",
    category: "",
    priority: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      const fetchResidents = async () => {
        setFetchingResidents(true);
        try {
          const data = await getAllResidents();
          setResidents(data);
        } catch (error) {
          toast.error("Failed to load residents");
        } finally {
          setFetchingResidents(false);
        }
      };
      fetchResidents();

      setForm({
        residentId: complaint?.resident?._id || complaint?.resident?.id || complaint?.resident || "",
        subject: complaint?.subject || "",
        category: complaint?.category || "",
        priority: complaint?.priority || "Medium",
        location: complaint?.location || "",
        description: complaint?.description || "",
      });
    }
  }, [isOpen, complaint]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((!complaint && !form.residentId) || !form.subject || !form.category || !form.priority || !form.description) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        subject: form.subject,
        category: form.category,
        priority: form.priority,
        location: form.location,
        description: form.description,
      };
      if (complaint?._id) {
        await updateComplaint(complaint._id, payload);
        toast.success("Complaint updated successfully!");
      } else {
        await createComplaint({ ...payload, residentId: form.residentId });
        toast.success("Complaint registered successfully!");
      }
      if (onSubmit) onSubmit();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to register complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-start px-8 py-6 border-b bg-gradient-to-r from-red-50 to-orange-50 shrink-0">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">{complaint ? "Edit Complaint" : "Register Complaint"}</h2>
            <p className="text-slate-500 mt-2">{complaint ? "Update the complaint details." : "Fill in the details below to register a new complaint on behalf of a resident."}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-white transition flex items-center justify-center">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          <form id="complaintForm" onSubmit={handleSubmit}>
            
            {/* Resident Information */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-3xl">🏠</div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Resident Information</h3>
                <p className="text-slate-500">Select the resident logging the complaint.</p>
              </div>
            </div>

            <div className="mb-10">
              <label className="block mb-2 font-semibold text-slate-700">Resident Name *</label>
              <select
                name="residentId"
                value={form.residentId}
                onChange={handleChange}
                disabled={fetchingResidents || Boolean(complaint)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="">{fetchingResidents ? "Loading residents..." : "Select Resident"}</option>
                {residents.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.flatNumber || 'No Flat'})
                  </option>
                ))}
              </select>
            </div>

            {/* Complaint Details */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Complaint Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Category *</label>
                  <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none">
                    <option value="">Select Category</option>
                    <option value="Water Leakage">Water Leakage</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Parking">Parking</option>
                    <option value="Lift">Lift</option>
                    <option value="Security">Security</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Priority *</label>
                  <select name="priority" value={form.priority} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none">
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 font-semibold text-slate-700">Subject *</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Complaint title" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 font-semibold text-slate-700">Location</label>
                  <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Example: Basement Parking" className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 font-semibold text-slate-700">Description *</label>
                  <textarea rows="5" name="description" value={form.description} onChange={handleChange} placeholder="Describe the complaint..." className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:ring-2 focus:ring-red-500 outline-none" />
                </div>

              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-8 py-5 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition font-medium">
            Cancel
          </button>
          <button type="submit" form="complaintForm" disabled={loading} className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
            {loading ? <FaSpinner className="animate-spin" /> : null} {complaint ? "Save Changes" : "Submit Complaint"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintModal;
