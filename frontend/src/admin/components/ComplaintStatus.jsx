import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ComplaintStatus({ stats = {} }) {
  const resolved = stats.resolvedComplaints || 0;
  const pending = stats.pendingComplaints || 0;
  const inProgress = stats.inProgressComplaints || 0;

  const data = {
    labels: ["Resolved", "Pending", "In Progress"],
    datasets: [
      {
        data: [resolved, pending, inProgress],
        backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 18,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <h2 className="text-xl font-bold text-slate-800 mb-5">Complaint Status</h2>

      {resolved === 0 && pending === 0 && inProgress === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
          <p>No complaints data available.</p>
        </div>
      ) : (
        <>
          <div className="h-64 flex-1">
            <Doughnut data={data} options={options} />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-green-600 text-sm font-medium">Resolved</p>
              <h3 className="text-2xl font-bold text-green-700">{resolved}</h3>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <p className="text-red-600 text-sm font-medium">Pending</p>
              <h3 className="text-2xl font-bold text-red-700">{pending}</h3>
            </div>
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-yellow-600 text-sm font-medium">Progress</p>
              <h3 className="text-2xl font-bold text-yellow-700">{inProgress}</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ComplaintStatus;