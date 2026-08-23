import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

const navigationItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    label: "Learning",
    to: "/learning",
  },
  {
    label: "Progress",
    to: "/progress",
  },
];

function StudentLayout() {
  return (
    <div className="student-layout">
      <Sidebar items={navigationItems} />

      <div className="student-content">
        <main className="student-main">
          <Outlet />
        </main>

        <MobileNav items={navigationItems} />
      </div>
    </div>
  );
}

export default StudentLayout;
