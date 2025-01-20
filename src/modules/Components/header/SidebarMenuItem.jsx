import { Link } from "react-router-dom";

export default function SidebarMenuItem({ link, text, Icon, active }) {
  return (
    <Link href={link} passHref>
      <div
        className={`menu-item ${
          active ? "active" : ""
        } flex items-center gap-3  rounded-md cursor-pointer`}
      >
        {Icon && <Icon className="text-xl" />}
        <span>{text}</span>
      </div>
    </Link>
  );
}
