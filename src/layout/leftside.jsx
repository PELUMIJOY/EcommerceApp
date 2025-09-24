import React from "react";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../utils/helper";


export default function Leftside({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden md:block md:w-[280px] lg:w-[300px] bg-white shadow-lg sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 h-full">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.link)}
                className="menu-item flex items-center gap-3 rounded-md cursor-pointer p-3 hover:bg-gray-100 transition-colors duration-200"
              >
                {item.Icon && <item.Icon className="text-xl text-gray-600" />}
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}