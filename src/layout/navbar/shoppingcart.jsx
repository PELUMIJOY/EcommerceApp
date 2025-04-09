import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ShoppingCart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <Link to="/cart">
      <div className="flex gap-2 items-center mr-10"> 
        <Badge count={totalQuantity} showZero>
          <ShoppingCartOutlined className="text-3xl text-gray-700" />
        </Badge>
        <p>Cart</p>
      </div>
    </Link>
  );
}