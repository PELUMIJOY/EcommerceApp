import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom"; // For navigation in React Router

export default function ShoppingCart({ items }) {
  return (
    <Link to="/cart">
      <div className="flex gap-2 items-center mr-10"> 
      <Badge count={items} showZero   >
        <ShoppingCartOutlined className="text-3xl text-gray-700" />
      </Badge>
        <p>Cart</p>
      </div>
    </Link>
  );
}
