import { FaEdit, FaTrash, FaParking } from "react-icons/fa";

function ParkingTable({ slots = [], onDelete, onEdit }) {
  if (slots.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center mt-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaParking className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No parking slots allocated</h3>
        <p className="text-slate-400 text-sm mt-1">Allocate parking slots to residents using the button above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-slate-700">Slot</th>
              <th className="px-6 py-4 text-left text-slate-700">Resident</th>
              <th className="px-6 py-4 text-left text-slate-700">Flat</th>
              <th className="px-6 py-4 text-left text-slate-700">Vehicle No.</th>
              <th className="px-6 py-4 text-left text-slate-700">Type</th>
              <th className="px-6 py-4 text-left text-slate-700">Status</th>
              <th className="px-6 py-4 text-center text-slate-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {slots.map((slot) => (
              <tr
                key={slot._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5 font-semibold text-slate-800">
                  {slot.slotNumber}
                </td>

                <td className="px-6 py-5 text-slate-700">
                  {slot.resident?.name || "—"}
                </td>

                <td className="px-6 py-5 text-slate-700">
                  {slot.resident?.flatNumber || "—"}
                </td>

                <td className="px-6 py-5 font-mono text-slate-700">
                  {slot.vehicleNumber || "—"}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      slot.vehicleType === "Bike" || slot.vehicleType === "Scooter"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {slot.vehicleType || "Car"}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      slot.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {slot.status === "Active" ? "Allocated" : slot.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(slot)}
                      title="Edit"
                      className="w-10 h-10 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 transition flex items-center justify-center"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(slot._id)}
                      title="Release Slot"
                      className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
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
