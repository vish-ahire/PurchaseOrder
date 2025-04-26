import React, { useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    gstNumber: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers", form);
      alert("Customer added successfully!");
      setForm({ name: "", address: "", gstNumber: "", email: "", phone: "" });
    } catch (err) {
      alert("Error adding customer");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 p-10">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Add New Customer</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-lg mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full p-2 border rounded"
          value={form.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gstNumber"
          placeholder="GST Number"
          className="w-full p-2 border rounded"
          value={form.gstNumber}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          value={form.phone}
          onChange={handleChange}
        />
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Save Customer
        </button>
      </form>
    </div>
  );
}
