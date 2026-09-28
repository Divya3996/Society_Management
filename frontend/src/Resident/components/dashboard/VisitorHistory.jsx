import { FaUserCircle, FaCheckCircle, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

function VisitorHistory({ visitorsData = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-full hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Visitor History
          </h2>
          <p className="text-sm text-slate-500">
            Recent visitors to your flat
          </p>
        </div>
        <Link to="/resident/visitors" className="text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {visitorsData.length === 0 ? (
          <p className="text-slate-500 text-center py-6">No recent visitors found.</p>
        ) : (
          visitorsData.map((visitor) => (
            <div
              key={visitor._id}
              className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-none last:pb-0 hover:bg-slate-50 rounded-xl p-2 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                  <FaUserCircle />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {visitor.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {visitor.purpose || "Visit"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 font-medium">
                  {new Date(visitor.createdAt).toLocaleDateString()}
                </p>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold mt-1 px-3 py-1 rounded-full uppercase tracking-wide ${
                    visitor.status === "Expected"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {visitor.status === "Expected" ? (
                    <FaClock />
                  ) : (
                    <FaCheckCircle />
                  )}
                  {visitor.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VisitorHistory;