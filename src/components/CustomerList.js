import React from "react";

export default function CustomerList({ customers }) {
  return (
    <div className="space-y-4">
      {customers.map((c) => (
        <div key={c._id} className="border-l-4 border-purple-400 p-4 bg-purple-50 rounded-xl">
          <p className="font-bold">{c.name}</p>
          <p className="text-sm text-gray-500">{c.email}</p>
        </div>
      ))}
    </div>
  );
}
