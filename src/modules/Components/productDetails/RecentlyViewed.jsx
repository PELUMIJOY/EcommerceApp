import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/helper";

const { Text } = Typography;

export default function RecentlyViewed({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto mt-6 p-4 bg-white shadow rounded-md">
      <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {items.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <Link to={`/product/${item.id}`} state={{ product: item }}>
              <img
                src={item.imageUrl || item.url}
                alt={item.title || item.name}
                className="w-full h-32 object-cover rounded-md"
              />
              <p className="text-sm mt-2 line-clamp-2">{item.title || item.name}</p>
              <p className="text-orange-500 font-semibold">{formatCurrency(item.price)}</p>
              <p className="text-sm mt-1">
                {(item.stock > 0) ? (
                  <Text className="text-green-600">In Stock ({item.stock} left)</Text>
                ) : (
                  <Text className="text-red-600">Out of Stock</Text>
                )}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}