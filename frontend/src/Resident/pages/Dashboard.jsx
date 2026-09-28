import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getResidentDashboard } from "../../services/dashboardService";
import ResidentDashboardCard from "../components/dashboard/ResidentDashboardCard";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import QuickActions from "../components/dashboard/QuickActions";
import LatestNotices from "../components/dashboard/LatestNotices";
import VisitorHistory from "../components/dashboard/VisitorHistory";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";

import {
  FaUserFriends,
  FaMoneyBillWave,
  FaCar,
  FaBullhorn,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";

function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const hour = new Date().getHours();
  let greeting = "Good Evening 🌙";
  if (hour < 12) greeting = "Good Morning ☀️";
  else if (hour < 18) greeting = "Good Afternoon 🌤";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getResidentDashboard();
        setData(res);
      } catch (error) {
        toast.error("Failed to load resident dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 w-full">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  const { stats, nextDueBill, recentNotices, recentVisitors } = data || {};

  return (
    <>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-800">
          {greeting}, {user?.name?.split(" ")[0] || "Resident"} 👋
        </h1>
        <p className="mt-2 text-slate-500 text-lg">
          Welcome back to{" "}
          <span className="font-semibold text-slate-700">Digital Society</span>.
          Here&apos;s your personalized dashboard for today.
        </p>
      </div>

      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
        <div className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-3xl">
          <ResidentDashboardCard
            title="My Visitors"
            value={stats?.myVisitors || 0}
            subtitle={`${stats?.todayVisitors || 0} Expected Today`}
            icon={<FaUserFriends />}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
        </div>
        <div className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-3xl">
          <ResidentDashboardCard
            title="Pending Bills"
            value={`₹${stats?.pendingAmount || 0}`}
            subtitle={nextDueBill ? `Due: ${new Date(nextDueBill.dueDate).toLocaleDateString()}` : "No pending bills"}
            icon={<FaMoneyBillWave />}
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
        </div>
        <div className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-3xl">
          <ResidentDashboardCard
            title="Parking Slot"
            value={stats?.parkingSlot || "N/A"}
            subtitle={stats?.parkingSlot ? "Reserved" : "Not Assigned"}
            icon={<FaCar />}
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </div>
        <div className="hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-3xl">
          <ResidentDashboardCard
            title="Active Polls"
            value={stats?.activePolls || 0}
            subtitle="Participate Now"
            icon={<FaBullhorn />}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <QuickActions />
      </div>

      {/* Latest Notices + Visitor History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <LatestNotices noticesData={recentNotices} />
        <VisitorHistory visitorsData={recentVisitors} />
      </div>

      {/* Upcoming Events */}
      <div className="mt-8">
        <UpcomingEvents />
      </div>
    </>
  );
}

export default Dashboard;