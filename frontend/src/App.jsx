import { Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Shared
import ProtectedRoute from "./admin/components/ProtectedRoute";

// Admin Layout + Pages
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminResidents from "./admin/pages/Residents";
import AdminVisitors from "./admin/pages/Visitors";
import AdminComplaints from "./admin/pages/Complaints";
import AdminMaintenance from "./admin/pages/Maintenance";
import AdminNotice from "./admin/pages/Notice";
import AdminParking from "./admin/pages/Parking";
import AdminPolls from "./admin/pages/Polls";
import AdminStaff from "./admin/pages/Staff";
import AdminReports from "./admin/pages/Reports";
import AdminProfile from "./admin/pages/Profile";
import AdminSettings from "./admin/pages/Settings";

// Resident Layout + Pages
import ResidentLayout from "./Resident/layouts/ResidentLayout";
import ResidentDashboard from "./Resident/pages/Dashboard";
import ResidentVisitors from "./Resident/pages/Visitors";
import ResidentComplaints from "./Resident/pages/Complaints";
import ResidentMaintenance from "./Resident/pages/Maintenance";
import ResidentNotice from "./Resident/pages/Notice";
import ResidentParking from "./Resident/pages/Parking";
import ResidentPolls from "./Resident/pages/Polls";
import ResidentProfile from "./Resident/pages/Profile";
import ResidentSettings from "./Resident/pages/Settings";

function App() {
  return (
    <Routes>
      {/* ── Public Routes ───────────────────────────────── */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── Admin Routes (protected, role=admin) ─────────── */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/residents" element={<AdminResidents />} />
          <Route path="/admin/visitors" element={<AdminVisitors />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/maintenance" element={<AdminMaintenance />} />
          <Route path="/admin/notices" element={<AdminNotice />} />
          <Route path="/admin/parking" element={<AdminParking />} />
          <Route path="/admin/polls" element={<AdminPolls />} />
          <Route path="/admin/staff" element={<AdminStaff />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* ── Resident Routes (protected, role=resident) ────── */}
      <Route element={<ProtectedRoute role="resident" />}>
        <Route element={<ResidentLayout />}>
          <Route path="/resident/dashboard" element={<ResidentDashboard />} />
          <Route path="/resident/visitors" element={<ResidentVisitors />} />
          <Route path="/resident/complaints" element={<ResidentComplaints />} />
          <Route path="/resident/maintenance" element={<ResidentMaintenance />} />
          <Route path="/resident/notices" element={<ResidentNotice />} />
          <Route path="/resident/parking" element={<ResidentParking />} />
          <Route path="/resident/polls" element={<ResidentPolls />} />
          <Route path="/resident/profile" element={<ResidentProfile />} />
          <Route path="/resident/settings" element={<ResidentSettings />} />
        </Route>
      </Route>

      {/* ── 404 ─────────────────────────────────────────── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;