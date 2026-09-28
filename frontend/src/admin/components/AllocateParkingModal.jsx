import { useState, useEffect } from "react";
import { FaTimes, FaParking, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { allocateParking, updateParking } from "../../services/parkingService";
import { getAllResidents } from "../../services/userService";

function AllocateParkingModal({ isOpen, onClose, slot, onSuccess }) {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [formData, setFormData] = useState({
    residentId: "",
    slotNumber: "",
    vehicleType: "Car",
    vehicleNumber: "",
    vehicleName: "",
    status: "Active"
  });

  // Fetch residents for dropdown
  useEffect(() => {
    if (isOpen && !slot) {
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
    }
  }, [isOpen, slot]);

  // Populate form if editing
  useEffect(() => {
    if (isOpen) {
      if (slot) {
        setFormData({
          residentId: slot.resident?._id || slot.resident?.id || slot.resident || "",
          slotNumber: slot.slotNumber || "",
          vehicleType: slot.vehicleType || "Car",
          vehicleNumber: slot.vehicleNumber || "",
          vehicleName: slot.vehicleName || "",
          status: slot.status || "Active"
        });
      } else {
        setFormData({
          residentId: "",
          slotNumber: "",
          vehicleType: "Car",
          vehicleNumber: "",
          vehicleName: "",
          status: "Active"
        });
      }
    }
  }, [isOpen, slot]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.slotNumber || !formData.vehicleNumber || !formData.vehicleType) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!slot && !formData.residentId) {
      toast.error("Please select a resident.");
      return;
    }

    setLoading(true);
    try {
      if (slot) {
        await updateParking(slot._id || slot.id, formData);
        toast.success("Parking slot updated successfully.");
      } else {
        await allocateParking(formData);
        toast.success("Parking slot allocated successfully.");
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save parking details.");
    } finally {
      setLoading(false);
    }
  };

  const selectedResident = slot 
    ? slot.resident 
    : residents.find((r) => r.id === formData.residentId);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col">
          
          <div className="flex justify-between items-center border-b px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <FaParking />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {slot ? "Edit Parking Slot" : "Allocate Parking"}
                </h2>
                <p className="text-slate-500 text-sm">
                  {slot ? "Update existing parking details." : "Assign a parking slot to a resident."}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center transition-colors">
              <FaTimes />
            </button>
          </div>

          <div className="p-8 flex-1">
            <form id="parkingForm" onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!slot && (
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">Resident <span className="text-red-500">*</span></label>
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
                )}

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Parking Slot Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="slotNumber"
                    value={formData.slotNumber}
                    onChange={handleChange}
                    disabled={!!slot} // Don't allow changing slot number in edit mode
                    placeholder="e.g. A-01, B-12"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Vehicle Type <span className="text-red-500">*</span></label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Vehicle Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="e.g. MH02AB1234"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Vehicle Name / Model</label>
                  <input
                    type="text"
                    name="vehicleName"
                    value={formData.vehicleName}
                    onChange={handleChange}
                    placeholder="e.g. Honda City"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {slot && (
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Released">Released</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Allocation Preview */}
              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Allocation Preview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Resident</p>
                    <p className="font-medium text-slate-800">{selectedResident?.name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Flat</p>
                    <p className="font-medium text-slate-800">{selectedResident?.flatNumber || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Slot</p>
                    <p className="font-medium text-slate-800">{formData.slotNumber || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Vehicle</p>
                    <p className="font-medium text-slate-800">{formData.vehicleNumber || "—"}</p>
                  </div>
                </div>
              </div>

            </form>
          </div>

          <div className="border-t px-8 py-5 flex justify-end gap-3 bg-slate-50 shrink-0 rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="parkingForm"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <FaSpinner className="animate-spin" /> : null}
              {slot ? "Update Parking" : "Allocate Parking"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default AllocateParkingModal;
