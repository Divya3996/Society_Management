import {
  FaUsers,
  FaHome,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";

function ResidentStats({ residents = [] }) {
  const total = residents.length;
  const active = residents.filter((r) => r.accountStatus === "Active").length;
  const inactive = total - active;

  const stats = [
    {
      title: "Total Residents",
      value: total,
      subtitle: "Registered accounts",
      icon: <FaUsers />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Active Residents",
      value: active,
      subtitle: "Currently active",
      icon: <FaUserCheck />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Inactive/Suspended",
      value: inactive,
      subtitle: "Account deactivated",
      icon: <FaUserTimes />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Total Flats Occupied",
      value: new Set(residents.map(r => r.flatNumber)).size,
      subtitle: "Unique flats",
      icon: <FaHome />,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
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
            <p className="text-sm text-slate-500 mt-2">
              {item.subtitle}
            </p>
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

export default ResidentStats;