import { notification } from "antd";
import axios from "axios";


export const BASE_URL = "http://localhost:8000";

export const api= axios.create({
    baseURL:  BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
//   export const fetchCategories = async () => {
//     try {
//       const response = await api.get(`/api/categories`);
//       return response.data; 
//       notification.success(response.data.message)
//     } catch (error) {
//       notification.error(response.data.error)
//       console.error("Error fetching categories:", error);
//       throw error;
//     }
//   };


//   export const fetchItems = async () => {
//     try {
//       const response = await api.get(`/api/items`);
//       return response.data; 
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       throw error;
//     }
//   };
//   export const createCategory = async (data) => {
//     try {
//       const response = await api.post(`/api/categories`, data); 
//       return response.data;
//     } catch (error) {
//       console.error("Error creating category:", error.response?.data || error);
//       throw error;
//     }
//   };

//   export const createItems = async (data) => {
//     try {
//       const response = await api.post(`/api/items`, data);
//       return response.data; 
//     c
//     } catch (error) {
//       console.error("Error create items:", error);
//       throw error;
//     }
//   };
//   export const updateCategory = async () => {
//     try {
//       const response = await api.put(`/api/categories/${id}`);
//       return response.data; 
//     } catch (error) {
//       console.error("Error update category:", error);
//       throw error;
//     }
//   };
//   export const updateItems = async (id, updatedItem) => {
//     try {
//       const response = await api.put(`/api/items/${id}`, updatedItem);
//       return response.data; 
//     } catch (error) {
//       console.error("Error update items:", error);
//       throw error;
//     }
//   };
//   // export const updateItems = async (id, updatedItem) => {
//   //   try {
//   //     const response = await api.put(`/api/items/${id}`, {  // Ensure ID is in URL
//   //       method: "PUT",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(updatedItem),
//   //     });
  
//   //     if (!response.ok) {
//   //       throw new Error("Failed to update item");
//   //     }
  
//   //     return await response.json();
//   //   } catch (error) {
//   //     console.error("Error updating item:", error);
//   //     return { success: false, error };
//   //   }
//   // };
  

//   export const deleteCategory = async () => {
//     try {
//       const response = await api.delete(`/api/categories/${id}`);
//       return response.data; 
//     } catch (error) {
//       console.error("Error update category:", error);
//       throw error;
//     }
//   };
//   export const deleteItems = async () => {
//     try {
//       const response = await api.delete(`/api/items/${id}`);
//       return response.data; 
//     } catch (error) {
//       console.error("Error update items:", error);
//       throw error;
//     }
//   };

//   export const signup = async (userData) => {
//     try {
//       const response = await api.post(`/api/auth/signup`, userData, { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   };
  
//   export const login = async (userData) => {
//     try {
//       const response = await api.post(`/api/auth/login`, userData, { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   };
  
//   export const logout = async () => {
//     try {
//       const response = await api.post(`/api/auth/logout`, {}, { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   };
  
//   export const requestOtp = async (identifier) => {
//     try {
//       const response = await api.post(`/api/auth/otp/request`, identifier);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   };
  
//   export const verifyOtp = async (otpData) => {
//     try {
//       const response = await api.post(`/api/otp/verify`, otpData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   };
  

// Create axios instance with default configuration
// export const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // Enable credentials for all requests
// });

// Generic error handler
const handleApiError = (error, customMessage) => {
  const errorMessage = error.response?.data?.message 
    || error.response?.data?.error 
    || error.message 
    || "An unexpected error occurred";

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
    throw new Error("Error fetching countries: " + (error.response?.data?.message || error.message));
  }
};

export const fetchAllZones = async () => {
  try {
    const response = await api.get("/api/locations/zones");
    return response;
  } catch (error) {
    throw new Error("Error fetching zones: " + (error.response?.data?.message || error.message));
  }
};

export const fetchZonesByCountry = async (countryCode) => {
  try {
    const response = await api.get(`/api/locations/zones/${countryCode}`);
    return response;
  } catch (error) {
    throw new Error("Error fetching zones: " + (error.response?.data?.message || error.message));
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

export const addCart = async (userData) => {
  try {
    const response = await api.post("/api/cart", userData);
    notification.success({
      message: "Success",
      description: "Account created successfully",
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Signup failed");
  }
};