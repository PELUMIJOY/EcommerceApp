import React, { useState } from "react";
import { Button, Input, Modal, Form, message } from "antd";
import { FacebookOutlined, AppleOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const [form] = Form.useForm();
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!emailOrPhone) {
      message.error("Please enter your email or phone number");
      return;
    }
    setIsOtpModalVisible(true);
    message.success("OTP has been sent to your email or phone number");
  };

  const handleVerifyOtp = (values) => {
    console.log("Entered OTP:", values.otp);
    message.success("OTP verified successfully");
    setIsOtpModalVisible(false);
    navigate("/cart");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500">
            <span className="text-white text-2xl font-bold">★</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to Jumia</h1>
        <p className="text-gray-600 mb-6">Type your email or phone number to log in or create a Jumia account.</p>
        <Input
          size="large"
          placeholder="Email or Mobile Number"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          className="mb-4 border-orange-500"
        />
        <Button
          type="primary"
          className="w-full bg-orange-500 border-none text-white mb-4"
          onClick={handleContinue}
        >
          Continue
        </Button>
        <p className="text-gray-500 text-sm mb-4">
          By continuing you agree to Jumia’s <a href="#" className="text-orange-500">Terms and Conditions</a>
        </p>
        <Button icon={<FacebookOutlined />} className="w-full mb-2 bg-blue-600 text-white border-none">
          Log in with Facebook
        </Button>
        <Button icon={<GoogleOutlined />} className="w-full mb-2 bg-red-500 text-white border-none">
            Log in with Google
          </Button>
        <Button icon={<AppleOutlined />} className="w-full bg-black text-white border-none">
          Log in with Apple
        </Button>
        <p className="text-gray-500 text-sm mt-4">
          For further support, visit the <a href="#" className="text-orange-500">Help Center</a> or contact our customer service team.
        </p>
      </div>

      {/* OTP Modal */}
      <Modal
        title="Enter OTP"
        open={isOtpModalVisible}
        onCancel={() => setIsOtpModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleVerifyOtp}>
          <Form.Item name="otp" rules={[{ required: true, message: "Please enter OTP" }]}> 
            <Input placeholder="Enter OTP" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Verify OTP
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerLogin;
