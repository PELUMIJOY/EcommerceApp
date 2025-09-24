import { notification } from "antd";
import axios from "axios";
import { authClient } from "./utils/auth-client";

const isLocal = window?.location?.hostname === "localhost";

export const BASE_URL = isLocal
  ? "http://localhost:8000"
  : "https://jumia-api-1.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for Better-Auth cookies
});

// Add request interceptor to include authentication token
api.interceptors.request.use(
  async (config) => {
    try {
      // Get current session from Better-Auth
      const session = await authClient.getSession();

      if (session?.data?.token) {
        // If there's a token, add it to Authorization header
        config.headers.Authorization = `Bearer ${session.data.token}`;
      }
      // Note: withCredentials: true will automatically send cookies,
      // so Better-Auth session cookies should be included

      return config;
    } catch (error) {
      console.error("Error getting session for request:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      notification.error({
        message: "Authentication Required",
        description: "Please log in to continue.",
      });

      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

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

// Categories API (unchanged)
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

// Items API (unchanged)
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

// Updated Authentication APIs - Now using Better-Auth endpoints
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

// Cart APIs (unchanged)
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

// Fixed initiate function with proper error handling and authentication
// export const initiate = async (
//   user,
//   cartItems,
//   totalAmount,
//   phone,
//   address
// ) => {
//   try {
//     // Validate required parameters
//     if (!user || !cartItems || !Array.isArray(cartItems)) {
//       throw new Error("Invalid parameters: user and cartItems are required");
//     }

//     if (cartItems.length === 0) {
//       throw new Error("Cart is empty");
//     }

//     // Map cart items to the expected format
//     const mappedItems = cartItems.map((item) => {
//       // Handle different possible structures of cart items
//       const productId = item._id || item.id || item.productId;
//       const itemName = item.name || item.title;
//       const itemPrice =
//         typeof item.price === "string" ? parseInt(item.price) : item.price;
//       const itemImage = item.image || item.imageUrl || item.url;

//       return {
//         product: productId,
//         name: itemName,
//         price: itemPrice,
//         quantity: item.quantity || 1,
//         image: itemImage,
//       };
//     });

//     const requestData = {
//       userId: user?.id || user?._id,
//       items: mappedItems,
//       totalAmount,
//       shippingDetails: {
//         phoneNumber: phone,
//         address,
//       },
//       email: user.email,
//     };
//     const response = await api.post("/api/payments/initiate", requestData);
//     return response.data;
//   } catch (error) {
//     console.error("Error initializing payment:", error);
//   }
// };

export const initiate = async (
  user,
  cartItems,
  totalAmount,
  phone = "",
  address = ""
) => {
  try {
    // Validate required parameters
    if (!user || !cartItems || !Array.isArray(cartItems)) {
      throw new Error("Invalid parameters: user and cartItems are required");
    }

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    if (!user.email) {
      throw new Error("User email is required for payment");
    }

    // Map cart items to the expected format
    const mappedItems = cartItems.map((item) => {
      const productId = item._id || item.id || item.productId;
      const itemName = item.name || item.title;
      const itemPrice =
        typeof item.price === "string" ? parseInt(item.price, 10) : item.price;
      const itemImage = item.image || item.imageUrl || item.url;

      // Validate required fields
      if (!productId || !itemName || !itemPrice) {
        throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
      }

      return {
        product: productId,
        name: itemName,
        price: itemPrice,
        quantity: item.quantity || 1,
        image: itemImage,
      };
    });

    const requestData = {
      userId: user.id || user._id,
      items: mappedItems,
      totalAmount: Number(totalAmount),
      shippingDetails: {
        phoneNumber: phone || user.phone || "",
        address: address || user.deliveryAddress || user.address || "",
      },
      email: user.email,
    };

    console.log("Initiating payment with data:", requestData);

    const response = await api.post("/api/payments/initiate", requestData);
    return response.data;
  } catch (error) {
    console.error("Error initializing payment:", error);

    // Re-throw with a more user-friendly message
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw new Error(error.message || "Payment initialization failed");
  }
};
