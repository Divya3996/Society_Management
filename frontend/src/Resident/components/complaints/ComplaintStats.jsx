import {
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
  FaTools,
} from "react-icons/fa";

function ComplaintStats({ stats = {} }) {
  const items = [
    {
      title: "Total Raised",
      value: stats.total ?? 0,
      icon: <FaExclamationCircle />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Resolved",
      value: stats.resolved ?? 0,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Pending",
      value: stats.pending ?? 0,
      icon: <FaClock />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "In Progress",
      value: stats.inProgress ?? 0,
      icon: <FaTools />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex justify-between items-center hover:shadow-md transition-shadow duration-300"
        >
          <div>
            <p className="text-sm font-medium text-slate-500">{item.title}</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">{item.value}</h3>
          </div>
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.bg} ${item.text}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComplaintStats;