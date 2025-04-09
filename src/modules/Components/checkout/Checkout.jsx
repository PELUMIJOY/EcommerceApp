// import React from "react";
// import { useSelector } from "react-redux"; 
// import { Typography } from "antd";

// const { Title } = Typography;

// export default function Checkout() {
//   const cart = useSelector((state) => state.cart.items); 

//   return (
//     <div className="p-4">
//       <Title level={2}>Checkout</Title>

//       {/* Empty Cart Message */}
//       {cart.length === 0 ? (
//         <div className="text-center text-gray-500">
//           Your cart is empty. Add some items to proceed with checkout.
//         </div>
//       ) : (
//         <div>
//           {/* List Cart Items */}
//           {cart.map((item, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center p-3 border-b border-gray-300"
//             >
//               <div>
//                 <Title level={5}>{item.title}</Title>
//                 <p className="text-sm text-gray-500">
//                   Price: {item.price} | Quantity: {item.quantity}
//                 </p>
//               </div>
//               <Title level={5}>{item.price * item.quantity}</Title>
//             </div>
//           ))}

//           {/* Checkout Summary */}
//           <div className="mt-4">
//             <Title level={4}>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</Title>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Radio, Form, Input, message, Steps, Divider, Modal, Spin } from "antd";
import { 
  CreditCardOutlined, 
  BankOutlined, 
  WalletOutlined, 
  LockOutlined,
  CheckCircleOutlined
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
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = cart.reduce((acc, item) => acc + parseInt(item.deliveryPrice || 0), 0);
  const total = subtotal + deliveryFee;
  
  useEffect(() => {
    // Redirect if cart is empty
    if (cart.length === 0 && !orderDetails) {
      message.info("Your cart is empty. Please add items before checkout.");
      navigate("/");
    }
  }, [cart, navigate, orderDetails]);

  const handlePaymentMethodChange = e => {
    setPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (field, value) => {
    setCardDetails({
      ...cardDetails,
      [field]: value
    });
  };

  const validateCardDetails = () => {
    const { cardNumber, cardName, expiryDate, cvv } = cardDetails;
    
    // Basic validation checks
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
      message.error("Please enter a valid card number (16 digits)");
      return false;
    }
    if (!cardName.trim()) {
      message.error("Please enter the name on card");
      return false;
    }
    if (!expiryDate.trim() || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
      message.error("Please enter a valid expiry date (MM/YY)");
      return false;
    }
    if (!cvv.trim() || cvv.length < 3) {
      message.error("Please enter a valid CVV (3-4 digits)");
      return false;
    }
    return true;
  };

  const processPayment = async () => {
    // For payment methods that need validation
    if (paymentMethod === "card" && !validateCardDetails()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate order ID and date
      const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
      const orderDate = new Date().toISOString();
      
      // Create order object
      const order = {
        id: orderId,
        date: orderDate,
        items: cart.map(item => ({
          id: item.id,
          title: item.title || item.name,
          price: item.price,
          quantity: item.quantity || 1,
          imageUrl: item.imageUrl || item.url
        })),
        total: total,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        status: "processing",
        paymentMethod: paymentMethod,
        paymentDetails: paymentMethod === "card" ? {
          cardType: getCardType(cardDetails.cardNumber),
          last4: cardDetails.cardNumber.slice(-4)
        } : { method: paymentMethod },
        shippingAddress: user?.deliveryAddress || "Default Address",
        contactNumber: user?.phoneNumber || "Default Phone"
      };
      
      // Save order to local storage (simulating database)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
      
      // Store current order details for confirmation
      setOrderDetails(order);
      
      // Clear cart after successful order
      dispatch(clearCarts());
      
      // Show success modal
      setShowModal(true);
    } catch (error) {
      message.error("Payment failed. Please try again.");
      console.error("Payment processing error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to identify card type based on number
  const getCardType = (number) => {
    const firstDigit = number.charAt(0);
    const firstTwoDigits = number.substring(0, 2);
    
    if (number.startsWith('4')) return 'Visa';
    if (['51','52','53','54','55'].includes(firstTwoDigits)) return 'MasterCard';
    if (['34', '37'].includes(firstTwoDigits)) return 'American Express';
    if (number.startsWith('6')) return 'Discover';
    return 'Credit Card';
  };

  const handleContinueShopping = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleViewOrder = () => {
    setShowModal(false);
    navigate("/orders", { state: { recentOrder: orderDetails.id } });
  };

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const v = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formattedValue = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formattedValue.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digits
    const v = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <Form layout="vertical">
              <Form.Item label="Card Number" required>
                <Input 
                  placeholder="1234 5678 9012 3456" 
                  maxLength={19}
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardDetailsChange("cardNumber", formatCardNumber(e.target.value))}
                />
              </Form.Item>
              <Form.Item label="Name on Card" required>
                <Input 
                  placeholder="John Doe" 
                  value={cardDetails.cardName}
                  onChange={(e) => handleCardDetailsChange("cardName", e.target.value)}
                />
              </Form.Item>
              <div className="flex space-x-4">
                <Form.Item label="Expiry Date (MM/YY)" required className="flex-1">
                  <Input 
                    placeholder="MM/YY" 
                    maxLength={5}
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleCardDetailsChange("expiryDate", formatExpiryDate(e.target.value))}
                  />
                </Form.Item>
                <Form.Item label="CVV" required className="flex-1">
                  <Input.Password 
                    placeholder="123" 
                    maxLength={4}
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardDetailsChange("cvv", e.target.value.replace(/\D/g, ''))}
                  />
                </Form.Item>
              </div>
            </Form>
            <div className="mt-2 flex items-center text-gray-500">
              <LockOutlined className="mr-2" />
              <Text type="secondary">Your payment information is secure</Text>
            </div>
          </div>
        );
      case "bank":
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="mb-4">Mock bank transfer - no real account needed.</p>
            <Form layout="vertical">
              <Form.Item label="Bank" required>
                <Radio.Group defaultValue="nationalBank">
                  <Radio value="nationalBank">National Bank</Radio>
                  <Radio value="cityBank">City Bank</Radio>
                  <Radio value="metroBank">Metro Bank</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Account Name" required>
                <Input placeholder="John Doe" />
              </Form.Item>
            </Form>
            <Text type="secondary" className="block mt-4">
              For demo purposes, no real bank details are needed
            </Text>
          </div>
        );
      case "wallet":
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="mb-4">Select your preferred digital wallet:</p>
            <div className="flex justify-center space-x-4 mb-4">
              <Button className="flex-1 h-12">Google Pay</Button>
              <Button className="flex-1 h-12">Apple Pay</Button>
              <Button className="flex-1 h-12">PayPal</Button>
            </div>
            <Text type="secondary" className="block mt-4">
              For demo purposes, clicking any wallet option will simulate a successful payment
            </Text>
          </div>
        );
      default:
        return null;
    }
  };

  const steps = [
    {
      title: 'Review',
      content: (
        <div className="bg-white p-4 rounded-lg shadow">
          <Title level={4}>Order Summary</Title>
          {cart.length > 0 ? (
            <div className="max-h-64 overflow-y-auto mb-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border-b border-gray-300"
                >
                  <div className="flex items-center">
                    <img 
                      src={item.imageUrl || item.url} 
                      alt={item.title || item.name}
                      className="w-16 h-16 object-cover mr-3"
                    />
                    <div>
                      <Text strong>{item.title || item.name}</Text>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price} | Quantity: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <Text strong>${(item.price * (item.quantity || 1)).toFixed(2)}</Text>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 p-4">
              Your cart is empty
            </div>
          )}

          <div className="border-t pt-3">
            <div className="flex justify-between mb-1">
              <Text>Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </div>
            <div className="flex justify-between mb-1">
              <Text>Delivery Fee</Text>
              <Text>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</Text>
            </div>
            <div className="flex justify-between text-lg font-semibold mt-2">
              <Text strong>Total</Text>
              <Text strong>${total.toFixed(2)}</Text>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Payment',
      content: (
        <div>
          <Radio.Group 
            onChange={handlePaymentMethodChange} 
            value={paymentMethod} 
            className="w-full mb-4"
          >
            <div className="flex flex-col space-y-3">
              <Radio.Button value="card" className="p-3 flex items-center">
                <CreditCardOutlined className="mr-2" /> Credit/Debit Card
              </Radio.Button>
              <Radio.Button value="bank" className="p-3 flex items-center">
                <BankOutlined className="mr-2" /> Bank Transfer
              </Radio.Button>
              <Radio.Button value="wallet" className="p-3 flex items-center">
                <WalletOutlined className="mr-2" /> Digital Wallet
              </Radio.Button>
            </div>
          </Radio.Group>
          
          {renderPaymentMethod()}
          
          <div className="bg-yellow-50 p-3 mt-4 rounded border border-yellow-200">
            <Text type="warning">
              <strong>Demo Mode:</strong> No real payment will be processed. All payment methods will simulate a successful transaction.
            </Text>
          </div>
        </div>
      )
    },
    {
      title: 'Confirm',
      content: (
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <Title level={4}>Complete Your Order</Title>
          <p className="mb-4">Please review your order details before completing the purchase.</p>
          
          <div className="mb-4 text-left p-3 bg-gray-50 rounded">
            <p className="font-semibold">Order Total: ${total.toFixed(2)}</p>
            <p>Items: {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</p>
            <p>Payment Method: {paymentMethod === "card" ? "Credit/Debit Card" : 
                              paymentMethod === "bank" ? "Bank Transfer" : "Digital Wallet"}</p>
            {paymentMethod === "card" && cardDetails.cardNumber && (
              <p>Card: **** **** **** {cardDetails.cardNumber.slice(-4)}</p>
            )}
            <p>Shipping Address: {user?.deliveryAddress || "Default Address"}</p>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            By completing this purchase, you agree to our terms and conditions.
          </p>
        </div>
      )
    }
  ];

  const next = () => {
    if (currentStep === 1 && paymentMethod === "card" && !validateCardDetails()) {
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
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <div className="mb-8">
            {steps[currentStep].content}
          </div>

          <div className="flex justify-between">
            {currentStep > 0 && (
              <Button onClick={prev}>
                Previous
              </Button>
            )}
            
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
      <Modal
        open={showModal}
        closable={false}
        footer={null}
        centered
      >
        <div className="text-center p-4">
          <div className="text-green-500 text-5xl mb-4">
            <CheckCircleOutlined />
          </div>
          <Title level={3}>Payment Successful!</Title>
          <p className="mb-6">Thank you for your purchase. Your order has been confirmed.</p>
          <div className="bg-gray-50 p-3 mb-6 text-left rounded">
            <p><strong>Order ID:</strong> {orderDetails?.id}</p>
            <p><strong>Date:</strong> {new Date(orderDetails?.date).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> NGN{orderDetails?.total.toFixed(2)}</p>
            <p><strong>Status:</strong> Processing</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
            <Button type="primary" onClick={handleViewOrder}>
              View Order
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}