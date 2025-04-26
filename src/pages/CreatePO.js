import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function CreatePurchaseOrder() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [allPO, setAllPO] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await api.get("/customers");
        const res2 = await api.get("/items");
        setCustomers(res1.data);
        setItems(res2.data);
      } catch (error) {
        console.error("Error fetching customers or items:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPO = async () => {
      try {
        const res1 = await api.get(
          `purchase-orders/customer/${selectedCustomer}`
        );
        setAllPO(res1.data);
      } catch (error) {
        console.error("Error fetching customers or items:", error);
      }
    };
    if (selectedCustomer) fetchPO();
    if (selectedCustomer=='') setAllPO("")
  }, [selectedCustomer]);
  const addItemToOrder = () => {
    setOrderItems([
      ...orderItems,
      { item: "", quantity: 1, rate: 0, total: 0 },
    ]);
  };

  const handleOrderItemChange = (index, field, value) => {
    const updated = [...orderItems];
    updated[index][field] = value;

    const quantity = Number(updated[index].quantity || 1);
    const rate = Number(updated[index].rate || 0);

    // If item is changed, autofill rate from item list
    if (field === "item") {
      const selectedItem = items.find((i) => i._id === value);
      updated[index].rate = selectedItem?.price || 0;
    }

    // Recalculate total
    updated[index].total = quantity * Number(updated[index].rate || 0);
    setOrderItems(updated);
  };

  const calculateTotal = () => {
    return orderItems.reduce((acc, item) => acc + (item.total || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || orderItems.length === 0) {
      alert("Please submit all details!");
      return;
    }

    try {
      const simplifiedItems = orderItems.map(({ item, quantity }) => ({
        item,
        quantity,
      }));
      await api.post("/purchase-orders", {
        customer: selectedCustomer,
        items: simplifiedItems,
      });

      alert("Purchase order submitted successfully!");
      setSelectedCustomer("");
      setOrderItems([]);
    } catch (error) {
      alert("Error submitting purchase order.");
      console.error(error);
    }
  };
  console.log(allPO,selectedCustomer)

  return (
    <>
      <div className=" bg-gradient-to-br from-green-100 to-lime-100 p-10">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Create Purchase Order
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-6 w-full max-w-4xl mx-auto"
        >
          <div>
            <label className="block mb-2 font-semibold">Select Customer:</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              required
            >
              <option value="">-- Choose Customer --</option>
              {customers.map((cust) => (
                <option key={cust._id} value={cust._id}>
                  {cust.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Order Items:</label>
            {orderItems.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-3 mb-4">
                <select
                  className="p-2 border rounded"
                  value={item.item}
                  onChange={(e) =>
                    handleOrderItemChange(index, "item", e.target.value)
                  }
                  required
                >
                  <option value="">-- Select Item --</option>
                  {items.map((it) => (
                    <option key={it._id} value={it._id}>
                      {it.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  className="p-2 border rounded"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleOrderItemChange(index, "quantity", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Rate"
                  className="p-2 border rounded"
                  value={item.rate}
                  onChange={(e) =>
                    handleOrderItemChange(index, "rate", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  className="p-2 border rounded bg-gray-100"
                  value={item.total}
                  readOnly
                  placeholder="Total"
                />
                <button
                  type="button"
                  className="text-red-500 font-bold"
                  onClick={() => {
                    const updated = [...orderItems];
                    updated.splice(index, 1);
                    setOrderItems(updated);
                  }}
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={addItemToOrder}
            >
              + Add Item
            </button>
          </div>

          <div className="text-right text-xl font-semibold text-green-800">
            Total Amount: ₹{calculateTotal().toFixed(2)}
          </div>

          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-700 text-lg block mx-auto"
          >
            Submit Purchase Order
          </button>
        </form>
      </div>
      {allPO &&  <div className="">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Purchase Orders</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Customer</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Item</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Quantity</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Rate</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allPO.map((order) =>
              order.items.map((it, idx) => (
                <tr key={`${order._id}-${idx}`}>
                  <td className="px-4 py-3">{order.customer?.name}</td>
                  <td className="px-4 py-3">{it.item?.name}</td>
                  <td className="px-4 py-3">{it.quantity}</td>
                  <td className="px-4 py-3">{it.rate}</td>
                  <td className="px-4 py-3">{it.rate * it.quantity}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-yellow-200 rounded-full text-sm">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>}
    </>
  );
}
