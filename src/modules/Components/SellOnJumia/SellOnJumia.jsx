import React from "react";
import { Row, Col, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const SellOnJumia = () => {
  const navigate = useNavigate()
  return (
    <div className="sell-on-jumia">
      {/* Header Section */}
      <div
        style={{ background: "#FFA500", padding: "40px", textAlign: "center" }}
      >
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <h1 style={{ color: "#fff", margin: 0 }}>Sell on JoyceStore</h1>
          </Col>
          <Col xs={24} sm={12} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "#FF6600", border: "none" }}
              onClick={()=> navigate("/signup")}
            >
              Start Selling
            </Button>
          </Col>
        </Row>
      </div>

      {/* Why Sell on Jumia Section */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3 style={{ marginBottom: "20px" }}>Why sell on JoyceStore?</h3>
        <Row gutter={[16, 16]} justify="center">
          {[
            "Connect with more buyers",
            "Sell more products",
            "Top notch seller support",
            "Expert product delivery",
            "Improve revenue",
            "Free online/offline training",
          ].map((text, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={4}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#D0011B",
                  border: "none",
                  width: "100%",
                  padding: "10px",
                }}
              >
                {text}
              </Button>
            </Col>
          ))}
        </Row>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Testimonials
        </h3>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col xs={24} md={12}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/Pa6WejaZrsA"
              title="Vendor Success Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <p style={{ marginBottom: "10px" }}>
                Selling on JoyceStore has been very rewarding with higher turnover
                and good profit.
              </p>
              <p style={{ fontStyle: "italic", textAlign: "right", margin: 0 }}>
                - Yejide Olulana, Allure Beauty Store
              </p>
            </Card>
          </Col>
        </Row>
        <div style={{ background: "#f9f9f9", padding: "40px" }}>
          <h3 style={{ textAlign: "center", marginBottom: "40px" }}>
            How it works
          </h3>
          <Row gutter={[16, 16]} justify="center">
            {[
              {
                img: "/path-to-image1.png",
                title: "Step 1: Register under 5 minutes",
                description:
                  "Fill the registration form and submit the required documents:\n(a) Business registration\n(b) Bank account details",
              },
              {
                img: "/path-to-image2.png",
                title: "Step 2: Become an ecommerce expert",
                description:
                  "Complete the dedicated new seller training and activate your seller center account to manage your shop.",
              },
              {
                img: "/path-to-image3.png",
                title: "Step 3: List your products and sell",
                description:
                  "Upload your best-selling products and start selling.",
              },
              {
                img: "/path-to-image4.png",
                title: "Step 4: Benefit from our promotions and marketing",
                description:
                  "Get visibility from our campaigns/promotions and insight on best-selling products.",
              },
            ].map((step, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={6}
                style={{ textAlign: "center" }}
              >
                <img
                  src={step.img}
                  alt={step.title}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                    border: "5px solid #FFA500",
                  }}
                />
                <h4 className="text-md mb-2 text-left">{step.title}</h4>
                <p className="text-gray-600 whitespace-pre-line text-left">
                  {step.description}
                </p>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-10">
            <Button onClick={()=> navigate("/signup")} className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition mr-4" >
              Start Selling
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellOnJumia;
