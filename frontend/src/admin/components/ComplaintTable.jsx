import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function priorityBadge(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-green-100 text-green-700";
  }
}

function statusBadge(status) {
  switch (status) {
    case "Pending":
      return "bg-red-100 text-red-700";
    case "In Progress":
      return "bg-blue-100 text-blue-700";
    case "Resolved":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function ComplaintTable({ complaints = [], onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">
          Complaint List
        </h2>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
          {complaints.length} Total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wide">
            <tr className="text-left font-medium">
              <th className="px-6 py-4">Resident</th>
              <th className="px-6 py-4">Flat</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-slate-500">
                  No complaints found.
                </td>
              </tr>
            ) : (
              complaints.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {item.resident?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {item.resident?.flatNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${priorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onView && onView(item)}
                        title="View Details"
                        className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors duration-200"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => onEdit && onEdit(item)}
                        title="Edit"
                        className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-200 transition-colors duration-200"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => onDelete && onDelete(item._id)}
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

export default ComplaintTable;
