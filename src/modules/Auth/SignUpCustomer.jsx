import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../../utils/auth-client";

const SignUpCustomer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();

      const userData = {
        email: values.email,
        password: values.password,
        name: values.name,
        lastName: values.lastName,
        phone: values.phone || "",
        role: "user",
      };

      await signUpWithEmail(userData);

      message.success("Account created successfully!");
      form.resetFields();
      navigate("/login");
    } catch (error) {
      message.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img
        src="https://vendorcenter.jumia.com/assets/images/signup-background.svg"
        alt="signin image"
        className="w-1/3"
      />
      <div className="w-full max-w-lg ml-10">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">Create your account</h2>
          <p className="text-gray-600">
            Let's get started by creating your account. To keep your account
            safe, we need a strong password
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mr-10">
          <Form form={form} layout="vertical" className="space-y-4">
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="First Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your First name!" },
              ]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
            >
              <Input placeholder="Enter your phone number" autoComplete="off" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "You must agree to the terms to proceed!"
                        ),
                },
              ]}
            >
              <Checkbox>
                I hereby confirm that I have read and I agree to the Didara
                Nigeria seller contract, Didara Nigeria codes, policies and
                guidelines and Privacy Notice and Cookie Notice referenced
                therein.
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                onClick={handleSubmit}
                loading={loading}
                className="bg-[#FFA500] w-full"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </div>

        <p className="p-2">
          Already have an account?{" "}
          <span
            className="text-[#FFA500] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpCustomer;
