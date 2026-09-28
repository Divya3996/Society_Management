import {
  FaUserPlus,
  FaBullhorn,
  FaMoneyBillWave,
  FaClipboardList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Visitor",
      path: "/admin/visitors",
      icon: <FaUserPlus />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Create Notice",
      path: "/admin/notices",
      icon: <FaBullhorn />,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Collect Maintenance",
      path: "/admin/maintenance",
      icon: <FaMoneyBillWave />,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      title: "View Complaints",
      path: "/admin/complaints",
      icon: <FaClipboardList />,
      color: "bg-red-500 hover:bg-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            type="button"
            onClick={() => navigate(action.path)}
            aria-label={action.title}
            className={`${action.color} text-white rounded-xl p-5 transition duration-300 flex flex-col items-center gap-3`}
          >
            <div className="text-3xl">
              {action.icon}
            </div>

            <span className="font-semibold text-center">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;