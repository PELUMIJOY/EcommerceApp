// import React from "react";
// import { Button, Typography } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import { formatCurrency } from "../../../utils/helper";

// const { Text } = Typography;

// export default function Items({ item, index, removeItem }) {
//   return (
//     <div>
//     <div
//       className="flex space-x-5 p-3 border-b border-gray-300"
//     >
//       {/* Product Image */}
//       <img
//         className="w-[150px] h-[150px] object-cover"
//         src={item.imageUrl}
//         alt={item.title}
//       />

//       {/* Product Details */}
//       <div className="flex-1">
//         {/* Product Title */}
//         <Text className="text-sm line-clamp-2">
//           <Link href={`/product/${item.id}`} className="hover:underline">
//             {item.title}
//           </Link>
//         </Text>

//         {/* Stock Status */}
//         <p className="text-gray-400 text-sm capitalize mt-1">
//           {item.units === 0 ? (
//             <Text className="text-red-700 text-sm">Out of Stock</Text>
//           ) : (
//             "In Stock"
//           )}
//         </p>

//         {/* Delivery Info */}
//         <p className="mt-1">
//           {!item.deliveryPrice ? (
//             <Text className="text-green-800 text-sm">Free Delivery</Text>
//           ) : (
//             <Text className="text-gray-500 text-sm">
//               + shipping from {formatCurrency(item.deliveryPrice)}
//             </Text>
//           )}
//         </p>

//         {/* Remove Button */}
//         <Button
//           danger
//           className="mt-3"
//           type="text"
//           icon={<DeleteOutlined />}
//           onClick={() => removeItem(index)}
//         >
//           REMOVE
//         </Button>
//       </div>

//       {/* Product Price */}
//       <div className="hidden md:flex items-center">
//         <b className="text-xl">{formatCurrency(item.price)}</b>
//       </div>

//     </div>
//      <section className="max-w-7xl mx-auto mt-6 p-4 bg-white shadow rounded-md">
//         <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
//           <div className="">
//             <img
//               src={item.imageUrl}
//               alt="Product"
//               className="w-full h-32 object-cover rounded-md"
//             />
//             <p className="text-sm mt-2">    {item.title}</p>
//             <p className="text-orange-500 font-semibold"> {formatCurrency(item.price)}</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { formatCurrency } from "../../../utils/helper";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../app/cartSlice";

const { Text } = Typography;

export default function Items({ item, index, removeItem }) {
    const location = useLocation();
    const { product: details } = location.state || {};
  const cartItems = useSelector(selectCartItems);
  const existingCartItem = cartItems.find((item) => item.id === details?.id);

  const [quantity, setQuantity] = useState(existingCartItem?.quantity || 0);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: details.id, quantity: newQuantity }));
    
    if (user) {
      dispatch(addItemToCart({
        userId: user._id,
        productId: details.id,
        quantity: 1,
        product: details
      }));
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
      
      notification.warning({ message: "Product was removed from cart successfully" });
    }
  };
  return (
    <div>
      <div className="flex space-x-5 p-3 border-b border-gray-300">
        {/* Product Image */}
        <img
          className="w-[150px] h-[150px] object-cover"
          src={item.imageUrl || item.url} // Added fallback for image URL
          alt={item.title || item.name} // Added fallback for title
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
          <div className="flex items-center mt-5 space-x-3">
            <Button
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
            </Button>
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
