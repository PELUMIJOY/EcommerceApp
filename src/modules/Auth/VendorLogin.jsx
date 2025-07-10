import React, { useState } from "react";
import { Button, Form, Input, Divider, notification, Spin } from "antd";
import {
  GoogleOutlined,
  MailOutlined,
  FacebookOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import joyceStoreLogo from "../../assets/logo/joycestore-logo.svg";
import { login } from "../../api";
import { authClient } from "../../utils/auth-client";

const VendorLogin = () => {
  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/vendor`,
    });
  };

  const handleFacebookLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "facebook",
      callbackURL: `${window.location.origin}/vendor`,
    });
  };

  // Handle email-based login
  const handleEmailLogin = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);

      if (response && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));

        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        navigate("/vendor");
        form.resetFields();
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowEmailForm = () => {
    setShowEmailForm(true);
    // Use setTimeout to ensure DOM is ready before focusing
    setTimeout(() => {
      const emailInput = document.querySelector('input[id="login_form_email"]');
      if (emailInput) {
        emailInput.focus();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex bg-white shadow-md rounded-lg overflow-hidden w-3/4 max-w-4xl">
        <div className="w-1/2 flex flex-col items-center justify-center p-10">
          {/* <img src={joyceStoreLogo} alt="Didara Nigeria Logo" className="h-12 mb-8" /> */}
          <h1 className="text-2xl font-bold text-orange-600 mb-4">
            Didara Nigeria VendorCenter
          </h1>

          {showEmailForm ? (
            <Spin spinning={loading}>
              <Form
                form={form}
                name="login_form"
                className="w-full"
                layout="vertical"
                onFinish={handleEmailLogin}
                autoComplete="off"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    size="large"
                    autoComplete="new-email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                    size="large"
                    autoComplete="new-password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 border-none"
                    size="large"
                  >
                    Log in
                  </Button>
                </Form.Item>
                <div className="flex  justify-center">
                  <Button
                    type="link"
                    onClick={() => setShowEmailForm(false)}
                    className="text-orange-600"
                  >
                    Back to login options
                  </Button>
                </div>
              </Form>

              {/* <div className="mt-4 text-center">
                <Button
                  type="link"
                  className="text-gray-500"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </Button>
              </div> */}
            </Spin>
          ) : (
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
                icon={<MailOutlined />}
                onClick={handleShowEmailForm}
                className="w-full text-left"
                size="large"
              >
                Sign in with Email
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
          )}

          <Divider className="my-6">New to Didara Nigeria?</Divider>
          <Button
            type="link"
            className="text-orange-600 hover:text-orange-700"
            onClick={() => navigate("/signup")}
          >
            Sell on Didara Nigeria
          </Button>
        </div>

        <div className="w-1/2 bg-orange-100 flex items-center justify-center">
          <img
            src="https://vendorcenter.jumia.com/assets/images/signup-background.svg"
            alt="Vendor Illustration"
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
