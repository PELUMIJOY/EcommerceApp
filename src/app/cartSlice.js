import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkout, getCart, removeItem, clearCart, updateCartQuantity, addCart } from "../api";

// Async thunks for API calls
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const cartData = await getCart(userId);
      return cartData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ userId, productId, quantity, product }, { rejectWithValue }) => {
    try {
      await addCart(userId, productId, quantity);
      return { product, quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add item to cart");
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await removeItem(userId, productId);
      return { productId };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item from cart");
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      await updateCartQuantity(userId, productId, quantity);
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update item quantity");
    }
  }
);

export const clearCartItems = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      await clearCart(userId);
      return {};
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkout",
  async ({ userId, shippingDetails }, { rejectWithValue }) => {
    try {
      const result = await checkout(userId, shippingDetails);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to process checkout");
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  orderSuccess: false,
  orderData: null,
  recentlyViewed: [] // Add recently viewed items array
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Local state updates for immediate UI feedback
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id
      );
      
      // Get maximum available quantity based on stock
      const maxQuantity = product.stock || Number.MAX_SAFE_INTEGER;
      
      if (existingItem) {
        // Ensure we don't exceed the stock quantity
        const newQuantity = Math.min(existingItem.quantity + 1, maxQuantity);
        existingItem.quantity = newQuantity;
      } else {
        state.items.push({ 
          ...product, 
          quantity: 1,
          // Ensure stock information is included
          stock: product.stock
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        // Ensure quantity doesn't exceed stock
        const maxQuantity = item.stock || Number.MAX_SAFE_INTEGER;
        item.quantity = Math.min(quantity, maxQuantity);
      }
    },
    clearCarts: (state) => {
      state.items = [];
    },
    resetOrderState: (state) => {
      state.orderSuccess = false;
      state.orderData = null;
    },
    // Add a product to recently viewed
    addToRecentlyViewed: (state, action) => {
      const product = action.payload;
      
      // Check if the product is already in the recently viewed list
      const existingIndex = state.recentlyViewed.findIndex(
        (item) => item.id === product.id
      );
      
      // If it exists, remove it so we can put it at the front
      if (existingIndex !== -1) {
        state.recentlyViewed.splice(existingIndex, 1);
      }
      
      // Add the product to the beginning of the array
      // Ensure we include stock information
      state.recentlyViewed.unshift({
        ...product,
        stock: product.stock || 0
      });
      
      // Limit the recently viewed list to 8 items
      if (state.recentlyViewed.length > 8) {
        state.recentlyViewed.pop();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items.map(item => ({
          id: item.productId._id,
          title: item.productId.title || item.productId.name,
          price: item.productId.price,
          imageUrl: item.productId.imageUrl || item.productId.url,
          deliveryPrice: item.productId.deliveryPrice || 0,
          quantity: item.quantity,
          productId: item.productId._id,
          stock: item.productId.stock || 0 // Include stock information
        }));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add to cart - API responses handled by thunk
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Update state based on API response
        const { product, quantity } = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          // Ensure we don't exceed stock
          const maxQuantity = product.stock || Number.MAX_SAFE_INTEGER;
          existingItem.quantity = Math.min(existingItem.quantity + quantity, maxQuantity);
        } else {
          state.items.push({
            ...product,
            quantity: quantity,
            imageUrl: product.imageUrl || product.url,
            stock: product.stock || 0 // Include stock information
          });
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // The rest of extraReducers remain similar with stock handling added
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        // Update the specific item quantity
        const { productId, quantity } = action.payload;
        const item = state.items.find(item => item.productId === productId);
        if (item) {
          const maxQuantity = item.stock || Number.MAX_SAFE_INTEGER;
          item.quantity = Math.min(quantity, maxQuantity);
        }
      })
      
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
        state.orderSuccess = true;
        state.orderData = action.payload.order;
      });
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCarts,
  resetOrderState,
  addToRecentlyViewed
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectOrderSuccess = (state) => state.cart.orderSuccess;
export const selectOrderData = (state) => state.cart.orderData;
export const selectRecentlyViewed = (state) => state.cart.recentlyViewed;

export default cartSlice.reducer;