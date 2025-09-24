import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchAllZones, fetchCountries, fetchZonesByCountry } from "../../api";
import { signUpWithEmail } from "../../utils/auth-client";

const { Option } = Select;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vendorData, setVendorData] = useState({
    country: "",
    shoppingZone: "",
    shopName: "",
    accountType: "",
    email: "",
    password: "",
    name: "",
    lastName: "",
    phone: "",
  });

  const [countries, setCountries] = useState([]);
  const [zones, setZones] = useState([]);
  const [loadingData, setLoadingData] = useState({
    countries: false,
    zones: false,
  });

  // Fetch countries when component mounts
  useEffect(() => {
    fetchCountriesData();
  }, []);

  // Fetch zones when country changes
  const handleCountryChange = async (value) => {
    const selectedCountry = countries.find((country) => country.name === value);
    if (selectedCountry) {
      await fetchZonesData(selectedCountry.code);
      setVendorData((prev) => ({ ...prev, country: value }));
    }
  };

  const fetchCountriesData = async () => {
    setLoadingData((prev) => ({ ...prev, countries: true }));
    try {
      const response = await fetchCountries();
      setCountries(response.data);
    } catch (error) {
      message.error("Failed to load countries: " + error.message);
      console.error("Error fetching countries:", error);
    } finally {
      setLoadingData((prev) => ({ ...prev, countries: false }));
    }
  };

  const fetchZonesData = async (countryCode) => {
    setLoadingData((prev) => ({ ...prev, zones: true }));
    try {
      const response = countryCode
        ? await fetchZonesByCountry(countryCode)
        : await fetchAllZones();
      setZones(response.data);
    } catch (error) {
      message.error("Failed to load zones: " + error.message);
      console.error("Error fetching zones:", error);
    } finally {
      setLoadingData((prev) => ({ ...prev, zones: false }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();

      switch (step) {
        case 1:
          const selectedCountry = countries.find(
            (country) => country.name === values.country
          );
          if (selectedCountry) {
            await fetchZonesData(selectedCountry.code);
            setVendorData((prev) => ({ ...prev, country: values.country }));
          }
          setStep(2);
          break;

        case 2:
          setVendorData((prev) => ({
            ...prev,
            email: values.email,
          }));
          setStep(3);
          break;

        case 3:
          // Store personal information
          setVendorData((prev) => ({
            ...prev,
            name: values.name,
            lastName: values.lastName,
            phone: values.phone,
            password: values.password,
          }));
          setStep(4);
          break;

        case 4:
          // Ensure agreement is checked
          if (!values.agree) {
            return message.error("You must agree to the terms to proceed!");
          }

          // Combine all data for final submission
          const signupData = {
            email: vendorData.email,
            password: vendorData.password,
            name: vendorData.name,
            lastName: vendorData.lastName,
            phone: vendorData.phone,
            role: "vendor",
            country: vendorData.country,
            shoppingZone: values.shoppingZone,
            shopName: values.shopName,
            accountType: values.accountType,
          };

          console.log("Sending signup data:", signupData);

          try {
            await signUpWithEmail(signupData);
            message.success("Account created successfully!");
            navigate("/VendorLogin");
          } catch (error) {
            console.error("Signup error:", error);
            message.error(
              error.message || "Failed to create account. Please try again."
            );
          }
          break;
      }
    } catch (error) {
      message.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const stepDetails = [
    {
      heading: "Sell on Didara Nigeria",
      description: "Choose the country of your shop",
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
                label="Select your country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country!" },
                ]}
              >
                <Select
                  placeholder="Select your country"
                  loading={loadingData.countries}
                  showSearch
                  optionFilterProp="children"
                  onChange={handleCountryChange}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {countries.map((country) => (
                    <Option key={country.code} value={country.name}>
                      {country.name}
                    </Option>
                  ))}
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
              </>
            )}

            {step === 4 && (
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
                  <Select
                    placeholder="Select your shopping zone"
                    loading={loadingData.zones}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {zones.map((zone) => (
                      <Option key={zone.id} value={zone.name}>
                        {zone.name}
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
                    I hereby confirm that I have read and I agree to the Didara
                    Nigeria Mall seller contract, Didara Nigeria codes, policies
                    and guidelines and Privacy Notice and Cookie Notice
                    referenced therein.
                  </Checkbox>
                </Form.Item>
              </>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                onClick={handleSubmit}
                loading={loading}
                className="bg-[#FFA500] w-full"
              >
                {step < 4 ? "Next" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <p className="p-2">
          Already have an account?{" "}
          <span
            className="text-[#FFA500] cursor-pointer"
            onClick={() => navigate("/VendorLogin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
