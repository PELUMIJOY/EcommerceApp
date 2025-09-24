import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Input, Typography, Button, Spin, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { formatCurrency } from "../../../utils/helper";
import {
  removeFromCart,
  removeItemFromCart,
  clearCarts,
  clearCartItems,
  selectCartItems,
  selectCartLoading,
  selectOrderSuccess,
  selectRecentlyViewed,
} from "../../../app/cartSlice";
import Items from "./items";
import RecentlyViewed from "../productDetails/RecentlyViewed";
import { initiate } from "../../../api";
import { getCurrentUser } from "../../../utils/auth-client";

const { TextArea } = Input;
const { Text } = Typography;
const { confirm } = Modal;

export default function CartPage() {
  const cart = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const orderSuccess = useSelector(selectOrderSuccess);
  const recentlyViewed = useSelector(selectRecentlyViewed);
  const reduxUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  // Get current user from Better-Auth
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user || reduxUser);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(reduxUser);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [reduxUser]);

  // Calculate totals directly
  const cartSum = cart.reduce(
    (acc, item) => acc + parseInt(item.price) * (item.quantity || 1),
    0
  );
  const deliverySum = cart.reduce(
    (acc, item) => acc + parseInt(item.deliveryPrice || 0),
    0
  );

  const handleCheckout = async () => {
    // Check if user is authenticated
    if (!currentUser) {
      confirm({
        title: "Login Required",
        icon: <ExclamationCircleOutlined />,
        content:
          "You need to login to proceed with checkout. Would you like to login now?",
        okText: "Login",
        cancelText: "Cancel",
        onOk() {
          navigate("/login");
        },
      });
      return;
    }

    if (cart.length === 0) {
      message.warning("Your cart is empty");
      return;
    }

    setCheckoutLoading(true);

    try {
      const response = await initiate(
        currentUser,
        cart, // cart items from redux
        cartSum + deliverySum // total amount
        // currentUser.phone || "", // phone number
        // currentUser.deliveryAddress || "" // address
      );

      console.log("Payment initiation response:", response);

      // Redirect to Paystack payment page
      if (response.authorization_url) {
        window.location.href = response.authorization_url;
      } else {
        throw new Error("No authorization URL received from payment provider");
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const removeItem = (item) => {
    dispatch(removeFromCart({ id: item.id }));

    if (currentUser) {
      dispatch(
        removeItemFromCart({
          userId: currentUser._id || currentUser.id,
          productId: item.productId || item.id,
        })
      );
    }

    message.warning("Product removed from cart");
  };

  if (loading && cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
        <span className="ml-2">Loading user data...</span>
      </div>
    );
  }

  return (
    <div className="p-3 md:flex md:flex-col">
      <div className="md:flex md:space-x-5">
        <div className="bg-white shadow-lg p-3 rounded-lg text-black w-full md:w-2/3">
          <Text className="text-xl uppercase">Cart ({cart.length})</Text>
          <div className="border-b my-3"></div>
          {cart.length === 0 ? (
            <div className="text-center p-8">
              <div className="text-gray-400 text-6xl">🛒</div>
              <div className="flex justify-center gap-6 mt-4">
                <span className="text-gray-500 text-lg">
                  Your cart is empty
                </span>
                <Button
                  type="primary"
                  size="large"
                  className="gap-4"
                  onClick={() => navigate("/")}
                >
                  Start Shopping
                </Button>
              </div>
            </div>
          ) : (
            cart.map((item, index) => (
              <Items
                key={item.id || index}
                item={item}
                index={index}
                removeItem={removeItem}
              />
            ))
          )}
        </div>

        <div className="bg-white shadow-lg p-3 rounded-lg w-full md:w-1/3 mt-3 md:mt-0">
          <Text className="text-sm uppercase">Cart Summary</Text>
          <div className="border-b my-3"></div>

          {/* User info section */}
          {currentUser && (
            <div className="mb-3 p-2 bg-gray-50 rounded">
              <Text className="text-xs text-gray-500">Logged in as:</Text>
              <div className="text-sm font-medium">{currentUser.email}</div>
              <div className="text-xs text-gray-500">{currentUser.name}</div>
            </div>
          )}

          <div>Sub Total: {formatCurrency(cartSum)}</div>
          <div className="text-sm text-gray-400">
            {deliverySum === 0
              ? "Delivery Fee: FREE"
              : `Delivery Fee: ${formatCurrency(deliverySum)}`}
          </div>

          {/* Checkout Button */}
          <Button
            className="mt-3 w-full bg-orange-500 text-white"
            loading={checkoutLoading}
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            {currentUser
              ? `Checkout (${formatCurrency(cartSum + deliverySum)})`
              : "Login to Checkout"}
          </Button>

          {cart.length > 0 && (
            <Button
              className="mt-3 w-full"
              danger
              onClick={() => {
                if (currentUser) {
                  dispatch(clearCartItems(currentUser._id || currentUser.id));
                } else {
                  dispatch(clearCarts());
                }
                message.info("Cart cleared");
              }}
            >
              Clear Cart
            </Button>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Returns are easy. Free return within 7 days for ALL eligible items.
          </p>
        </div>
      </div>

      {/* Recently Viewed Section - moved outside the flex container */}
      {recentlyViewed && recentlyViewed.length > 0 && (
        <div className="mt-6 w-full">
          <RecentlyViewed items={recentlyViewed.slice(0, 4)} />
        </div>
      )}
    </div>
  );
}
