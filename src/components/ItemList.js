import React from "react";

export default function ItemList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((i) => (
        <div key={i._id} className="border-l-4 border-indigo-400 p-4 bg-indigo-50 rounded-xl">
          <p className="font-bold">{i.name} - ₹{i.price}</p>
          <p className="text-sm text-gray-500">In stock: {i.stock}</p>
        </div>
      ))}
    </div>
  );
}
