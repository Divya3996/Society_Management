import { FaPoll, FaVoteYea, FaChartPie } from "react-icons/fa";

function PollStats({ stats = {} }) {
  const items = [
    {
      title: "Total Polls",
      value: stats.total ?? 0,
      icon: <FaPoll />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Active Polls",
      value: stats.active ?? 0,
      icon: <FaVoteYea />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Completed",
      value: stats.completed ?? 0,
      icon: <FaChartPie />,
      bg: "bg-purple-100",
      text: "text-purple-600",
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

export default PollStats;