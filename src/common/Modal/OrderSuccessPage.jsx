import React, { useState } from "react";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState();

  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleViewOrder = () => {
    navigate("/orders", { state: { recentOrder: orderDetails.id } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        <div className="text-green-500 text-6xl mb-4">
          <CheckCircleOutlined />
        </div>
        <Title level={2}>Payment Successful!</Title>
        <p className="mb-6 text-gray-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="bg-gray-50 p-4 mb-6 text-left rounded-lg border">
          <p>
            <strong>Order ID:</strong> {orderDetails?.id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(orderDetails?.date).toLocaleString()}
          </p>
          <p>
            <strong>Total Amount:</strong> NGN{orderDetails?.total.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> Processing
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={handleContinueShopping}>Continue Shopping</Button>
          <Button type="primary" onClick={handleViewOrder}>
            View Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
