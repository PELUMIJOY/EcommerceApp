// DashboardShell.js
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./navbar";
import Leftside from "./leftside";

const DashboardShell = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Sticky Sidebar */}
        <div className="hidden md:block md:w-[280px] lg:w-[300px] sticky top-0 h-screen overflow-y-auto">
          <Leftside />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;
