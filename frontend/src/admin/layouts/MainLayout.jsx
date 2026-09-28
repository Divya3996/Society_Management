import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-slate-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <Navbar setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto bg-slate-100 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;