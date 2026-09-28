import { useEffect, useState } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateParking } from "../../../services/parkingService";

function EditVehicleModal({ isOpen, onClose, vehicle, onSuccess }) {
  const [form, setForm] = useState({ vehicleType: "Car", vehicleNumber: "", vehicleName: "" });
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { if (vehicle) setForm({ vehicleType: vehicle.vehicleType || "Car", vehicleNumber: vehicle.vehicleNumber || "", vehicleName: vehicle.vehicleName || "" }); }, [vehicle]);
  if (!isOpen || !vehicle) return null;
  const submit = async (event) => { event.preventDefault(); setSubmitting(true); try { await updateParking(vehicle._id, form); toast.success("Parking request updated."); onSuccess?.(); } catch (error) { toast.error(error.response?.data?.message || "Could not update this parking request."); } finally { setSubmitting(false); } };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"><form onSubmit={submit} className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"><div className="flex items-center justify-between bg-slate-800 px-6 py-5 text-white"><div><h2 className="text-xl font-bold">Edit vehicle</h2><p className="text-sm text-slate-300">Only pending requests can be changed.</p></div><button type="button" onClick={onClose} aria-label="Close"><FaTimes /></button></div><div className="space-y-5 p-6"><label className="block font-medium">Vehicle type<select name="vehicleType" value={form.vehicleType} onChange={(e) => setForm({ ...form, vehicleType: e.target.value })} className="mt-2 w-full rounded-xl border p-3"><option>Car</option><option>Bike</option><option>Scooter</option><option>Other</option></select></label><label className="block font-medium">Registration number<input required name="vehicleNumber" value={form.vehicleNumber} onChange={(e) => setForm({ ...form, vehicleNumber: e.target.value })} className="mt-2 w-full rounded-xl border p-3" /></label><label className="block font-medium">Vehicle name<input name="vehicleName" value={form.vehicleName} onChange={(e) => setForm({ ...form, vehicleName: e.target.value })} className="mt-2 w-full rounded-xl border p-3" /></label></div><div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4"><button type="button" onClick={onClose} className="rounded-xl border px-5 py-2.5">Cancel</button><button disabled={submitting} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60">{submitting && <FaSpinner className="animate-spin" />}Save changes</button></div></form></div>;
}
export default EditVehicleModal;
