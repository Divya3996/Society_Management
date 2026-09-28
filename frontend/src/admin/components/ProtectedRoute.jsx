import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * ProtectedRoute — wraps a group of routes to enforce authentication and role.
 *
 * Usage in App.jsx:
 *   <Route element={<ProtectedRoute role="admin" />}>
 *     <Route element={<AdminLayout />}>
 *       <Route path="/admin/dashboard" element={<Dashboard />} />
 *     </Route>
 *   </Route>
 *
 * @param {string} role - "admin" | "resident" | undefined (any authenticated user)
 */
function ProtectedRoute({ role }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // Redirect to the appropriate dashboard based on actual role
    const fallback =
      user?.role === "admin" ? "/admin/dashboard" : "/resident/dashboard";
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
