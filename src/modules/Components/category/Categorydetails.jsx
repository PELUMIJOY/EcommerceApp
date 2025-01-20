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
          key={product.id}
          className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
        >
          <img
            src={product.url}
            alt={product.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="mt-2">
            <Title level={5} className="line-clamp-2">
              {product.title}
            </Title>
            <Text>{formatCurrency(product.productprice)}</Text>
            <Button
              onClick={() =>
                navigate(`/product/${product.id}`, {
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
