import React from "react";
import { Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/helper";

const { Text } = Typography;

export default function Items({ item, index, removeItem }) {
  return (
    <div>
    <div
      className="flex space-x-5 p-3 border-b border-gray-300"
    >
      {/* Product Image */}
      <img
        className="w-[150px] h-[150px] object-cover"
        src={item.url}
        alt={item.title}
      />

      {/* Product Details */}
      <div className="flex-1">
        {/* Product Title */}
        <Text className="text-sm line-clamp-2">
          <Link href={`/product/${item.id}`} className="hover:underline">
            {item.title}
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
          onClick={() => removeItem(index)}
        >
          REMOVE
        </Button>
      </div>

      {/* Product Price */}
      <div className="hidden md:flex items-center">
        <b className="text-xl">{formatCurrency(item.productprice)}</b>
      </div>
     
    </div>
     <section className="max-w-7xl mx-auto mt-6 p-4 bg-white shadow rounded-md">
        <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="">
            <img
              src="https://via.placeholder.com/100"
              alt="Product"
              className="w-full h-32 object-cover rounded-md"
            />
            <p className="text-sm mt-2">    {item.title}</p>
            <p className="text-orange-500 font-semibold"> {formatCurrency(item.productprice)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
