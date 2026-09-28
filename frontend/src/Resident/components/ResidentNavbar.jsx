import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import NotificationCenter from "../../components/NotificationCenter";

const PAGE_TITLES = {
  "/resident/dashboard":   { title: "Dashboard",      subtitle: "Welcome back! Have a great day." },
  "/resident/visitors":    { title: "My Visitors",    subtitle: "Manage your visitor invitations and QR passes." },
  "/resident/complaints":  { title: "My Complaints",  subtitle: "Raise and track your complaints." },
  "/resident/maintenance": { title: "Maintenance",    subtitle: "View your bills and payment history." },
  "/resident/notices":     { title: "Society Notices",subtitle: "Stay informed with the latest announcements." },
  "/resident/parking":     { title: "My Parking",     subtitle: "Manage your registered vehicles and parking slots." },
  "/resident/polls":       { title: "Society Polls",  subtitle: "Participate and share your opinion." },
  "/resident/profile":     { title: "My Profile",     subtitle: "View and update your personal details." },
  "/resident/settings":    { title: "Settings",       subtitle: "Manage your preferences and account security." },
};

function ResidentNavbar({ setMobileOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const page = PAGE_TITLES[location.pathname] || { title: "Dashboard", subtitle: "Welcome back!" };
  const initials = user?.name?.slice(0, 2).toUpperCase() || "RS";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Left — Mobile toggle + page title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-xl text-slate-700"
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">{page.title}</h1>
            <p className="text-xs text-slate-500 hidden sm:block">{page.subtitle}</p>
          </div>
        </div>

        {/* Right — Bell + Profile */}
        <div className="flex items-center gap-4">
          <NotificationCenter />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                {initials}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-800 leading-tight">
                  {user?.name || "Resident"}
                </p>
                <p className="text-xs text-slate-500">{user?.flatNumber || "Resident"}</p>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-12 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                <button
                  onClick={() => { navigate("/resident/profile"); setShowDropdown(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  My Profile
                </button>
                <hr className="my-1 border-slate-100" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default ResidentNavbar;