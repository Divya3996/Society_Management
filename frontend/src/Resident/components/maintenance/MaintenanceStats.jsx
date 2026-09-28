import { FaFileInvoiceDollar, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function MaintenanceStats({ stats = {} }) {
  const items = [
    {
      title: "Pending Amount",
      value: `₹${(stats.pendingAmount ?? 0).toLocaleString("en-IN")}`,
      subtitle: `${stats.pendingCount ?? 0} Unpaid Bills`,
      icon: <FaExclamationCircle />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Total Paid",
      value: `₹${(stats.paidAmount ?? 0).toLocaleString("en-IN")}`,
      subtitle: `${stats.paidCount ?? 0} Completed Payments`,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Total Bills",
      value: (stats.pendingCount ?? 0) + (stats.paidCount ?? 0),
      subtitle: "Generated Invoices",
      icon: <FaFileInvoiceDollar />,
      bg: "bg-blue-100",
      text: "text-blue-600",
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
            <p className="text-sm text-slate-400 mt-1">{item.subtitle}</p>
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

export default MaintenanceStats;