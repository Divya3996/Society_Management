import { FaEye, FaEdit, FaTrash, FaParking } from "react-icons/fa";

function ParkingTable({ slots = [], onView, onEdit, onDelete }) {
  if (slots.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaParking className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No parking slots allocated</h3>
        <p className="text-slate-400 text-sm mt-1">You have no vehicles registered for parking.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Slot No.</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Vehicle Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Vehicle Number</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                <td className="px-6 py-5 font-bold text-slate-800">{slot.slotNumber}</td>
                <td className="px-6 py-5 text-slate-700">{slot.vehicleName || "—"}</td>
                <td className="px-6 py-5 font-mono text-slate-700">{slot.vehicleNumber}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    slot.vehicleType === "Car" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"
                  }`}>
                    {slot.vehicleType}
                  </span>
                </td>
                <td className="px-6 py-5 text-left">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    slot.status === "Active" ? "bg-green-100 text-green-700" : slot.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-700"
                  }`}>
                    {slot.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onView(slot)}
                      title="View Details"
                      className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                    >
                      <FaEye />
                    </button>
                    {slot.status === "Pending" && <button onClick={() => onEdit(slot)} title="Edit request" className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 hover:bg-amber-600 hover:text-white transition flex items-center justify-center"><FaEdit /></button>}
                    {slot.status === "Pending" && <button onClick={() => onDelete(slot._id)} title="Cancel request" className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center"><FaTrash /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParkingTable;
