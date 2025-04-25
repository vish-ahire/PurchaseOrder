import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-10 text-center">
      <h1 className="text-4xl font-bold text-green-800">About This App</h1>
      <p className="mt-4 text-lg text-gray-700">
        This is a demo app for managing Purchase Orders with customer and item data.
      </p>
    </div>
  );
}
