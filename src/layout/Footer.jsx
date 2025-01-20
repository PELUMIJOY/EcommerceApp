import React from "react";
import { Input, Button, Typography, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Footer() {
  return (
    <div className="bg-gray-100">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-10 bg-white">
        {/* Services */}
        <div>
          <Title level={4} style={{ color: "#1D4ED8" }}>Services</Title>
          <div>
            <Text className="block cursor-pointer hover:underline">Branding</Text>
            <Text className="block cursor-pointer hover:underline">Design</Text>
            <Text className="block cursor-pointer hover:underline">Marketing</Text>
            <Text className="block cursor-pointer hover:underline">Advertisement</Text>
          </div>
        </div>

        {/* Company */}
        <div>
          <Title level={4} style={{ color: "#1D4ED8" }}>Company</Title>
          <div>
            <Text className="block cursor-pointer hover:underline">About us</Text>
            <Text className="block cursor-pointer hover:underline">Contact</Text>
            <Text className="block cursor-pointer hover:underline">Jobs</Text>
            <Text className="block cursor-pointer hover:underline">Press kit</Text>
          </div>
        </div>

        {/* Legal */}
        <div>
          <Title level={4} style={{ color: "#1D4ED8" }}>Legal</Title>
          <div>
            <Text className="block cursor-pointer hover:underline">Terms of use</Text>
            <Text className="block cursor-pointer hover:underline">Privacy policy</Text>
            <Text className="block cursor-pointer hover:underline">Cookie policy</Text>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <Title level={4} style={{ color: "#1D4ED8" }}>Newsletter</Title>
          <Text>Enter your email address:</Text>
          <div className="flex mt-2">
            <Input
              placeholder="username@site.com"
              className="flex-1"
              size="large"
            />
            <Button type="primary" className="ml-2" size="large">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <Divider />

      {/* Bottom Section */}
      <div className="text-center py-5 bg-gray-100">
        <div className="flex justify-center space-x-8 mb-4">
          <a
            href="#"
            className="text-gray-500 hover:text-blue-600 text-2xl"
            aria-label="Facebook"
          >
            <FacebookOutlined />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-blue-600 text-2xl"
            aria-label="Twitter"
          >
            <TwitterOutlined />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-red-600 text-2xl"
            aria-label="YouTube"
          >
            <YoutubeOutlined />
          </a>
        </div>
        <Text>Copyright © 2023 - All rights reserved by ACME Industries Ltd</Text>
      </div>
    </div>
  );
}
