import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import NotificationCenter from "../../components/NotificationCenter";

const PAGE_TITLES = {
  "/admin/dashboard": "Dashboard",
  "/admin/residents": "Residents",
  "/admin/visitors": "Visitors",
  "/admin/complaints": "Complaints",
  "/admin/maintenance": "Maintenance Bills",
  "/admin/notices": "Notice Board",
  "/admin/parking": "Parking Management",
  "/admin/polls": "Society Polls",
  "/admin/staff": "Staff Management",
  "/admin/reports": "Reports & Analytics",
  "/admin/profile": "My Profile",
  "/admin/settings": "Settings",
};

function Navbar({ setMobileOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const pageTitle = PAGE_TITLES[location.pathname] || "Dashboard";
  const initials = user?.name?.slice(0, 2).toUpperCase() || "AD";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white shadow-sm h-16 px-6 flex items-center justify-between relative z-20">

      {/* Left — Mobile toggle + page title */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-2xl text-slate-600"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
        <h2 className="text-xl font-bold text-slate-700">{pageTitle}</h2>
      </div>

      {/* Right — Bell + Profile */}
      <div className="flex items-center gap-5">
        <NotificationCenter />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-500">Society Manager</p>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
              <button
                onClick={() => { navigate("/admin/profile"); setShowDropdown(false); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <FaUserCircle /> My Profile
              </button>
              <hr className="my-1 border-slate-100" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;