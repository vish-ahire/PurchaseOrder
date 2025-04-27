import React, { useState } from "react";
import { api } from "../helper/axios";

export default function CreateItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/items", { name, price, stock });
      alert("Item added successfully!");
      setName("");
      setPrice("");
      setStock("");
    } catch (err) {
      console.error(err);
      alert("Failed to add item.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-100 p-10">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Create Item</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          className="w-full p-2 border rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
          Add Item
        </button>
      </form>
    </div>
  );
}
