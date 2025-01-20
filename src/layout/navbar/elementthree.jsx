import React from "react";
import { Menu, Dropdown, Button } from "antd";
import {
  MenuOutlined,
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
import { useNavigate } from "react-router-dom"; // For Vite, use React Router

export default function Elementthree() {
  const navigate = useNavigate();

  // Menu items
  const menuItems = [
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

  const menu = (
    <Menu>
      {menuItems.map((item, index) => (
        <Menu.Item
          key={index}
          icon={<item.Icon />}
          onClick={() => navigate(item.link)}
        >
          {item.text}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="md:hidden">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button type="text" icon={<MenuOutlined />} className="m-1">
          Categories
        </Button>
      </Dropdown>
    </div>
  );
}
