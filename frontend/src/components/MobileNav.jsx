import React from "react";
import { NavLink } from "react-router-dom";

function MobileNav({ items = [] }) {
  return (
    <nav className="mobile-nav">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive
              ? "mobile-nav-item active"
              : "mobile-nav-item"
          }
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileNav;
