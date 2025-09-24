import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  selectCartItems,
  updateQuantity,
} from "../../../app/cartSlice";

const { Text } = Typography;

export default function Items({ item, index, removeItem }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = useParams();
  const { product: details } = location.state || {};
  const cartItems = useSelector(selectCartItems);
  const existingCartItem = cartItems.find((item) => item.id === details?.id);

  const [quantity, setQuantity] = useState(existingCartItem?.quantity || 0);

  useEffect(() => {
    // Update quantity when cart changes
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity);
    }
  }, [existingCartItem]);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: details.id, quantity: newQuantity }));

    if (user) {
      dispatch(
        addItemToCart({
          userId: user._id,
          productId: details.id,
          quantity: 1,
          product: details,
        })
      );
    }

    notification.success({ message: "Product added successfully" });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: details.id, quantity: newQuantity }));

      notification.info({ message: "Item quantity has been updated" });
    } else if (quantity === 1) {
      dispatch(removeFromCart({ id: details.id }));
      setQuantity(0);

      notification.warning({
        message: "Product was removed from cart successfully",
      });
    }
  };

  return (
    <div>
      <div className="flex space-x-5 p-3 border-b border-gray-300">
        {/* Product Image */}
        <img
          className="w-[150px] h-[150px] object-cover"
          src={item.imageUrl || item.url}
          alt={item.title || item.name}
        />

        {/* Product Details */}
        <div className="flex-1">
          {/* Product Title */}
          <Text className="text-sm line-clamp-2">
            <Link to={`/product/${item.id}`} className="hover:underline">
              {item.title || item.name}
            </Link>
          </Text>

          {/* Stock Status */}
          <p className="text-gray-400 text-sm capitalize mt-1">
            {item.units === 0 ? (
              <Text className="text-red-700 text-sm">Out of Stock</Text>
            ) : (
              "In Stock"
            )}
          </p>

          {/* Quantity */}
          <p className="text-gray-600 text-sm mt-1">
            Quantity: {item.quantity || 1}
          </p>

          {/* Delivery Info */}
          <p className="mt-1">
            {!item.deliveryPrice ? (
              <Text className="text-green-800 text-sm">Free Delivery</Text>
            ) : (
              <Text className="text-gray-500 text-sm">
                + shipping from {formatCurrency(item.deliveryPrice)}
              </Text>
            )}
          </p>

          {/* Remove Button */}
          <Button
            danger
            className="mt-3"
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => removeItem(item)} // Pass the whole item instead of just index
          >
            REMOVE
          </Button>

          <div className="flex items-center mt-2 text-white">
            <Link to="/" className="bg-orange-600 p-2 items-center">
              Go back
            </Link>
            {/* <Button
              type="primary"
              onClick={decrementQuantity}
              className="bg-orange-500 text-lg"
            >
              -
            </Button>
            <span className=" text-xl">{quantity}</span>
            <Button
              type="primary"
              onClick={incrementQuantity}
              className="bg-orange-500 text-lg"
            >
              +
            </Button> */}
            {/* <p> {quantity} item(s) added </p> */}
          </div>
        </div>

        {/* Product Price */}
        <div className="hidden md:flex items-center">
          <b className="text-xl">
            {formatCurrency(item.price * (item.quantity || 1))}
          </b>
        </div>
      </div>
    </div>
  );
}
