import React from "react";
import { Card } from "antd";
import sideImg from "../../../assets/images/sideImg.png"
import sideImg2 from "../../../assets/images/sideImg2.png"

export default function Rightside() {
  return (
    <div className="hidden lg:flex lg:w-[20%] flex-col p-2 pt-0 space-y-2">
      {/* First Image */}
      <Card
        hoverable
        cover={
          <img
            src={sideImg}
            alt="Free Delivery"
            className="rounded-sm"
          />
        }
        className="h-[50%] shadow-lg"
      />

      {/* Second Image */}
      <Card
        hoverable
        cover={
          <img
            src={sideImg2}
            alt="JForce Initiative"
            className="rounded-sm"
          />
        }
        className="h-[50%] shadow-lg"
      />
    </div>
  );
}

