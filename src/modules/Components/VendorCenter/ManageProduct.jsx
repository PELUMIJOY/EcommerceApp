import React, { useState } from "react";
import { Button, Table, Tag, Switch, Input, Select } from "antd";

const { Option } = Select;

const ManageProducts = () => {

  // Mock data for the table
  const data = [
    {
      key: "1",
      name: "Groundnut",
      sku: "nnkkll",
      price: 3000,
      salePrice: 2000,
      currency: "NGN",
      quantity: 20,
      visible: true,
      active: false,
      date: "Jan 17, 2025",
      
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Seller SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `₦${text}`,
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
      render: (text) => `₦${text}`,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Visible",
      dataIndex: "visible",
      key: "visible",
      render: (visible) => (
        <Tag color={visible ? "green" : "red"}>
          {visible ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => <Switch checked={active} />,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button type="link" className="text-orange-500">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Modal for "Product added successfully" */}
      

      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Products</h2>
        <div className="flex space-x-2">
          <Input.Search placeholder="Search by SID" className="w-48" />
          <Input.Search placeholder="Search by SKU" className="w-48" />
          <Select placeholder="Countries" className="w-48">
            <Option value="nigeria">Nigeria</Option>
            <Option value="kenya">Kenya</Option>
          </Select>
        </div>
      </div>

      {/* Product Table */}
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 20 }}
        bordered
        className="bg-white shadow rounded-lg"
      />

      {/* Add Product Button */}
      <div className="mt-4">
        <Button
          type="primary"
          className="bg-orange-500"
          onClick={() => navigate("/product/add")}
        >
          Add Product
        </Button>
      </div>
     
    </div>
  );
};

export default ManageProducts;
