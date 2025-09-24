import React from "react";
import { Button, Typography } from "antd";
import { formatCurrency } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function CategoryDetails({ products }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-lg rounded-lg flex flex-col"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            // className="w-full h-auto rounded-lg"
            className="max-h-full max-w-full object-contain"
          />
          <div className="mt-2">
            <Title level={5} className="line-clamp-2">
              {product.name}
            </Title>
            <Text>{formatCurrency(product.price)}</Text>
            <Button
              onClick={() =>
                navigate(`/product/${product._id}`, {
                  state: { product },
                })
              }
              className="block mt-2 text-black bg-orange-500"
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
