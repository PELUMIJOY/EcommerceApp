import { formatCurrency } from "../../utils/helper";
import Link from "next/link";
import React from "react";
import { Button, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function Items({ item, index, removeItem }) {
  return (
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
  );
}
