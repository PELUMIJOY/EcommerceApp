import React from "react";

export default function RecomHeader({ title, color }) {
  return (
    <div className={`p-3 rounded-lg text-xl uppercase ${color} text-center`}>
      {title}
    </div>
  );
}
