import React from "react";
import { Outlet } from "react-router-dom";

const Vendor = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-screen">
        <div className="p-4 font-bold text-lg">Vendor Center</div>
        <ul>
          <li className="p-4 cursor-pointer">
            <a href="/vendor/addCategory">Add Category</a>
          </li>
          <li className="p-4 cursor-pointer">
            <a href="/vendor/addProduct">Add Products</a>
          </li>
          <li className="p-4 cursor-pointer">
            <a href="/vendor/products">Manage Products</a>
          </li>
          <li className="p-4 cursor-pointer">
            <a href="/vendor/orders">Orders</a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet /> {/* Render child routes here */}
      </main>
    </div>
  );
};

export default Vendor;
