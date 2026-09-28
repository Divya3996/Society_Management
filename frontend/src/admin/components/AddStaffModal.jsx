import { useState, useEffect } from "react";
import { FaTimes, FaUserTie, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { createStaff, updateStaff } from "../../services/staffService";

function AddStaffModal({ isOpen, onClose, staff, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Other",
    phone: "",
    email: "",
    salary: "",
    joinDate: "",
    shift: "Morning",
    status: "Active",
  });

  useEffect(() => {
    if (isOpen) {
      if (staff) {
        setForm({
          name: staff.name || "",
          role: staff.role || "Other",
          phone: staff.phone || "",
          email: staff.email || "",
          salary: staff.salary || "",
          joinDate: staff.joinDate ? new Date(staff.joinDate).toISOString().split("T")[0] : "",
          shift: staff.shift || "Morning",
          status: staff.status || "Active",
        });
      } else {
        setForm({
          name: "",
          role: "Other",
          phone: "",
          email: "",
          salary: "",
          joinDate: "",
          shift: "Morning",
          status: "Active",
        });
      }
    }
  }, [isOpen, staff]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.role) {
      toast.error("Name and Role are required.");
      return;
    }

    setLoading(true);
    try {
      if (staff) {
        await updateStaff(staff._id, form);
        toast.success("Staff member updated successfully.");
      } else {
        await createStaff(form);
        toast.success("Staff member added successfully.");
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save staff member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
              <FaUserTie />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {staff ? "Edit Staff Member" : "Add Staff Member"}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {staff ? "Update details of the staff member." : "Register a new staff member in the system."}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center transition text-slate-600">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto flex-1">
          <form id="staffForm" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block mb-2 font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Role <span className="text-red-500">*</span></label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Security Guard">Security Guard</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Manager">Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="staff@email.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Shift</label>
                <select
                  name="shift"
                  value={form.shift}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                  <option value="Full Day">Full Day</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Joining Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={form.joinDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="25000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-slate-700">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 bg-slate-50 border-t shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 transition font-medium text-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="staffForm"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && <FaSpinner className="animate-spin" />}
            {staff ? "Save Changes" : "Add Staff"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddStaffModal;