import {
  FaBullhorn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function LatestNotices({ noticesData = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-full hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          📢 Latest Notices
        </h2>

        <Link to="/resident/notices" className="text-blue-600 text-sm font-semibold hover:text-blue-800 hover:underline transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {noticesData.length === 0 ? (
          <p className="text-slate-500 text-center py-6">No recent notices.</p>
        ) : (
          noticesData.map((notice) => (
            <div
              key={notice._id}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition duration-300 border border-transparent hover:border-slate-100"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-blue-100 text-blue-600`}
              >
                <FaBullhorn />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 line-clamp-1">
                  {notice.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </p>
              </div>

              <FaBullhorn className="text-slate-300" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LatestNotices;