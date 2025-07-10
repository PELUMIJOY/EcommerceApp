import { Button, Form, Input, Select, Upload, Steps, message } from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { createItems, fetchCategories } from "../../../api";
import SuccessModal from "../../../common/Modal/SuccessModal";

const { Step } = Steps;

const AddProductSteps = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async ({ fileList }) => {
    const uploadedFile = fileList?.[0];

    if (!uploadedFile) {
      form.setFieldsValue({ imageUrl: "" });
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile.originFileObj);
    formData.append("upload_preset", "didara-ecommerce");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/didaracload/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        form.setFieldsValue({ imageUrl: data.secure_url });
        message.success("Image uploaded successfully!");
      } else {
        message.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Error uploading image.");
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getCategories();
  }, []);

  const handleProductSubmit = async (values) => {
    try {
      setLoading(true);
      // values.category now contains the category _id, as expected by the backend.
      await createItems(values);
      message.success("Product added successfully!");
      setIsModalVisible(true);
    } catch (error) {
      message.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Add Product</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleProductSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <Form.Item
          name="imageUrl"
          label="Product Image"
          rules={[{ required: true, message: "Image is required" }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            onChange={handleImageChange}
            maxCount={20}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <Input placeholder="Enter Price" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category">
            {categories.map((cat) => (
              <Select.Option key={cat._id} value={cat._id}>
                {cat.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Product Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea placeholder="Enter product description" rows={4} />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Quantity"
          rules={[{ required: true, message: "Please enter a Quantity" }]}
        >
          <Input.TextArea placeholder="Enter product Quantity" rows={4} />
        </Form.Item>

        <div>
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>

      <SuccessModal
        openModal={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default AddProductSteps;
