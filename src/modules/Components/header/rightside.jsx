import React from "react";
import art from "../../../assets/images/art.jpeg";
import oxford from "../../../assets/images/oxford.jpg";

export default function Rightside() {
  return (
    <div className="hidden lg:flex lg:w-[300px] xl:w-[320px] flex-col space-y-2 h-[500px] ml-auto">
      {/* First Image */}
      <div className="h-[248px] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
        <img
          src={art}
          alt="img"
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Second Image */}
      <div className="h-[248px] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
        <img
          src={oxford}
          alt="JForce Initiative"
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}
