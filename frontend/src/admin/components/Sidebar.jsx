import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaExclamationCircle,
  FaMoneyBillWave,
  FaBullhorn,
  FaCar,
  FaVoteYea,
  FaUserCircle,
  FaSignOutAlt,
  FaChartBar,
  FaUserTie,
  FaCog,
  FaUserShield,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import { useAuth } from "../../hooks/useAuth";

function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { title: "Residents", path: "/admin/residents", icon: <FaUsers /> },
    { title: "Visitors", path: "/admin/visitors", icon: <FaUserShield /> },
    { title: "Complaints", path: "/admin/complaints", icon: <FaExclamationCircle /> },
    { title: "Maintenance", path: "/admin/maintenance", icon: <FaMoneyBillWave /> },
    { title: "Notice Board", path: "/admin/notices", icon: <FaBullhorn /> },
    { title: "Parking", path: "/admin/parking", icon: <FaCar /> },
    { title: "Polls", path: "/admin/polls", icon: <FaVoteYea /> },
    { title: "Staff", path: "/admin/staff", icon: <FaUserTie /> },
    { title: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
    { title: "Profile", path: "/admin/profile", icon: <FaUserCircle /> },
    { title: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  const initials = user?.name?.slice(0, 2).toUpperCase() || "AD";

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
          transition-all duration-300 z-50 shadow-xl
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="h-20 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={logo}
              alt="Digital Society Logo"
              className="w-10 h-10 rounded-lg bg-white p-1 shrink-0"
            />
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-white leading-tight">
                  Digital
                  <span className="text-blue-400"> Society</span>
                </h2>
                <p className="text-xs text-slate-400">Management System</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 rounded-lg hover:bg-slate-800 items-center justify-center transition shrink-0"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white"
            aria-label="Close menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center ${collapsed ? "justify-center" : "gap-4"} 
                px-4 py-3 rounded-xl mb-1 transition-all duration-200
                ${isActive ? "bg-blue-600 shadow-md text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
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

        {/* Footer — Logout */}
        <div className="border-t border-slate-800 p-4 bg-slate-900 shrink-0">
          {!collapsed ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{user?.name || "Admin"}</p>
                  <p className="text-xs text-slate-400 truncate">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition shrink-0"
                title="Logout"
                aria-label="Logout"
              >
                <FaSignOutAlt className="text-xl" />
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

export default Sidebar;
