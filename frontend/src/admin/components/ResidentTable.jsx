import {
  FaTrash,
  FaUserCircle,
  FaPowerOff
} from "react-icons/fa";

function ResidentTable({ residents = [], onDelete, onToggleStatus }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Resident</th>
              <th className="px-6 py-4 text-left font-medium">Flat</th>
              <th className="px-6 py-4 text-left font-medium">Phone</th>
              <th className="px-6 py-4 text-center font-medium">Status</th>
              <th className="px-6 py-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {residents.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-500">
                  No residents found.
                </td>
              </tr>
            ) : (
              residents.map((resident, index) => (
                <tr
                  key={resident.id || index}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl shrink-0">
                        <FaUserCircle />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {resident.name}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {resident.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {resident.flatNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {resident.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        resident.accountStatus === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {resident.accountStatus || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => onToggleStatus && onToggleStatus(resident.id)}
                        title={resident.accountStatus === "Active" ? "Deactivate" : "Activate"}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                          resident.accountStatus === "Active" 
                          ? "bg-amber-100 text-amber-600 hover:bg-amber-200" 
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        <FaPowerOff />
                      </button>
                      <button 
                        onClick={() => onDelete && onDelete(resident.id)}
                        title="Delete"
                        className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors duration-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResidentTable;
