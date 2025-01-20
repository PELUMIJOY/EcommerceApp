import React from "react";
import { Carousel } from "antd";

export default function Middle() {
  const carouselItems = [
    {
      src: "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/w21-top-brands/fitness-week/712x384.jpg",
      alt: "Slide 1",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-weekly-cps/0-2023/w21-top-brands/Desktop_Homepage_Slider_712x384.png",
      alt: "Slide 2",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/TCL/Desktop_Homepage_Slider__712x384_copy_2.png",
      alt: "Slide 3",
    },
    {
      src: "https://ng.jumia.is/cms/0-CMS-MIGRATION-2020/adidas/2023/May/712x384-copy-new.jpg",
      alt: "Slide 4",
    },
  ];

  return (
    <div className="w-full lg:w-[60%]">
      <Carousel autoplay dotPosition="bottom" className="rounded-lg shadow-lg">
        {carouselItems.map((item, index) => (
          <div key={index}>
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-[500px] rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
