import {
  FaUserTie,
  FaShieldAlt,
  FaBroom,
} from "react-icons/fa";

function StaffStats({ stats = {} }) {
  const items = [
    {
      title: "Total Staff",
      value: stats.total ?? 0,
      subtitle: "Society employees",
      icon: <FaUserTie />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Active",
      value: stats.active ?? 0,
      subtitle: "Currently on duty",
      icon: <FaShieldAlt />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Security",
      value: stats.security ?? 0,
      subtitle: "Guards deployed",
      icon: <FaShieldAlt />,
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    {
      title: "Housekeeping",
      value: stats.housekeeping ?? 0,
      subtitle: "Cleaning staff",
      icon: <FaBroom />,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-slate-500 text-sm font-medium">{item.title}</p>
            <h2 className="text-4xl font-bold text-slate-800 mt-2">{item.value}</h2>
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

export default StaffStats;
