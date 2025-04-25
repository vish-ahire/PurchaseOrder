// src/components/SidebarLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const SidebarLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-600 to-indigo-700 text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-8">PO Dashboard</h1>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-white/10 ${
                isActive ? "bg-white/20" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/create-po"
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-white/10 ${
                isActive ? "bg-white/20" : ""
              }`
            }
          >
            Create PO
          </NavLink>
          <NavLink
            to="/create-item"
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-white/10 ${
                isActive ? "bg-white/20" : ""
              }`
            }
          >
            create-item
          </NavLink>
          <NavLink
            to="/add-customer"
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-white/10 ${
                isActive ? "bg-white/20" : ""
              }`
            }
          >
            add-customer
          </NavLink>
        </nav>
        <LogoutButton className="to" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
