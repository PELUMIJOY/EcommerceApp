import React from "react";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import jumiaLogo from "../../assets/logo/jumiaLogo.png";

const VendorLogin = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex bg-white shadow-md rounded-lg overflow-hidden w-3/4 max-w-4xl">
        <div className="w-1/2 flex flex-col items-center justify-center p-10">
          <img src={jumiaLogo} alt="Jumia Logo" className="h-12 mb-8" />
          <img
            src="https://vendorcenter.jumia.com/assets/images/signup-background.svg"
            alt="signin image"
            className=" w-1/3"
          />
          <h1 className="text-2xl font-bold text-orange-600 mb-4">
            JUMIA VendorCenter
          </h1>
          <div className="space-y-4 w-full">
            <Button
              type="primary"
              icon={<GoogleOutlined />}
              className="w-full text-left bg-red-500 hover:bg-red-600 border-none"
            >
              Sign in with Google
            </Button>
            <Button
              type="default"
              icon={<MailOutlined />}
              className="w-full text-left"
            >
              Sign in with Email
            </Button>
            <Button
              type="default"
              icon={<StarOutlined />}
              className="w-full text-left"
            >
              Sign in with JUMIA
            </Button>
          </div>
          <Button
            type="link"
            className="mt-6 text-orange-600 hover:text-orange-700"
            onClick={() => navigate("/vendor")}
          >
            Sell on Jumia
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
