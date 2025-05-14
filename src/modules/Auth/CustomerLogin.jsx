import React, { useState } from "react";
import { Button, Input, Modal, Form, message } from "antd";
import {
  FacebookOutlined,
  AppleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BASE_URL, requestOtp, verifyOtp } from "../../api";

const CustomerLogin = () => {
  const [form] = Form.useForm();
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");

  // Handle Google OAuth login - fixed to use full URL path
  const handleGoogleLogin = () => {
    // const baseUrl = "http://localhost:8000";
    window.location.href = `${BASE_URL}/auth/google?role=user`;
  };

  // Handle Facebook OAuth login
  const handleFacebookLogin = () => {
    // const baseUrl = "http://localhost:8000";
    window.location.href = `${BASE_URL}/auth/facebook?role=user`;
  };

  const handleContinue = async () => {
    try {
      await form.validateFields();
      const identifierValue = form.getFieldValue("identifier");

      if (!identifierValue) {
        return message.error("Please enter an email or phone number.");
      }

      setIdentifier(identifierValue);

      const payload = identifierValue.includes("@")
        ? { email: identifierValue }
        : { phone: identifierValue };

      await requestOtp(payload);
      setIsOtpModalVisible(true);
      message.success("OTP has been sent to your email or phone number");
    } catch (error) {
      console.error("Error sending OTP:", error);
      message.error(error.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (values) => {
    try {
      await verifyOtp({
        identifier,
        otp: values.otp,
      });

      message.success("Login successful");
      setIsOtpModalVisible(false);
      navigate("/cart");
    } catch (error) {
      message.error(error.message || "OTP verification failed");
    }
  };

  // const handleSocialLogin = (provider) => {
  //   window.location.href = `/auth/${provider.toLowerCase()}`;
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500">
            <span className="text-white text-2xl font-bold">★</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to Joyce Store</h1>
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item
            label="Email"
            name="identifier"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Button
            type="primary"
            className="w-full bg-orange-500 border-none text-white mb-4"
            onClick={handleContinue}
          >
            Continue
          </Button>

          <p className="text-gray-500 text-sm mb-4">
            By continuing you agree to Joyce Store's{" "}
            <a href="#" className="text-orange-500">
              Terms and Conditions
            </a>
          </p>

          <div className="space-y-4 w-full">
            <Button
              type="primary"
              icon={<GoogleOutlined />}
              className="w-full text-left bg-red-500 hover:bg-red-600 border-none"
              size="large"
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>

            <Button
              type="default"
              icon={<FacebookOutlined />}
              className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white"
              size="large"
              onClick={handleFacebookLogin}
            >
              Sign in with Facebook
            </Button>
          </div>
        </Form>
        <p className="text-gray-500 text-sm mt-4">
          For further support, visit the{" "}
          <a href="#" className="text-orange-500">
            Help Center
          </a>
          or contact our customer service team.
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
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please enter OTP" }]}
          >
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
