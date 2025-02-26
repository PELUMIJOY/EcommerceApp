import { notification } from "antd";
import axios from "axios";


const BASE_URL = "http://localhost:8000";

export const api= axios.create({
    baseURL:  BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export const fetchCategories = async () => {
    try {
      const response = await api.get(`/api/categories`);
      return response.data; 
      notification.success(response.data.message)
    } catch (error) {
      notification.error(response.data.error)
      console.error("Error fetching categories:", error);
      throw error;
    }
  };


  export const fetchItems = async () => {
    try {
      const response = await api.get(`/api/items`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  };
  export const createCategory = async (data) => {
    try {
      const response = await api.post(`/api/categories`, data); 
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error.response?.data || error);
      throw error;
    }
  };

  export const createItems = async (data) => {
    try {
      const response = await api.post(`/api/items`, data);
      return response.data; 
    c
    } catch (error) {
      console.error("Error create items:", error);
      throw error;
    }
  };
  export const updateCategory = async () => {
    try {
      const response = await api.put(`/api/categories/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error update category:", error);
      throw error;
    }
  };
  export const updateItems = async (id, updatedItem) => {
    try {
      const response = await api.put(`/api/items/${id}`, updatedItem);
      return response.data; 
    } catch (error) {
      console.error("Error update items:", error);
      throw error;
    }
  };
  // export const updateItems = async (id, updatedItem) => {
  //   try {
  //     const response = await api.put(`/api/items/${id}`, {  // Ensure ID is in URL
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedItem),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Failed to update item");
  //     }
  
  //     return await response.json();
  //   } catch (error) {
  //     console.error("Error updating item:", error);
  //     return { success: false, error };
  //   }
  // };
  

  export const deleteCategory = async () => {
    try {
      const response = await api.delete(`/api/categories/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error update category:", error);
      throw error;
    }
  };
  export const deleteItems = async () => {
    try {
      const response = await api.delete(`/api/items/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error update items:", error);
      throw error;
    }
  };