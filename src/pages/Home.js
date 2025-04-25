import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CustomerList from "../components/CustomerList";
import ItemList from "../components/ItemList";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, itemRes] = await Promise.all([
          api.get("/customers"),
          api.get("/items"),
        ]);
        setCustomers(custRes.data);
        setItems(itemRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800 animate-pulse">
        Purchase Order Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Customers</h2>
          <CustomerList customers={customers} />
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Items</h2>
          <ItemList items={items} />
        </motion.div>
      </div>
    </div>
  );
}
