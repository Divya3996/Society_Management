import {
  FaCalendarAlt,
  FaTag,
  FaArrowRight,
} from "react-icons/fa";

function NoticeCard({ notice, onReadMore }) {
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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 p-6 flex flex-col justify-between">

      {/* Header */}

      <div>

        <div className="flex justify-between items-start gap-3">

          <h2 className="text-xl font-bold text-slate-800">
            {notice.title}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(
              notice.priority
            )}`}
          >
            {notice.priority}
          </span>

        </div>

        <p className="text-slate-500 mt-4 line-clamp-3">
          {notice.description}
        </p>

      </div>

      {/* Footer */}

      <div className="mt-6">

        <div className="flex flex-wrap gap-3 mb-5">

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColor(
              notice.category
            )}`}
          >
            <FaTag className="inline mr-1" />
            {notice.category}
          </span>

          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">

            <FaCalendarAlt className="inline mr-1" />

            {notice.createdAt
              ? new Date(notice.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
              : "—"}

          </span>

        </div>

        <button
          onClick={() => onReadMore(notice)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition"
        >
          Read More

          <FaArrowRight />

        </button>

      </div>

    </div>
  );
}

export default NoticeCard;
