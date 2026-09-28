import {
  FaHome,
  FaUser,
  FaUserFriends,
  FaMoneyBillWave,
  FaCar,
  FaBullhorn,
  FaVoteYea,
  FaCog,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaTools,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const menuItems = [
  { title: "Dashboard",     path: "/resident/dashboard",  icon: <FaHome /> },
  { title: "My Visitors",   path: "/resident/visitors",   icon: <FaUserFriends /> },
  { title: "My Complaints", path: "/resident/complaints", icon: <FaTools /> },
  { title: "Maintenance",   path: "/resident/maintenance",icon: <FaMoneyBillWave /> },
  { title: "Parking",       path: "/resident/parking",    icon: <FaCar /> },
  { title: "Notices",       path: "/resident/notices",    icon: <FaBullhorn /> },
  { title: "Polls",         path: "/resident/polls",      icon: <FaVoteYea /> },
  { title: "My Profile",    path: "/resident/profile",    icon: <FaUser /> },
  { title: "Settings",      path: "/resident/settings",   icon: <FaCog /> },
];

function ResidentSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name?.slice(0, 2).toUpperCase() || "RD";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-slate-900 text-white flex flex-col
          transition-all duration-300 z-50
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800 shrink-0">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-blue-400">Digital Society</h1>
              <p className="text-xs text-slate-400 mt-0.5">Resident Portal</p>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-9 h-9 rounded-xl hover:bg-slate-800 items-center justify-center transition shrink-0"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
            aria-label="Close menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center ${collapsed ? "justify-center" : "gap-4"}
                px-4 py-3 rounded-xl mb-1 transition-all duration-200
                ${isActive ? "bg-blue-600 shadow-md" : "hover:bg-slate-800"}`
              }
              title={collapsed ? item.title : undefined}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="font-medium text-sm truncate">{item.title}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom — Profile + Logout */}
        <div className="border-t border-slate-800 p-4 bg-slate-900 shrink-0">
          {!collapsed ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{user?.name || "Resident"}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.flatNumber || ""}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition shrink-0"
                title="Logout"
                aria-label="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                title="Logout"
                aria-label="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default ResidentSidebar;