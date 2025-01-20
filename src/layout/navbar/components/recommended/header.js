import React from "react";

export default function RecomHeader({ title, color }) {
  return (
    <div
      className={`p-3 rounded-lg text-xl text-white uppercase ${color}`}
    >
      {title}
    </div>
  );
}
