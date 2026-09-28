import { FaTrash, FaQrcode, FaUserCircle } from "react-icons/fa";

function statusBadge(status) {
  switch (status) {
    case "Checked In":
      return "bg-green-100 text-green-700";
    case "Checked Out":
      return "bg-slate-100 text-slate-700";
    case "Expected":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function VisitorTable({ visitors = [], onShowQR, onDelete }) {
  if (visitors.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaUserCircle className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No visitors found</h3>
        <p className="text-slate-400 text-sm mt-1">Invite a visitor to generate a QR pass.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Visitor</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Mobile</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Purpose</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor._id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                <td className="px-6 py-5 font-semibold text-slate-800">{visitor.name}</td>
                <td className="px-6 py-5 text-slate-600">{visitor.phone || "—"}</td>
                <td className="px-6 py-5 text-slate-600">{visitor.purpose}</td>
                <td className="px-6 py-5 text-slate-600">
                  {visitor.expectedDate
                    ? new Date(visitor.expectedDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td className="px-6 py-5 text-left">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(visitor.status)}`}>
                    {visitor.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    {visitor.qrCode && visitor.status === "Expected" && (
                      <button
                        onClick={() => onShowQR(visitor)}
                        title="Show QR"
                        className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaQrcode />
                      </button>
                    )}
                    {(visitor.status === "Expected" || visitor.status === "Cancelled") && (
                      <button
                        onClick={() => onDelete(visitor._id)}
                        title="Cancel/Delete Invite"
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

export default VisitorTable;
