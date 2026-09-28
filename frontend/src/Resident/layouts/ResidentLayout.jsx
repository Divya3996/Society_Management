import { useState } from "react";
import { Outlet } from "react-router-dom";

import ResidentSidebar from "../components/ResidentSidebar";
import ResidentNavbar from "../components/ResidentNavbar";

/**
 * ResidentLayout — uses Outlet for nested routing.
 */
function ResidentLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <ResidentSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`transition-all duration-300 ease-in-out min-h-screen ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <ResidentNavbar setMobileOpen={setMobileOpen} />

        <main className="min-h-[calc(100vh-80px)] bg-slate-100 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ResidentLayout;