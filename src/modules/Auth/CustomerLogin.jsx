import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmail,
  signInWithGoogle,
  signInWithFacebook,
} from "../../utils/auth-client";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../app/authSlice";

const CustomerLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEmailLogin = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();

      // await signInWithEmail(values.email, values.password);
      // sign in
      const { user, token } = await signInWithEmail(
        values.email,
        values.password
      );

      // update Redux
      dispatch(
        loginSuccess({
          user: {
            ...user,
            id: user._id,
          },
          token,
        })
      );

      message.success("Login successful");
      navigate("/cart");
    } catch (error) {
      console.error("Login error:", error);
      message.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // await signInWithGoogle("/cart");
      const { user, token } = await signInWithGoogle();

      dispatch(loginSuccess({ user, token }));
      message.success("Login successful");
      navigate("/cart");
    } catch (error) {
      message.error(error.message || "Google login failed");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { user, token } = await signInWithFacebook();
      dispatch(loginSuccess({ user, token }));
      message.success("Login successful");
      navigate("/cart");
    } catch (error) {
      message.error(error.message || "Facebook login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500">
            <span className="text-white text-2xl font-bold">★</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to Didara Nigeria</h1>

        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button
            type="primary"
            className="w-full bg-orange-500 border-none text-white mb-4"
            onClick={handleEmailLogin}
            loading={loading}
          >
            Login
          </Button>

          <p className="text-gray-500 text-sm mb-4">
            By continuing you agree to Didara Nigeria's{" "}
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
          Don't have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up here
          </span>
        </p>

        <p className="text-gray-500 text-sm mt-4">
          For further support, visit the
          <a href="#" className="text-orange-500">
            Help Center
          </a>
          or contact our customer service team.
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;
