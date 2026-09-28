import { FaBullhorn, FaThumbtack, FaCalendarAlt } from "react-icons/fa";

function NoticeStats({ stats = {} }) {
  const items = [
    {
      title: "Total Notices",
      value: stats.total ?? 0,
      icon: <FaBullhorn />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Urgent Notices",
      value: stats.pinned ?? 0,
      icon: <FaThumbtack />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Recent Updates",
      value: stats.new ?? 0,
      icon: <FaCalendarAlt />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

export default NoticeStats;
