import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import CreatePO from "./pages/CreatePO";
import Register from "./pages/Register";
import CreateItem from "./pages/CreateItem";
import AddCustomer from "./pages/AddCustomer";
import PrivateRoute from "./components/PrivateRoute";
import SidebarLayout from "./components/SidebarLayout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    // <Router>
    //   <div className="flex min-h-screen">
    //     <aside className="w-64 bg-purple-800 text-white p-6 space-y-4">
    //       <h2 className="text-xl font-bold">PO Manager</h2>
    //       <nav className="flex flex-col space-y-2">
    //         <Link to="/" className="hover:bg-purple-700 p-2 rounded">
    //           Dashboard
    //         </Link>
    //         <Link to="/create-po" className="hover:bg-purple-700 p-2 rounded">
    //           Create PO
    //         </Link>
    //         <Link to="/create-item" className="hover:bg-purple-700 p-2 rounded">
    //           Create Item
    //         </Link>
    //         <Link to="/about" className="hover:bg-purple-700 p-2 rounded">
    //           About
    //         </Link>
    //         <Link to="/login" className="hover:bg-purple-700 p-2 rounded">
    //           Login
    //         </Link>
    //         <Link to="/register" className="hover:bg-purple-700 p-2 rounded">
    //           Register
    //         </Link>
    //         <Link
    //           to="/add-customer"
    //           className="hover:bg-purple-700 p-2 rounded"
    //         >
    //           Add Customer
    //         </Link>
    //       </nav>
    //     </aside>
    //     <main className="flex-1">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/about" element={<About />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/create-po" element={<CreatePO />} />
    //         <Route path="/register" element={<Register />} />
    //         <Route path="/create-item" element={<CreateItem />} />
    //         <Route path="/add-customer" element={<AddCustomer />} />
    //       </Routes>
    //     </main>
    //   </div>
    // </Router>

    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<SidebarLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-po" element={<CreatePO />} />
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/add-customer" element={<AddCustomer />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
