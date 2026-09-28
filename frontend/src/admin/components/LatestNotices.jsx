import { FaBullhorn } from "react-icons/fa";
import { Link } from "react-router-dom";

function LatestNotices({ noticesData = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Latest Notices
          </h2>
          <p className="text-sm text-slate-500">
            Active announcements
          </p>
        </div>
        <Link to="/admin/notices" className="text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {noticesData.length === 0 ? (
          <p className="text-slate-500 text-center py-6">No active notices.</p>
        ) : (
          noticesData.map((notice) => (
            <div
              key={notice._id}
              className="flex gap-4 border-b border-slate-100 pb-4 last:border-none last:pb-0 hover:bg-slate-50 rounded-lg p-2 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 shrink-0 flex items-center justify-center text-indigo-600 text-lg">
                <FaBullhorn />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  {notice.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                  {notice.description}
                </p>
                <p className="text-xs text-slate-400 mt-2 font-medium">
                  {new Date(notice.createdAt).toLocaleDateString()} • By {notice.publishedBy?.name || "Admin"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LatestNotices;
