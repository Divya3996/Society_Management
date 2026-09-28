import Dashboard from "../pages/Dashboard";
import Visitors from "../pages/Visitors";
import Complaints from "../pages/Complaints";
import Maintenance from "../pages/Maintenance";
import Notice from "../pages/Notice";
import Parking from "../pages/Parking";
import Polls from "../pages/Polls";
import Profile from "../pages/Profile";
import Residents from "../pages/Residents";
import Staff from "../pages/Staff";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

const adminRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/visitors", element: <Visitors /> },
  { path: "/complaints", element: <Complaints /> },
  { path: "/maintenance", element: <Maintenance /> },
  { path: "/notice", element: <Notice /> },
  { path: "/parking", element: <Parking /> },
  { path: "/polls", element: <Polls /> },
  { path: "/profile", element: <Profile /> },
  { path: "/residents", element: <Residents /> },
  { path: "/staff", element: <Staff /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Settings /> },
];

export default adminRoutes;
