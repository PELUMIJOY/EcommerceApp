import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ category, brand, title }) {
  return (
    <div className="text-sm m-2">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/category/${category}`}>{category}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{brand}</Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
