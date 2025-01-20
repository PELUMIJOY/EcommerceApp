import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  AppstoreOutlined,
  MobileOutlined,
  LaptopOutlined,
  CustomerServiceOutlined,
  SkinOutlined,
  BugOutlined,
  SmileOutlined,
  TrophyOutlined,
  BarsOutlined,
} from "@ant-design/icons";

export const menuItems = [
  { link: "/category/supermarket", text: "Supermarket", Icon: ShoppingOutlined },
  { link: "/category/healthbeauty", text: "Health & Beauty", Icon: MedicineBoxOutlined },
  { link: "/category/homeoffice", text: "Home & Office", Icon: HomeOutlined },
  { link: "/category/appliances", text: "Appliances", Icon: AppstoreOutlined },
  { link: "/category/phonestablets", text: "Phones & Tablets", Icon: MobileOutlined },
  { link: "/category/computing", text: "Computing", Icon: LaptopOutlined },
  { link: "/category/electronics", text: "Electronics", Icon: CustomerServiceOutlined },
  { link: "/category/fashion", text: "Fashion", Icon: SkinOutlined },
  { link: "/category/babyproducts", text: "Baby Products", Icon: BugOutlined },
  { link: "/category/gaming", text: "Gaming", Icon: SmileOutlined },
  { link: "/category/sportinggoods", text: "Sporting Goods", Icon: TrophyOutlined },
  { link: "/category/othercategories", text: "Other Categories", Icon: BarsOutlined },
];
export default function Leftside() {
  const navigate = useNavigate();

 

  return (
    <div className="hidden md:inline md:w-[40%] lg:w-[20%]">
      <div className="items-start bg-white p-4 h-full rounded-md shadow-2xl">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.link)}
            className="menu-item flex items-center gap-3 rounded-md cursor-pointer p-2 hover:bg-gray-200"
          >
            {item.Icon && <item.Icon className="text-xl" />}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
