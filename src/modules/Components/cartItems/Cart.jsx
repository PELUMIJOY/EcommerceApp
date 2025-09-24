import React from "react";
import { Card } from "antd";
import CartItems from "./cartitems";

export default function Cart() {
  return (
    <div className="md:max-w-7xl mx-auto p-4">
      <Card title="Your Cart" bordered={false} className="shadow-lg rounded-lg">
        <CartItems />
      </Card>
    </div>
  );
}
