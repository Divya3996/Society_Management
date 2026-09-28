import { useState } from "react";
import { FaCar, FaSpinner, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { allocateParking } from "../../../services/parkingService";

function AddVehicleModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({ slotNumber: "", vehicleType: "Car", vehicleNumber: "", vehicleName: "" });
  const [submitting, setSubmitting] = useState(false);
  if (!isOpen) return null;
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await allocateParking(form);
      toast.success("Parking request submitted for approval.");
      setForm({ slotNumber: "", vehicleType: "Car", vehicleNumber: "", vehicleName: "" });
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not submit the parking request.");
    } finally { setSubmitting(false); }
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
    <form onSubmit={submit} className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white"><div className="flex gap-3"><FaCar className="mt-1 text-xl" /><div><h2 className="text-xl font-bold">Request parking</h2><p className="text-sm text-blue-100">Your request needs administrator approval.</p></div></div><button type="button" onClick={onClose} aria-label="Close"><FaTimes /></button></div>
      <div className="space-y-5 p-6">
        <label className="block font-medium">Preferred slot<input required name="slotNumber" value={form.slotNumber} onChange={change} placeholder="A-17" className="mt-2 w-full rounded-xl border p-3" /></label>
        <label className="block font-medium">Vehicle type<select name="vehicleType" value={form.vehicleType} onChange={change} className="mt-2 w-full rounded-xl border p-3"><option>Car</option><option>Bike</option><option>Scooter</option><option>Other</option></select></label>
        <label className="block font-medium">Registration number<input required name="vehicleNumber" value={form.vehicleNumber} onChange={change} className="mt-2 w-full rounded-xl border p-3" /></label>
        <label className="block font-medium">Vehicle name <span className="font-normal text-slate-400">(optional)</span><input name="vehicleName" value={form.vehicleName} onChange={change} placeholder="e.g. Honda City" className="mt-2 w-full rounded-xl border p-3" /></label>
      </div>
      <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4"><button type="button" onClick={onClose} className="rounded-xl border px-5 py-2.5">Cancel</button><button disabled={submitting} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-60">{submitting && <FaSpinner className="animate-spin" />}Submit request</button></div>
    </form>
  </div>;
}
export default AddVehicleModal;
