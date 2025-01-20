import React, { useState } from "react";
import { Form, Input, Button, Radio, Select, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleNext = () => {
    form.validateFields().then(() => {
      if (step < 5) {
        setStep(step + 1);
      } else {
        message.success("Sign-up complete!");
        navigate("/VendorLogin");
      }
    });
  };

  const shoppingZones = [
    "Lagos",
    "Abuja",
    "Kano",
    "Port Harcourt",
    "Ibadan",
    "Enugu",
  ];
  const stepDetails = [
    {
      heading: "Sell on Jumia",
      description: "Choose the country of your shop",
    },
    {
      heading: "Setup your account",
      description:
        "Please provide your email address to create your seller account",
    },
    {
      heading: "Setup your account",
      description:
        "Please provide your email address to create your seller account",
    },
    {
      heading: "Personal Information",
      description: "Setup your password and provide your phone number",
    },
    {
      heading: "Shop Information",
      description: "Setup your shop by completing the following details",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img
        src="https://vendorcenter.jumia.com/assets/images/signup-background.svg"
        alt="signin image"
         className=" w-1/3"
      />
      <div className="w-full max-w-lg ml-10">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">{stepDetails[step - 1].heading}</h2>
          <p className="text-gray-600">{stepDetails[step - 1].description}</p>
        </div>

        <div className=" bg-white shadow-md rounded-lg p-6 mr-10 ">
          <Form form={form} layout="vertical" className="space-y-4">
            {step === 1 && (
              <Form.Item
                label="Select your country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country!" },
                ]}
              >
                <Select placeholder="Select your country">
                  <Option value="Nigeria">Nigeria</Option>
                  <Option value="Kenya">Kenya</Option>
                  <Option value="South Africa">South Africa</Option>
                </Select>
              </Form.Item>
            )}

            {step === 2 && (
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

            {step === 3 && (
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

            {step === 4 && (
              <>
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
                  <Input placeholder="Enter your phone number" />
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
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </>
            )}

            {step === 5 && (
              <>
                <Form.Item
                  label="Account Type"
                  name="accountType"
                  rules={[
                    {
                      required: true,
                      message: "Please select an account type!",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="Business">Business</Radio>
                    <Radio value="Individual">
                      Individual (Choose if you are a seller without any
                      registered or incorporated company.)
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Shop Name"
                  name="shopName"
                  rules={[
                    { required: true, message: "Please enter your shop name!" },
                  ]}
                >
                  <Input placeholder="This is the shop name displayed to customers" />
                </Form.Item>

                <Form.Item
                  label="Shopping Zone"
                  name="shoppingZone"
                  rules={[
                    {
                      required: true,
                      message: "Please select your shopping zone!",
                    },
                  ]}
                >
                  <Select placeholder="Select the area where your products will be stored">
                    {shoppingZones.map((zone) => (
                      <Option key={zone} value={zone}>
                        {zone}
                      </Option>
                    ))}
                  </Select>
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
                    I hereby confirm that I have read and I agree to the Jumia
                    seller contract, Jumia codes, policies and guidelines and
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
                {step < 5 ? "Next" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <p className="p-2">Already have an account?   <span
          className="text-[#FFA500]"
          onClick={() => navigate("/VendorLogin")}
        >
          Sign in
        </span> </p>
      
      </div>
    </div>
  );
};

export default SignUp;
