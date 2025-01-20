import React from "react";
import { Carousel } from "antd";

export default function Recommended() {
  const categories = [
    {
      src: "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/phones_220x220.png",
      label: "Phones & Tablets",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-homepage/0-0-thumbnails/clearance_220x220.png",
      label: "Up to 30% off",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/Television.jpg",
      label: "Television",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/groceries_220x220.png",
      label: "Groceries",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/refreigerator.jpg",
      label: "Refrigerators",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-christmas-sale/2022/thumbnails/electronics_220x220.png",
      label: "Electronics",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/01-thumbnails/Best_Seller.png",
      label: "Best Sellers",
    },
  ];

  return (
    <div className="pt-5">
      <Carousel autoplay className="bg-white p-4 rounded-lg shadow-lg">
        {categories.map((category, index) => (
          <div key={index} className="text-center">
            <img
              src={category.src}
              alt={category.label}
              className="h-32 mx-auto object-contain"
            />
            <span className="block mt-2">{category.label}</span>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
