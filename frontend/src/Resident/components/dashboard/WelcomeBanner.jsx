import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function WelcomeBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">

      {/* Background Circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-0 right-20 w-24 h-24 bg-white/10 rounded-full"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between p-8">

        {/* Left */}
        <div>

          <p className="text-blue-100 text-sm uppercase tracking-wider">
            Resident Portal
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Welcome Back 👋
          </h1>

          <p className="mt-4 text-blue-100 max-w-xl leading-7">
            Manage visitors, pay maintenance bills, raise complaints,
            view notices and stay connected with your society —
            all from one place.
          </p>

          <button type="button" onClick={() => navigate("/resident/visitors")} className="mt-6 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Explore Society
          </button>

        </div>

        {/* Right */}
        <div className="mt-8 md:mt-0">

          <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">

            <FaHome className="text-6xl text-white" />

          </div>

        </div>

      </div>

    </div>
  );
}

export default WelcomeBanner;