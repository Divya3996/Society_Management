import {
  FaArrowUp,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

function ReportSummary({ stats = {}, bills = [] }) {
  const pendingAmount = bills
    .filter(b => b.status === "Pending" || b.status === "Overdue")
    .reduce((sum, b) => sum + b.amount, 0);

  const complaintResolution = stats.totalComplaints > 0
    ? Math.round((stats.resolvedComplaints / stats.totalComplaints) * 100)
    : 100;

  const visitorActivity = stats.todayVisitors > 0 ? `+${stats.todayVisitors}` : "Stable";

  const summaries = [
    {
      title: "Maintenance Collection",
      value: `${stats.collectionRate || 0}%`,
      description: "Collection rate this month.",
      icon: <FaArrowUp />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Complaint Resolution",
      value: `${complaintResolution}%`,
      description: "Complaints resolved.",
      icon: <FaCheckCircle />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Visitor Activity",
      value: visitorActivity,
      description: "Visitors expected today.",
      icon: <FaArrowUp />,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Pending Payments",
      value: `₹${pendingAmount.toLocaleString("en-IN")}`,
      description: "Outstanding maintenance dues.",
      icon: <FaExclamationTriangle />,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {summaries.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition"
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.bg} ${item.color}`}
          >
            {item.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mt-5">
            {item.title}
          </h3>
          <h2 className={`text-3xl font-bold mt-3 ${item.color}`}>
            {item.value}
          </h2>
          <p className="text-slate-500 mt-3 text-sm">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReportSummary;
