import React from "react";
import { Carousel } from "antd";
import img1 from "../../../assets/images/img1.png";
import img2 from "../../../assets/images/img2.png";
import img5 from "../../../assets/images/img5.jpg";
import img3 from "../../../assets/images/img3.png";
import img4 from "../../../assets/images/img4.png";
import superImg from "../../../assets/images/super.jpg"

export default function Middle() {
  const carouselItems = [
    {
      src: img1,
      alt: "Slide 1",
    },
    {
      src: img2,
      alt: "Slide 2",
    },
    {
      src: "https://ng.jumia.is/cms/0-1-initiatives/jbps/updated-jbp-2022/TCL/Desktop_Homepage_Slider__712x384_copy_2.png",
      alt: "Slide 3",
    },
    // {
    //   src: superImg,
    //   alt: "Slide 4",
    // },
    {
      src: img5,
      alt: "Slide 4",
    },
    {
      src: img3,
      alt: "Slide 5",
    },
    {
      src: img4,
      alt: "Slide 6",
    },
  ];

  return (
    <div className="w-full lg:w-[60%] lg:h-[100%]">
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
