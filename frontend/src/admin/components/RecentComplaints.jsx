import { FaEye, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function RecentComplaints({ complaintsData = [] }) {
  const statusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-red-100 text-red-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Recent Complaints
          </h2>
          <p className="text-slate-500 text-sm">
            Latest complaints submitted by residents
          </p>
        </div>

        <Link
          to="/admin/complaints"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wide">
              <th className="text-left px-5 py-4 rounded-l-xl font-medium">Resident</th>
              <th className="text-left px-5 py-4 font-medium">Flat</th>
              <th className="text-left px-5 py-4 font-medium">Complaint</th>
              <th className="text-left px-5 py-4 font-medium">Date</th>
              <th className="text-left px-5 py-4 font-medium">Status</th>
              <th className="text-center px-5 py-4 rounded-r-xl font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaintsData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-slate-500">
                  No recent complaints found.
                </td>
              </tr>
            ) : (
              complaintsData.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
                        <FaUserCircle />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {item.resident?.name || "Unknown"}
                        </h3>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 font-medium text-slate-700">
                    {item.resident?.flatNumber || "N/A"}
                  </td>
                  <td className="px-5 text-slate-600 max-w-xs truncate">
                    {item.subject}
                  </td>
                  <td className="px-5 text-slate-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/admin/complaints`}
                      className="inline-flex p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                    >
                      <FaEye />
                    </Link>
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

export default RecentComplaints;