import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../../utils/helper";

export default function Elementthree() {
  const navigate = useNavigate();

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
