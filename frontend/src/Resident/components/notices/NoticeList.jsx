import { FaBullhorn } from "react-icons/fa";

function getPriorityBadge(priority) {
  switch (priority) {
    case "Urgent":
      return "bg-red-100 text-red-700";
    case "Important":
      return "bg-yellow-100 text-yellow-700";
    case "Normal":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function NoticeList({ notices = [], onReadMore }) {
  if (notices.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaBullhorn className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No notices found</h3>
        <p className="text-slate-400 text-sm mt-1">There are no active notices at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notices.map((notice) => (
        <div
          key={notice._id}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                {notice.category || "General"}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(notice.priority)}`}>
                {notice.priority || "Normal"}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {notice.title}
            </h3>
          </div>

          {/* Body */}
          <div className="p-6 flex-1">
            <p className="text-slate-600 line-clamp-3 leading-relaxed">
              {notice.description}
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-5 bg-slate-50 flex items-center justify-between border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-500 font-medium">Published</p>
              <p className="text-sm font-semibold text-slate-700">
                {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </p>
            </div>
            <button
              onClick={() => onReadMore(notice)}
              className="px-4 py-2 bg-white text-blue-600 text-sm font-semibold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoticeList;
