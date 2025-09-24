import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

export default function Post({ title, image, price, id, onClick }) {
  return (
    <Card
      hoverable
      onClick={onClick}
      cover={
        <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img alt={title} src={image} className="w-full h-auto" />
        </div>
      }
      className="rounded-lg shadow-sm cursor-pointer"
    >
      <Link to={`/product/${id}`}>
        <h3 className="font-bold text-center line-clamp-2">{title}</h3>
        <p className="text-center text-lg text-gray-700">{price}</p>
      </Link>
    </Card>
  );
}
