import { FaTimes } from "react-icons/fa";

function ComplaintDetailsModal({
  isOpen,
  onClose,
  complaint,
}) {
  if (!isOpen || !complaint) return null;

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Complaint Details
            </h2>

            <p className="text-blue-100 text-sm">
              Complaint ID : {(complaint._id || complaint.id || "").slice(-8).toUpperCase()}
            </p>
          </div>

          <button onClick={onClose}>
            <FaTimes className="text-xl" />
          </button>

        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <p className="text-slate-500 text-sm">
                Complaint Title
              </p>

              <h3 className="font-semibold text-lg">
                {complaint.subject}
              </h3>

            </div>

            <div>

              <p className="text-slate-500 text-sm">
                Category
              </p>

              <h3 className="font-semibold">
                {complaint.category}
              </h3>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <p className="text-slate-500 text-sm">
                Priority
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColor[complaint.priority]}`}
              >
                {complaint.priority}
              </span>

            </div>

            <div>

              <p className="text-slate-500 text-sm">
                Status
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[complaint.status]}`}
              >
                {complaint.status}
              </span>

            </div>

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              Date Raised
            </p>

            <h3 className="font-semibold">
              {complaint.createdAt
                ? new Date(complaint.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                : "—"}
            </h3>

          </div>

          <div>

            <p className="text-slate-500 text-sm mb-2">
              Description
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border">
              {complaint.description}
            </div>

          </div>

          <div>

            <p className="text-slate-500 text-sm mb-2">
              Admin Reply
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">

              {complaint.adminRemarks || "No update has been added by management yet."}

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="px-6 py-5 border-t flex justify-end">

          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetailsModal;
