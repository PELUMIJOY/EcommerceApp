import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Input, Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Items from "./items";
import { formatCurrency } from "../../../utils/helper";
import { removeFromCart, clearCart } from "../../../app/cartSlice";

const { TextArea } = Input;
const { Text } = Typography;

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartSum, setCartSum] = useState(0);
  const [deliverySum, setDeliverySum] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumber || "",
    deliveryAddress: user?.deliveryAddress || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calculateTotals = () => {
      const sum = cart.reduce((acc, item) => acc + parseInt(item.productprice), 0);
      const delivery = cart.reduce((acc, item) => acc + parseInt(item.deliveryPrice || 0), 0);
      setCartSum(sum);
      setDeliverySum(delivery);
    };
    calculateTotals();
  }, [cart]);

  const handleCheckout = async () => {
    if (!formData.phoneNumber || !formData.deliveryAddress) {
      message.error("Please fill in your phone number and delivery address.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(clearCart());
      message.success("Order placed successfully! Redirecting to OTP page...");
      navigate("/otp");
    }, 1000);
  };

  const removeItem = (index) => {
    dispatch(removeFromCart(index));
  };

  return (
    <div className="p-3 md:flex md:space-x-5">
      <div className="bg-white shadow-lg p-3 rounded-lg text-black w-full md:w-2/3">
        <Text className="text-xl uppercase">Cart ({cart.length})</Text>
        <div className="border-b my-3"></div>
        {cart.length === 0 ? (
          <Text className="capitalize">Cart is Empty</Text>
        ) : (
          cart.map((item, index) => (
            <Items key={item.id} item={item} index={index} removeItem={removeItem} />
          ))
        )}
      </div>

      <div className="bg-white shadow-lg p-3 rounded-lg w-full md:w-1/3 mt-3 md:mt-0">
        <Text className="text-sm uppercase">Cart Summary</Text>
        <div className="border-b my-3"></div>
        <div>Sub Total: {formatCurrency(cartSum)}</div>
        <div className="text-sm text-gray-400">
          {deliverySum === 0 ? "Delivery Fee: FREE" : `Delivery Fee: ${formatCurrency(deliverySum)}`}
        </div>

        {/* Delivery Details */}
        <Input
          className="mt-3"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
        <TextArea
          className="mt-3"
          rows={4}
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
        />

        {/* Checkout Button */}
        <Button
          className="mt-3 w-full bg-orange-500 text-white"
          loading={loading}
          onClick={() => (user ? handleCheckout() : navigate("/register"))}
        >
          Checkout ({formatCurrency(cartSum + deliverySum)})
        </Button>

        <p className="text-sm text-gray-500 mt-4">
          Returns are easy. Free return within 7 days for ALL eligible items.
        </p>
      </div>
    </div>
  );
}
