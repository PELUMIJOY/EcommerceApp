import { Button, DatePicker, Select, Table } from 'antd';
import React from 'react'

const { Option } = Select;
const ManageOrder = () => {
        const columns = [
          { title: "Order Number", dataIndex: "orderNumber", key: "orderNumber" },
          { title: "Order Date", dataIndex: "orderDate", key: "orderDate" },
          { title: "Pending Since", dataIndex: "pendingSince", key: "pendingSince" },
          { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
          { title: "Price", dataIndex: "price", key: "price" },
          { title: "Packed Items", dataIndex: "packedItems", key: "packedItems" },
          { title: "Labels", dataIndex: "labels", key: "labels" },
          { title: "Shipment Method", dataIndex: "shipmentMethod", key: "shipmentMethod" },
          { title: "Actions", key: "actions", render: () => <Button>View</Button> },
        ];
      
        const data = []; 
        return (
          <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-xl font-semibold mb-6">Order Management</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between mb-4">
                <div className="flex gap-4">
                  <Select placeholder="Status" className="w-48">
                    <Option value="pending">Pending</Option>
                    <Option value="shipped">Shipped</Option>
                    <Option value="delivered">Delivered</Option>
                  </Select>
                  <DatePicker.RangePicker className="w-64" />
                </div>
                <Button type="primary">Export</Button>
              </div>
              <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
            </div>
          </div>
        );
      };
      
export default ManageOrder