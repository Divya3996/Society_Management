import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaArrowLeft, FaHome } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const dashboardPath = isAdmin ? "/admin/dashboard" : "/resident/dashboard";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">

        {/* 404 Visual */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] font-black text-white/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className="text-8xl mb-4">🏗️</div>
              <p className="text-5xl font-black text-white">
                Page Not Found
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-400 text-lg mt-24 mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition font-medium"
          >
            <FaArrowLeft />
            Go Back
          </button>

          <Link
            to={isAuthenticated ? dashboardPath : "/login"}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg"
          >
            <FaHome />
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;