import { Link } from "react-router-dom";

export default function SidebarMenuItem({ link, text, Icon, active }) {
  return (
    <Link to={link} className="block">
      <div
        className={`menu-item ${
          active ? "bg-blue-50 text-blue-600" : "text-gray-700"
        } flex items-center gap-3 rounded-md cursor-pointer p-3 hover:bg-gray-100 transition-colors duration-200`}
      >
        {Icon && <Icon className="text-xl" />}
        <span className="font-medium">{text}</span>
      </div>
    </Link>
  );
}
