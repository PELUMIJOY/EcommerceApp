import { notification } from "antd";
import axios from "axios";

export const BASE_URL = "https://jumia-api-1.onrender.com";
const isLocal = window?.location?.hostname === "localhost";

// export const BASE_URL = isLocal
//   ? "http://localhost:8000"
//   : "https://jumia-api-1.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiError = (error, customMessage) => {
  const errorMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "An unexpected error occurred";

  notification.error({
    message: customMessage || "Error",
    description: errorMessage,
  });

  console.error(customMessage || "API Error:", error);
  throw error;
};

// Categories API
export const fetchCategories = async () => {
  try {
    const response = await api.get("/api/categories");
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching categories");
  }
};

export const createCategory = async (data) => {
  try {
    const response = await api.post("/api/categories", data);
    notification.success({
      message: "Success",
      description: "Category created successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error creating category");
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await api.put(`/api/categories/${id}`, data);
    notification.success({
      message: "Success",
      description: "Category updated successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error updating category");
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/api/categories/${id}`);
    notification.success({
      message: "Success",
      description: "Category deleted successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error deleting category");
  }
};

// Items API
export const fetchItems = async () => {
  try {
    const response = await api.get("/api/items");
    return response.data;
  } catch (error) {
    handleApiError(error, "Error fetching items");
  }
};

export const fetchCountries = async () => {
  try {
    const response = await api.get("/api/locations/countries");
    return response;
  } catch (error) {
    throw new Error(
      "Error fetching countries: " +
        (error.response?.data?.message || error.message)
    );
  }
};

export const fetchAllZones = async () => {
  try {
    const response = await api.get("/api/locations/zones");
    return response;
  } catch (error) {
    throw new Error(
      "Error fetching zones: " +
        (error.response?.data?.message || error.message)
    );
  }
};

export const fetchZonesByCountry = async (countryCode) => {
  try {
    const response = await api.get(`/api/locations/zones/${countryCode}`);
    return response;
  } catch (error) {
    throw new Error(
      "Error fetching zones: " +
        (error.response?.data?.message || error.message)
    );
  }
};

export const createItems = async (data) => {
  try {
    const response = await api.post("/api/items", data);
    notification.success({
      message: "Success",
      description: "Item created successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error creating items");
  }
};

export const updateItems = async (id, updatedItem) => {
  try {
    const response = await api.put(`/api/items/${id}`, updatedItem);
    notification.success({
      message: "Success",
      description: "Item updated successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error updating items");
  }
};

export const deleteItems = async (id) => {
  try {
    const response = await api.delete(`/api/items/${id}`);
    notification.success({
      message: "Success",
      description: "Item deleted successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Error deleting items");
  }
};

// Authentication APIs
export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    notification.success({
      message: "Success",
      description: "Account created successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Signup failed");
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    notification.success({
      message: "Success",
      description: "Login successful",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Login failed");
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    notification.success({
      message: "Success",
      description: "Logged out successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Logout failed");
  }
};

// OTP APIs
export const requestOtp = async (identifier) => {
  try {
    const response = await api.post("/otp/request", identifier);
    notification.success({
      message: "Success",
      description: "OTP sent successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to send OTP");
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post("/otp/verify", otpData);
    notification.success({
      message: "Success",
      description: "OTP verified successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "OTP verification failed");
  }
};

export const addCart = async (userId, productId, quantity) => {
  try {
    const response = await api.post("api/cart/add", {
      userId,
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Get cart contents
export const getCart = async (userId) => {
  try {
    const response = await api.get(`api/cart/${userId}`);
    return response.data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Remove item from cart
export const removeItem = async (userId, productId) => {
  try {
    const response = await api.delete(`api/cart/${userId}/item/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// Update item quantity
export const updateCartQuantity = async (userId, productId, quantity) => {
  try {
    const response = await api.put(`api/cart/${userId}/item/${productId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating item quantity:", error);
    throw error;
  }
};

// Clear cart
export const clearCart = async (userId) => {
  try {
    const response = await api.delete(`api/cart/${userId}/clear`);
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Checkout
export const checkout = async (userId, shippingDetails) => {
  try {
    const response = await api.post(`api/cart/${userId}/checkout`, {
      shippingDetails,
    });
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};
