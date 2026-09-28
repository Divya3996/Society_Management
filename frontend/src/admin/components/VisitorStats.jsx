import {
  FaUsers,
  FaSignInAlt,
  FaSignOutAlt,
  FaClock,
} from "react-icons/fa";

function VisitorStats({ stats = {} }) {
  const items = [
    {
      title: "Total Visitors",
      value: stats.total ?? 0,
      icon: <FaUsers />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Checked In",
      value: stats.checkedIn ?? 0,
      icon: <FaSignInAlt />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Checked Out",
      value: stats.checkedOut ?? 0,
      icon: <FaSignOutAlt />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Expected",
      value: stats.expected ?? 0,
      icon: <FaClock />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500 text-sm">{item.title}</p>
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
        </div>
      ))}
    </div>
  );
}

export default VisitorStats;