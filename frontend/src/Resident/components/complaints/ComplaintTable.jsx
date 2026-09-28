import { FaEye, FaTrash, FaExclamationCircle } from "react-icons/fa";

function getStatusBadge(status) {
  switch (status) {
    case "Resolved":
      return "bg-green-100 text-green-700";
    case "In Progress":
      return "bg-yellow-100 text-yellow-700";
    case "Pending":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function ComplaintTable({ complaints = [], onViewComplaint, onDeleteComplaint }) {
  if (complaints.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaExclamationCircle className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No complaints found</h3>
        <p className="text-slate-400 text-sm mt-1">You haven't raised any complaints yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Subject</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date Raised</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                <td className="px-6 py-5 font-semibold text-blue-600 text-sm">
                  {complaint._id.slice(-6).toUpperCase()}
                </td>
                <td className="px-6 py-5 font-medium text-slate-800">
                  {complaint.subject}
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                    {complaint.category || "General"}
                  </span>
                </td>
                <td className="px-6 py-5 text-slate-600">
                  {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </td>
                <td className="px-6 py-5 text-left">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onViewComplaint(complaint)}
                      title="View Details"
                      className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                    >
                      <FaEye />
                    </button>
                    {/* Allow deleting if it's pending */}
                    {complaint.status === "Pending" && (
                      <button
                        onClick={() => onDeleteComplaint(complaint._id)}
                        title="Delete Complaint"
                        className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaTrash />
                      </button>
                    )}
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

export default ComplaintTable;