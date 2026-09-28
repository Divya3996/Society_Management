import { FaPoll, FaVoteYea, FaUsers, FaChartPie } from "react-icons/fa";

function PollStats({ stats = {} }) {
  const items = [
    {
      title: "Total Polls",
      value: stats.total ?? 0,
      subtitle: "All polls",
      icon: <FaPoll />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Active Polls",
      value: stats.active ?? 0,
      subtitle: "Running now",
      icon: <FaVoteYea />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Total Votes",
      value: stats.totalVotes ?? 0,
      subtitle: "Residents voted",
      icon: <FaUsers />,
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    {
      title: "Completed",
      value: stats.completed ?? 0,
      subtitle: "Archived polls",
      icon: <FaChartPie />,
      bg: "bg-purple-100",
      text: "text-purple-600",
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

export default PollStats;