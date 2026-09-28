import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAdminDashboard } from "../../services/dashboardService";
import DashboardCard from "../components/DashboardCard";
import VisitorChart from "../components/VisitorChart";
import ComplaintStatus from "../components/ComplaintStatus";
import RecentComplaints from "../components/RecentComplaints";
import RecentVisitors from "../components/RecentVisitors";
import LatestNotices from "../components/LatestNotices";
import QuickActions from "../components/QuickActions";
import UpcomingEvents from "../components/UpcomingEvents";
import {
  FaUsers,
  FaExclamationCircle,
  FaMoneyBillWave,
  FaCar
} from "react-icons/fa";
import { toast } from "react-toastify";
import { SkeletonDashboard } from "../../components/Skeletons";

function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning ☀️" : hour < 18 ? "Good Afternoon 🌤" : "Good Evening 🌙";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardData = await getAdminDashboard();
        setData(dashboardData);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <SkeletonDashboard />;
  }

  const { stats, recentComplaints, recentVisitors, latestNotices } = data || {};

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          {greeting}, {user?.name?.split(" ")[0] || "Admin"} 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Here's an overview of your society today.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard
          title="Residents"
          value={stats?.totalResidents || 0}
          subtitle={`${stats?.activeResidents || 0} Active`}
          icon={<FaUsers />}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />

        <DashboardCard
          title="Complaints"
          value={stats?.totalComplaints || 0}
          subtitle={`${stats?.pendingComplaints || 0} Pending`}
          icon={<FaExclamationCircle />}
          bgColor="bg-red-100"
          iconColor="text-red-600"
        />

        <DashboardCard
          title="Maintenance"
          value={`₹${stats?.totalBills || 0}`}
          subtitle={`${stats?.collectionRate || 0}% Collected`}
          icon={<FaMoneyBillWave />}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />

        <DashboardCard
          title="Parking"
          value={stats?.activeParking || 0}
          subtitle="Occupied Slots"
          icon={<FaCar />}
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <VisitorChart />
        </div>

        <ComplaintStatus stats={stats} />
      </div>

      {/* Recent Complaints */}
      <div className="mt-8">
        <RecentComplaints complaintsData={recentComplaints} />
      </div>

      {/* Visitors & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RecentVisitors visitorsData={recentVisitors} />
        <LatestNotices noticesData={latestNotices} />
      </div>

      {/* Quick Actions & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <QuickActions />
        <UpcomingEvents />
      </div>
    </>
  );
}

export default Dashboard;
