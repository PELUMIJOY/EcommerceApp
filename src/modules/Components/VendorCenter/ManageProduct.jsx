import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Button,
  Select,
} from "antd";
import { fetchItems, updateItems } from "../../../api";
import { HumanFriendlyDate } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

// EditableCell component renders a cell in edit mode or as text
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  categories,
  children,
  ...restProps
}) => {
  let inputNode;
  if (dataIndex === "category") {
    inputNode = (
      <Select>
        {categories?.map((cat) => (
          <Option key={cat._id} value={cat.title}>
            {cat.title}
          </Option>
        ))}
      </Select>
    );
  } else {
    inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ManageProducts = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const navigate = useNavigate();

  // Build uniqueCategories from products
  const uniqueCategories = Array.from(
    new Map(
      products
        ?.map((p) => p.category)
        .filter((c) => c)
        .map((cat) => [cat._id, cat])
    ).values()
  );

  // Fetch products from the backend
  const getItems = async () => {
    setLoading(true);
    try {
      const response = await fetchItems();
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // Check if the current record is being edited
  const isEditing = (record) => record._id === editingKey;

  // Begin editing a row
  const edit = (record) => {
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      stock: record.stock,
      // Set the category field to the category title
      category: record.category?.title,
    });
    setEditingKey(record._id);
  };

  // Cancel editing
  const cancel = () => {
    setEditingKey("");
  };

  // Save updated row
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...products];
      const index = newData.findIndex((item) => item._id === key);
  
      if (index > -1) {
        const item = newData[index];
        // updatedItem now sends category title
        const updatedItem = { ...item, ...row, category: row.category };
  
        console.log("Updating item:", key, updatedItem);
  
        const response = await updateItems(key, updatedItem);
  
        if (response && !response.error) {
          newData[index] = response;
          setProducts([...newData]);
          setEditingKey("");
        } else {
          console.error("Update failed:", response.error);
        }
      } else {
        console.warn("Item not found in product list");
        setEditingKey("");
      }
    } catch (errInfo) {
      console.error("Validation Failed:", errInfo);
    }
  };
  
  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `₦${text}`,
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "stock",
      key: "stock",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.title || "N/A",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => HumanFriendlyDate(date),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record._id)}
              type="link"
              style={{ marginRight: 8 }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <Button
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
            type="link"
          >
            Edit
          </Button>
        );
      },
    },
  ];

  // Merge the editable settings into the columns
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "price" || col.dataIndex === "stock"
            ? "number"
            : col.dataIndex === "category"
            ? "select"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        categories: uniqueCategories,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
      <Form form={form} component={false}>
        <Table
          dataSource={products}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ pageSize: 20 }}
          loading={loading}
          bordered
          className="bg-white shadow rounded-lg"
          rowKey={(record) => record._id}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </Form>

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
