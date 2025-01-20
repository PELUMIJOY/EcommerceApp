import React from "react";
import { useSelector } from "react-redux"; 
import { Typography } from "antd";

const { Title } = Typography;

export default function Checkout() {
  const cart = useSelector((state) => state.cart.items); 

  return (
    <div className="p-4">
      <Title level={2}>Checkout</Title>

      {/* Empty Cart Message */}
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty. Add some items to proceed with checkout.
        </div>
      ) : (
        <div>
          {/* List Cart Items */}
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 border-b border-gray-300"
            >
              <div>
                <Title level={5}>{item.title}</Title>
                <p className="text-sm text-gray-500">
                  Price: {item.price} | Quantity: {item.quantity}
                </p>
              </div>
              <Title level={5}>{item.price * item.quantity}</Title>
            </div>
          ))}

          {/* Checkout Summary */}
          <div className="mt-4">
            <Title level={4}>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</Title>
          </div>
        </div>
      )}
    </div>
  );
}
