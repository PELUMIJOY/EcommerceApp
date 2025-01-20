// import React from "react";
// import { Link } from "react-router-dom";

// export default function SidebarMenuItem({ link, text, Icon, active }) {
//   return (
//     <div
//       className={`flex items-center space-x-4 p-3 rounded-md cursor-pointer hover:bg-gray-200 ${
//         active ? "bg-gray-100 font-bold" : ""
//       }`}
//     >
//       <Icon className="text-xl" />
//       <Link to={`/${link}`} className="text-base">
//         {text}
//       </Link>
//     </div>
//   );
// }

import Link from "next/link";

export default function SidebarMenuItem({ link, text, Icon, active }) {
  return (
    <Link href={link} passHref>
      <div
        className={`menu-item ${active ? "active" : ""} flex items-center gap-3  rounded-md cursor-pointer`}
      >
        {Icon && <Icon className="text-xl" />} 
        <span>{text}</span>
      </div>
    </Link>
  );
}
