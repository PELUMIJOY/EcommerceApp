// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { message, Input, Typography, Button } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import Items from "./items";
// import { formatCurrency } from "../../../utils/helper";
// import { removeFromCart, clearCart } from "../../../app/cartSlice";

// const { TextArea } = Input;
// const { Text } = Typography;

// export default function CartPage() {
//   const cart = useSelector((state) => state.cart.items);
//   const user = useSelector((state) => state.auth.user); 
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [cartSum, setCartSum] = useState(0);
//   const [deliverySum, setDeliverySum] = useState(0);
//   const [formData, setFormData] = useState({
//     phoneNumber: user?.phoneNumber || "",
//     deliveryAddress: user?.deliveryAddress || "",
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const calculateTotals = () => {
//       const sum = cart.reduce((acc, item) => acc + parseInt(item.productprice), 0);
//       const delivery = cart.reduce((acc, item) => acc + parseInt(item.deliveryPrice || 0), 0);
//       setCartSum(sum);
//       setDeliverySum(delivery);
//     };
//     calculateTotals();
//   }, [cart]);

//   const handleCheckout = async () => {
//     if (!formData.phoneNumber || !formData.deliveryAddress) {
//       message.error("Please fill in your phone number and delivery address.");
//       return;
//     }
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       dispatch(clearCarts());
//       message.success("Order placed successfully! Redirecting to OTP page...");
//       navigate("/otp");
//     }, 1000);
//   };

//   const removeItem = (index) => {
//     dispatch(removeFromCart(index));
//   };

//   return (
//     <div className="p-3 md:flex md:space-x-5">
//       <div className="bg-white shadow-lg p-3 rounded-lg text-black w-full md:w-2/3">
//         <Text className="text-xl uppercase">Cart ({cart.length})</Text>
//         <div className="border-b my-3"></div>
//         {cart.length === 0 ? (
//           <Text className="capitalize">Cart is Empty</Text>
//         ) : (
//           cart.map((item, index) => (
//             <Items key={item.id} item={item} index={index} removeItem={removeItem} />
//           ))
//         )}
//       </div>

//       <div className="bg-white shadow-lg p-3 rounded-lg w-full md:w-1/3 mt-3 md:mt-0">
//         <Text className="text-sm uppercase">Cart Summary</Text>
//         <div className="border-b my-3"></div>
//         <div>Sub Total: {formatCurrency(cartSum)}</div>
//         <div className="text-sm text-gray-400">
//           {deliverySum === 0 ? "Delivery Fee: FREE" : `Delivery Fee: ${formatCurrency(deliverySum)}`}
//         </div>

//         {/* Delivery Details */}
//         <Input
//           className="mt-3"
//           placeholder="Phone Number"
//           value={formData.phoneNumber}
//           onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//         />
//         <TextArea
//           className="mt-3"
//           rows={4}
//           placeholder="Delivery Address"
//           value={formData.deliveryAddress}
//           onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
//         />

//         {/* Checkout Button */}
//         <Button
//           className="mt-3 w-full bg-orange-500 text-white"
//           loading={loading}
//           onClick={() => (user ? handleCheckout() : navigate("/register"))}
//         >
//           Checkout ({formatCurrency(cartSum + deliverySum)})
//         </Button>

//         <p className="text-sm text-gray-500 mt-4">
//           Returns are easy. Free return within 7 days for ALL eligible items.
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Input, Typography, Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { formatCurrency } from "../../../utils/helper";
import { 
  removeFromCart, 
  removeItemFromCart, 
  clearCarts, 
  clearCartItems,
  checkoutCart,
  selectCartItems, 
  selectCartLoading, 
  selectOrderSuccess,
  selectRecentlyViewed,
  resetOrderState
} from "../../../app/cartSlice";
import Items from "./items";
import RecentlyViewed from "../productDetails/RecentlyViewed";

const { TextArea } = Input;
const { Text } = Typography;

export default function CartPage() {
  const cart = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const orderSuccess = useSelector(selectOrderSuccess);
  const recentlyViewed = useSelector(selectRecentlyViewed);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate totals directly
  const cartSum = cart.reduce((acc, item) => acc + (parseInt(item.price) * (item.quantity || 1)), 0);
  const deliverySum = cart.reduce((acc, item) => acc + parseInt(item.deliveryPrice || 0), 0);

  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumber || "",
    deliveryAddress: user?.deliveryAddress || "",
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        phoneNumber: user.phoneNumber || formData.phoneNumber,
        deliveryAddress: user.deliveryAddress || formData.deliveryAddress,
      });
    }
  }, [user]);

  // If the order was successful, redirect to OTP page
  if (orderSuccess) {
    // Reset the order state so we don't redirect again on page refresh
    dispatch(resetOrderState());
    navigate("/otp");
    return null;
  }

  const handleCheckout = async () => {
    if (!formData.phoneNumber || !formData.deliveryAddress) {
      message.error("Please fill in your phone number and delivery address.");
      return;
    }
    
    if (!user) {
      message.info("Please log in to complete checkout.");
      navigate("/checkout", { state: { from: "/cart" } });
      return;
    }
    
    setCheckoutLoading(true);
    
    try {
      // Dispatch the checkout action
      await dispatch(checkoutCart({
        userId: user._id,
        shippingDetails: {
          phoneNumber: formData.phoneNumber,
          address: formData.deliveryAddress
        }
      })).unwrap();
      
      // Success message
      message.success("Order placed successfully!");
      
      // Note: The redirect will happen automatically due to the orderSuccess check above
    } catch (error) {
      message.error("Failed to place order: " + (error.message || "Unknown error"));
      setCheckoutLoading(false);
    }
  };

  const removeItem = (item) => {
    dispatch(removeFromCart({ id: item.id }));
    
    if (user) {
      dispatch(removeItemFromCart({
        userId: user._id,
        productId: item.productId || item.id
      }));
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

  return (
    <div className="p-3 md:flex md:flex-col">
      <div className="md:flex md:space-x-5">
        <div className="bg-white shadow-lg p-3 rounded-lg text-black w-full md:w-2/3">
          <Text className="text-xl uppercase">Cart ({cart.length})</Text>
          <div className="border-b my-3"></div>
          {cart.length === 0 ? (
            <Text className="capitalize">Cart is Empty</Text>
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
          <div>Sub Total: {formatCurrency(cartSum)}</div>
          <div className="text-sm text-gray-400">
            {deliverySum === 0 ? "Delivery Fee: FREE" : `Delivery Fee: ${formatCurrency(deliverySum)}`}
          </div>

          {/* Delivery Details */}
          <Input
            className="mt-3"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          <TextArea
            className="mt-3"
            rows={4}
            placeholder="Delivery Address"
            value={formData.deliveryAddress}
            onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
          />

          {/* Checkout Button */}
          <Button
            className="mt-3 w-full bg-orange-500 text-white"
            loading={checkoutLoading}
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout ({formatCurrency(cartSum + deliverySum)})
          </Button>

          {cart.length > 0 && (
            <Button
              className="mt-3 w-full"
              danger
              onClick={() => {
                if (user) {
                  dispatch(clearCartItems(user._id));
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