import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Radio,
  Form,
  Input,
  message,
  Steps,
  Divider,
  Modal,
  Spin,
} from "antd";
import {
  CreditCardOutlined,
  BankOutlined,
  WalletOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { clearCarts, selectCartItems } from "../../../app/cartSlice";

const { Title, Text } = Typography;
const { Step } = Steps;

export default function Checkout() {
  const cart = useSelector(selectCartItems);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const deliveryFee = cart.reduce(
    (acc, item) => acc + parseInt(item.deliveryPrice || 0),
    0
  );
  const total = subtotal + deliveryFee;

  const handlePayNow = async () => {
    try {
      const response = await axios.post("/api/payments/initiate", {
        email: "customer@example.com",
        amount: 5000, // amount in Naira
      });

      // Redirect to Paystack's checkout page
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");

    if (reference) {
      axios
        .get(`/api/payments/verify/${reference}`)
        .then((res) => {
          setStatus(`Payment ${res.data.status}`);
        })
        .catch(() => {
          setStatus("Verification failed");
        });
    }
  }, []);
  const handleContinueShopping = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleViewOrder = () => {
    setShowModal(false);
    navigate("/orders", { state: { recentOrder: orderDetails.id } });
  };

  const steps = [
    {
      title: "Confirm",
      content: (
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <Title level={4}>Complete Your Order</Title>
          <p className="mb-4">
            Please review your order details before completing the purchase.
          </p>

          <div className="mb-4 text-left p-3 bg-gray-50 rounded">
            <p className="font-semibold">Order Total: ${total.toFixed(2)}</p>
            <p>
              Items: {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            </p>
            <p>
              Payment Method:{" "}
              {paymentMethod === "card"
                ? "Credit/Debit Card"
                : paymentMethod === "bank"
                ? "Bank Transfer"
                : "Digital Wallet"}
            </p>
            {paymentMethod === "card" && cardDetails.cardNumber && (
              <p>Card: **** **** **** {cardDetails.cardNumber.slice(-4)}</p>
            )}
            <p>
              Shipping Address: {user?.deliveryAddress || "Default Address"}
            </p>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            By completing this purchase, you agree to our terms and conditions.
          </p>
        </div>
      ),
    },
  ];

  const next = () => {
    if (
      currentStep === 1 &&
      paymentMethod === "card" &&
      !validateCardDetails()
    ) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-8">
        <Spin size="large" />
        <p className="mt-4">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Title level={2}>Checkout</Title>

      {/* Empty Cart Message */}
      {cart.length === 0 && !orderDetails ? (
        <div className="text-center text-gray-500 p-8">
          Your cart is empty. Add some items to proceed with checkout.
        </div>
      ) : (
        <div>
          <Steps current={currentStep} className="mb-8">
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <div className="mb-8">{steps[currentStep].content}</div>

          <div className="flex justify-between">
            {currentStep > 0 && <Button onClick={prev}>Previous</Button>}

            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next} className="ml-auto">
                Next
              </Button>
            )}

            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={processPayment}
                className="ml-auto bg-green-600 hover:bg-green-700"
                disabled={cart.length === 0}
              >
                Complete Payment
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      <Modal open={showModal} closable={false} footer={null} centered>
        <div className="text-center p-4">
          <div className="text-green-500 text-5xl mb-4">
            <CheckCircleOutlined />
          </div>
          <Title level={3}>Payment Successful!</Title>
          <p className="mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <div className="bg-gray-50 p-3 mb-6 text-left rounded">
            <p>
              <strong>Order ID:</strong> {orderDetails?.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(orderDetails?.date).toLocaleString()}
            </p>
            <p>
              <strong>Total Amount:</strong> NGN{orderDetails?.total.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> Processing
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={handleContinueShopping}>Continue Shopping</Button>
            <Button type="primary" onClick={handleViewOrder}>
              View Order
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
