import { useState, useEffect } from "react";
import { getAdminDashboard } from "../../services/dashboardService";
import { getBills } from "../../services/maintenanceService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import ReportStats from "../components/ReportStats";
import ReportToolbar from "../components/ReportToolbar";
import ReportCharts from "../components/ReportCharts";
import ReportSummary from "../components/ReportSummary";

function Reports() {
  const [dashboardData, setDashboardData] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportsData = async () => {
      setLoading(true);
      try {
        const [dashRes, billsRes] = await Promise.all([
          getAdminDashboard(),
          getBills(),
        ]);
        setDashboardData(dashRes);
        setBills(billsRes);
      } catch (error) {
        toast.error("Failed to load reports data");
      } finally {
        setLoading(false);
      }
    };
    fetchReportsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 w-full">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  const stats = dashboardData?.stats || {};

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Reports & Analytics</h1>
        <p className="mt-2 text-slate-500">
          View society-wide analytics, revenue summaries, and operational reports.
        </p>
      </div>

      <ReportStats stats={stats} />

      <ReportToolbar bills={bills} />

      <ReportCharts stats={stats} bills={bills} />

      <ReportSummary stats={stats} bills={bills} />
    </>
  );
}

export default Reports;
