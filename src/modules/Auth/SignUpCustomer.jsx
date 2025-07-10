import React, { useState } from "react";
import { Form, Input, Button, Radio, Select, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { requestOtp, signup, verifyOtp } from "../../api";

const { Option } = Select;

const SignUpCustomer = () => {
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const [identifier, setIdentifier] = useState("");

  const handleNext = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
  
      switch (step) {
        case 1:
          if (!values.email && !values.phone) {
            return message.error("Please enter an email or phone number.");
          }
  
          setIdentifier(values.email || values.phone);
  
          await requestOtp({
            email: values.email || undefined,
            phoneNumber: values.phone || undefined,
          });
  
          message.success("Verification code sent!");
          setStep(2);
          break;
  
        case 2:
          await verifyOtp({
            identifier,
            otp: values.verificationCode,
          });
  
          message.success("Verified successfully!");
          setStep(3);
          break;
  
        case 3:
          await signup({
            email: identifier,
            phone: values.phone || "",
            password: values.password,
            name: values.name,
            lastName: values.lastName,
            provider: "email", 
            role:"user"
          });
  
          message.success("Sign-up complete!");
          setIdentifier("");
          navigate("/login");
          break;
      }
    } catch (error) {
      message.error(error.message || "An error occurred");
    }
  };
  

  const stepDetails = [
    {
      heading: "Create your account",
      description: "Let's get started by creating your account. To keep your account safe, we need a strong password",
    },
    {
      heading: "Verify your email address",
      description: `We have sent a verification code to ${identifier}`,
    },
    {
      heading: "Personal details",
      description: "We just need you to fill in some details.",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img
        src="https://vendorcenter.jumia.com/assets/images/signup-background.svg"
        alt="signin image"
        className="w-1/3"
      />
      <div className="w-full max-w-lg ml-10">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">{stepDetails[step - 1].heading}</h2>
          <p className="text-gray-600">{stepDetails[step - 1].description}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mr-10">
          <Form form={form} layout="vertical" className="space-y-4">
            {step === 1 && (
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
            )}

            {step === 2 && (
              <Form.Item
                label="Verification Code"
                name="verificationCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter the verification code!",
                  },
                ]}
              >
                <Input placeholder="Enter verification code" />
              </Form.Item>
            )}

            {step === 3 && (
              <>
                <Form.Item
                  label="First Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your First name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your last name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
                {/* <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item> */}
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
                  ]}
                >
                  <Input 
                    placeholder="Enter your phone number" 
                    autoComplete="off"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
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
                    I hereby confirm that I have read and I agree to the Didara Nigeria
                    seller contract, Didara Nigeria codes, policies and guidelines and
                    Privacy Notice and Cookie Notice referenced therein.
                  </Checkbox>
                </Form.Item>
              </>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                onClick={handleNext}
                className="bg-[#FFA500] w-full"
              >
                {step < 3 ? "Next" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <p className="p-2">
          Already have an account?{" "}
          <span className="text-[#FFA500]" onClick={() => navigate("/login")}>
            Login
          </span>{" "}
        </p>
      </div>
    </div>
  );
};
export default SignUpCustomer;
