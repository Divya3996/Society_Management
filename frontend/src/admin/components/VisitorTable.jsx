import {
  FaUserCircle,
  FaEye,
  FaSignInAlt,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";

const badgeColor = (status) => {
  switch (status) {
    case "Checked In":
      return "bg-green-100 text-green-700";
    case "Checked Out":
      return "bg-slate-100 text-slate-600";
    case "Expected":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

function VisitorTable({ visitors = [], onDelete, onUpdateStatus, onView }) {
  if (visitors.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 mt-8 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaUserCircle className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No visitors yet</h3>
        <p className="text-slate-400 text-sm mt-1">Visitors will appear here once residents invite them.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Visitor List</h2>
          <p className="text-slate-500 text-sm">{visitors.length} registered visitor{visitors.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100 text-slate-700">
              <th className="text-left px-5 py-4 rounded-l-xl">Visitor</th>
              <th className="text-left px-5 py-4">Flat</th>
              <th className="text-left px-5 py-4">Phone</th>
              <th className="text-left px-5 py-4">Purpose</th>
              <th className="text-left px-5 py-4">Expected Date</th>
              <th className="text-left px-5 py-4">Status</th>
              <th className="text-center px-5 py-4 rounded-r-xl">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((visitor) => (
              <tr
                key={visitor._id}
                className="border-b hover:bg-blue-50 transition"
              >
                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                      <FaUserCircle />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{visitor.name}</h3>
                      <p className="text-sm text-slate-500">
                        {visitor.resident?.name || "Unknown Resident"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-5 text-slate-700">
                  {visitor.flatNumber || visitor.resident?.flatNumber || "—"}
                </td>

                <td className="px-5 py-5 text-slate-700">{visitor.phone || "—"}</td>

                <td className="px-5 py-5">
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                    {visitor.purpose}
                  </span>
                </td>

                <td className="px-5 py-5 text-slate-600 text-sm">
                  {visitor.expectedDate
                    ? new Date(visitor.expectedDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>

                <td className="px-5 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(visitor.status)}`}
                  >
                    {visitor.status}
                  </span>
                </td>

                <td className="px-5 py-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(visitor)}
                      title="View QR Pass"
                      className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                    >
                      <FaEye />
                    </button>

                    {visitor.status === "Expected" && (
                      <button
                        onClick={() => onUpdateStatus(visitor._id, "Checked In")}
                        title="Check In"
                        className="w-9 h-9 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaSignInAlt />
                      </button>
                    )}

                    {visitor.status === "Checked In" && (
                      <button
                        onClick={() => onUpdateStatus(visitor._id, "Checked Out")}
                        title="Check Out"
                        className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaSignOutAlt />
                      </button>
                    )}

                    <button
                      onClick={() => onDelete(visitor._id)}
                      title="Delete"
                      className="w-9 h-9 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center"
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

      <div className="flex justify-between items-center mt-6">
        <p className="text-slate-500 text-sm">
          Showing {visitors.length} visitor{visitors.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

export default VisitorTable;