import { Button, Form, Input, Select, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import SuccessModal from "../../../common/Modal/SuccessModal";

const AddProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Add Product</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <Form.Item
          name="images"
          label="Images"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            className="flex justify-center"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category">
            <Option value="canned">Canned, Jarred & Packaged Food Gifts</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please enter the brand" }]}
        >
          <Input placeholder="Enter brand name" />
        </Form.Item>

        <Form.Item
          name="color"
          label="Color"
          rules={[{ required: true, message: "Please specify color" }]}
        >
          <Input placeholder="Enter color" />
        </Form.Item>

        <Form.Item
          name="weight"
          label="Weight (kg)"
          rules={[{ required: true, message: "Please enter the weight" }]}
        >
          <Input placeholder="Enter weight" type="number" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Product Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Enter product description" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={() => setIsModalVisible(true)}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <SuccessModal
        openModal={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default AddProduct;
