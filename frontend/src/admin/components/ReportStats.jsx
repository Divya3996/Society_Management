import {
  FaChartLine,
  FaFileInvoiceDollar,
  FaUsers,
  FaCarSide,
} from "react-icons/fa";

function ReportStats({ stats = {} }) {
  const collectionRate = stats.collectionRate ?? 0;
  
  const metrics = [
    {
      title: "Total Collection",
      value: `₹${(stats.paidBills * 1000 || 0).toLocaleString("en-IN")}`, // Approximation or you can pass the actual sum of paid bills
      change: "+12.5%",
      icon: <FaChartLine />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Collection Rate",
      value: `${collectionRate}%`,
      change: collectionRate > 80 ? "+5.2%" : "-2.1%",
      icon: <FaFileInvoiceDollar />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Residents",
      value: stats.totalResidents ?? 0,
      change: "+3.1%",
      icon: <FaUsers />,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Active Parking",
      value: stats.activeParking ?? 0,
      change: "+1.2%",
      icon: <FaCarSide />,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {metrics.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition duration-300"
        >
          <div className="flex justify-between items-start">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.bg} ${item.color}`}
            >
              {item.icon}
            </div>
            <span
              className={`text-sm font-bold px-2 py-1 rounded-lg ${
                item.change.startsWith("+")
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {item.change}
            </span>
          </div>

          <div className="mt-5">
            <h3 className="text-3xl font-bold text-slate-800">
              {item.value}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-1">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportStats;