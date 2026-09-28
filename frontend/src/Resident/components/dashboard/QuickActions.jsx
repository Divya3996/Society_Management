import {
  FaUserPlus,
  FaExclamationCircle,
  FaMoneyBillWave,
  FaVoteYea,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Invite Visitor",
    path: "/resident/visitors",
    icon: <FaUserPlus />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Raise Complaint",
    path: "/resident/complaints",
    icon: <FaExclamationCircle />,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Pay Maintenance",
    path: "/resident/maintenance",
    icon: <FaMoneyBillWave />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Vote in Poll",
    path: "/resident/polls",
    icon: <FaVoteYea />,
    color: "bg-purple-100 text-purple-600",
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action, index) => (
          <button
            key={index}
            type="button"
            onClick={() => navigate(action.path)}
            aria-label={action.title}
            className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${action.color}`}
            >
              {action.icon}
            </div>

            <span className="mt-4 font-semibold text-slate-700 text-center">
              {action.title}
            </span>
          </button>
        ))}

      </div>

    </div>
  );
}

export default QuickActions;