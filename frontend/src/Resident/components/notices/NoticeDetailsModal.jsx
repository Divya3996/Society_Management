import {
  FaTimes,
  FaCalendarAlt,
  FaTag,
  FaBullhorn,
} from "react-icons/fa";

function NoticeDetailsModal({ isOpen, onClose, notice }) {
  if (!isOpen || !notice) return null;

  const priorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-700";

      case "Important":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  const categoryColor = (category) => {
    switch (category) {
      case "Maintenance":
        return "bg-blue-100 text-blue-700";

      case "Emergency":
        return "bg-red-100 text-red-700";

      case "Event":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <FaBullhorn className="text-2xl" />

            <div>

              <h2 className="text-2xl font-bold">
                Society Notice
              </h2>

              <p className="text-blue-100">
                Digital Society Management
              </p>

            </div>

          </div>

          <button onClick={onClose}>
            <FaTimes className="text-xl" />
          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          <h1 className="text-3xl font-bold text-slate-800">
            {notice.title}
          </h1>

          <div className="flex flex-wrap gap-3 mt-5">

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColor(
                notice.category
              )}`}
            >
              <FaTag className="inline mr-2" />
              {notice.category}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColor(
                notice.priority
              )}`}
            >
              {notice.priority} Priority
            </span>

            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold">

              <FaCalendarAlt className="inline mr-2" />

              {notice.createdAt
                ? new Date(notice.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                : "—"}

            </span>

          </div>

          <div className="mt-8 bg-slate-50 rounded-2xl p-6">

            <p className="leading-8 text-slate-700 text-lg">
              {notice.description}
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-5 flex justify-end">

          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default NoticeDetailsModal;
