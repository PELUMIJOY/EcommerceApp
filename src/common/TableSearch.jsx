import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const TableSearch = ({
  onChange,
  onSearch,
  className,
  loading,
  placeholder,
  onBlur,
  value,
  defaultValue,
  allowClear,
}) => {
  return (
    <Input
      className={`${className ? className : ""} table-input`}
      placeholder={placeholder}
      loading={loading}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      defaultValue={defaultValue}
      prefix={<SearchOutlined />}
      allowClear={allowClear}
    />
  );
};

export default TableSearch;
