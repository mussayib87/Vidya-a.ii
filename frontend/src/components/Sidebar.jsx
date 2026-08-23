import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const defaultItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    label: "Learning",
    to: "/learning",
  },
];

function Sidebar({ items = defaultItems }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Logo />
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            {item.icon && (
              <span className="sidebar-link-icon">
                {item.icon}
              </span>
            )}

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
