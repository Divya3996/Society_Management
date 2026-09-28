import {
  FaBullhorn,
  FaThumbtack,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

function NoticeStats({ stats = {} }) {
  const items = [
    {
      title: "Total Notices",
      value: stats.total ?? 0,
      subtitle: "All notices",
      icon: <FaBullhorn />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Published",
      value: stats.active ?? 0,
      subtitle: "Currently Active",
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Urgent",
      value: stats.pinned ?? 0,
      subtitle: "High-priority notices",
      icon: <FaThumbtack />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Inactive",
      value: stats.scheduled ?? 0,
      subtitle: "Archived / Draft",
      icon: <FaCalendarAlt />,
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-slate-500 text-sm font-medium">{item.title}</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">{item.value}</h2>
            <p className="text-sm text-slate-500 mt-2">{item.subtitle}</p>
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

export default NoticeStats;
