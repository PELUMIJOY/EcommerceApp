import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Message() {
  return (
    <div
      align="center"
      className="absolute w-[90%] top-[20%] left-[5%] md:w-[50%] md:top-[30%] md:left-[25%] lg:w-[30%] lg:top-[30%] lg:left-[35%] bg-white p-5 rounded-lg shadow-lg"
    >
      {/* Shopping Cart Icon with Success Message */}
      <div className="flex items-center justify-center bg-yellow-500 text-white p-3 rounded-full shadow-md">
        <ShoppingCartOutlined className="text-2xl mr-3" />
        <span>Order Received Successfully</span>
      </div>

      {/* Success Message */}
      <Title level={4} className="mt-3">
        Congratulations! Your Order Has Been Placed
      </Title>

      {/* Home Button */}
      <Link href="/">
        <Button type="primary" className="mt-3 bg-yellow-500 text-white hover:bg-yellow-600">
          Home
        </Button>
      </Link>
    </div>
  );
}
