import { Button, Form, Input, Steps, message, Space } from "antd";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createCategory } from "../../../api";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const AddCategory = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  //   const [category, setCategory] = useState({ id: null, title: "" });
  const [loading, setLoading] = useState(false);

  const handleCategorySubmit = async (values) => {
    const subcategories =
      values.subcategories?.map((subcategory) => ({
        title: subcategory.title,
        description: subcategory.description || undefined,
      })) || [];
    navigate("/vendor/addProduct");
    try {
      setLoading(true);
      const response = await createCategory({
        description: values.description,
        title: values.title,
        subcategories,
      });

      //   setCategory({ id: response.id, title: values.title });
      message.success("Category created successfully!");
    } catch (error) {
      message.error("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Add Category </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleCategorySubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <Form.Item
          name="title"
          label="Category Title"
          rules={[{ required: true, message: "Please enter category title" }]}
        >
          <Input placeholder="Enter category title" />
        </Form.Item>

        <Form.Item name="description" label="Category Description">
          <Input.TextArea placeholder="Enter category description" rows={4} />
        </Form.Item>

        <Form.List name="subcategories" initialValue={[]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    fieldKey={[fieldKey, "title"]}
                    label="Subcategory Title"
                  >
                    <Input placeholder="Subcategory title (optional)" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    fieldKey={[fieldKey, "description"]}
                    label="Subcategory Description"
                  >
                    <Input placeholder="Subcategory description (optional)" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Subcategory
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div className="">
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddCategory;
