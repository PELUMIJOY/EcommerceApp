import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Redux for cart state management
import Items from "./items";
import { Modal, Input, Button, Spin, message, Typography } from "antd"; // Ant Design
import { formatCurrency } from "../../utils/helper";
// import { uploadOrder } from "@/lib/uploadOrder";
import {removeFromCart, clearCart} from "@/app/cartSlice"
import { useSession } from "next-auth/react";
import Message from "./message";

const { TextArea } = Input;
const { Text } = Typography;

export default function CartItems() {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart.items); // Get cart from Redux
  const dispatch = useDispatch();

  const [cartSum, setCartSum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deliverySum, setDeliverySum] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    deliveryAddress: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  useEffect(() => {
    const calculateTotals = () => {
      const sum = cart.reduce((acc, item) => acc + parseInt(item.productprice), 0);
      const delivery = cart.reduce((acc, item) => acc + parseInt(item.deliveryPrice || 0), 0);
      setCartSum(sum);
      setDeliverySum(delivery);
    };
    calculateTotals();
  }, [cart]);

  const submitForm = async (event) => {
    event.preventDefault();

    if (!formData.phoneNumber || !formData.deliveryAddress) {
      message.error("Please fill in your phone number and delivery address");
      return;
    }
    setLoading(true);

    // const result = await uploadOrder(
    //   formData.phoneNumber,
    //   formData.deliveryAddress,
    //   session.user.name,
    //   cartSum,
    //   deliverySum,
    //   cart
    // );

    setLoading(false);

    if (result) {
      dispatch(clearCart());
      handleOpen();
    } else {
      message.error("Error uploading order");
    }
  };

  const removeItem = (index) => {
    dispatch(removeFromCart(index));
  };

  return (
    <div className="p-3 md:flex md:space-x-5">
      {/* Cart Items Section */}
      <div className="bg-white shadow-lg p-3 rounded-lg text-black w-full md:w-2/3">
        <Text className="text-xl uppercase">Cart ({cart.length})</Text>
        <div className="border-b my-3"></div>
        {cart.length === 0 ? (
          <Text className="capitalize">Cart is Empty</Text>
        ) : (
          cart.map((item, index) => (
            <Items
              key={item.id}
              item={item}
              index={index}
              removeItem={removeItem}
            />
          ))
        )}
      </div>

      {/* Cart Summary Section */}
      <div className="bg-white shadow-lg p-3 rounded-lg w-full md:w-1/3 mt-3 md:mt-0">
        <Text className="text-sm uppercase">Cart Summary</Text>
        <div className="border-b my-3"></div>
        <div>Sub Total: {formatCurrency(cartSum)}</div>
        <div className="text-sm text-gray-400">
          {!deliverySum ? "Delivery Fee: FREE" : `Delivery Fee: ${formatCurrency(deliverySum)}`}
        </div>

        {/* Form Fields */}
        <Input
          className="mt-3"
          value={session?.user.name}
          placeholder="Name"
          disabled
        />
        <Input
          className="mt-3"
          placeholder="Phone Number"
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />
        <TextArea
          className="mt-3"
          rows={4}
          placeholder="Delivery Address, Please add landmark areas near your location."
          onChange={(e) =>
            setFormData({ ...formData, deliveryAddress: e.target.value })
          }
        />

        {/* Submit Button */}
        <Button
          type="primary"
          className="mt-3 w-full"
          loading={loading}
          onClick={submitForm}
          disabled={!session}
        >
          Checkout ({formatCurrency(cartSum + deliverySum)})
        </Button>

        {!session && (
          <Text className="text-sm text-gray-300 text-center mt-2">
            Please Login to be able to checkout
          </Text>
        )}
      </div>

      {/* Footer Section */}
      <div className="bg-white p-3 text-sm rounded-lg shadow-lg mt-3">
        Returns are easy. Free return within 15 days for Official Store items
        and 7 days for other eligible items.
      </div>

      {/* Modal */}
      <Modal
        title="Order Confirmation"
        visible={isModalOpen}
        onCancel={handleClose}
        footer={null}
      >
        <Message />
      </Modal>
    </div>
  );
}
