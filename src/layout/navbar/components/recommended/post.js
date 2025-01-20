import React from "react";
import { Card } from "antd";
import Link from "next/link";

export default function Post({ title, image, price, id }) {
  return (
    <Card
      hoverable
      cover={<img alt={title} src={image} className="h-48 object-cover" />}
    >
      <Link href={`/product/${id}`}>
        <h3 className="font-bold text-center">{title}</h3>
        <p className="text-center text-lg text-gray-700">{price}</p>
      </Link>
    </Card>
  );
}
