import { FaExclamationCircle, FaCheckCircle, FaClock, FaClipboardList } from "react-icons/fa";

function ComplaintStats({ complaints = [] }) {
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const stats = [
    {
      title: "Total Complaints",
      value: total,
      icon: <FaClipboardList />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaExclamationCircle />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: <FaClock />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Resolved",
      value: resolved,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-slate-500 text-sm font-medium">
              {item.title}
            </p>
            <h2 className="text-4xl font-bold text-slate-800 mt-2">
              {item.value}
            </h2>
          </div>
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${item.bg} ${item.text}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComplaintStats;