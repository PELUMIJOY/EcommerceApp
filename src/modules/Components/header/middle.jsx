import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import art from "../../../assets/images/art.jpeg";
import artwork from "../../../assets/images/artwork.jpeg";
import cabin from "../../../assets/images/Cabin.jpeg";
import picArt from "../../../assets/images/picArt.jpeg";
import moo from "../../../assets/images/Moo.jpeg";
import oxford from "../../../assets/images/oxford.jpg";

export default function Middle() {
  const carouselItems = [
    { src: art, alt: "Art Gallery" },
    { src: artwork, alt: "Modern Artwork" },
    { src: cabin, alt: "Rustic Cabin" },
    { src: picArt, alt: "Picture Art" },
    { src: moo, alt: "Moo Art" },
    { src: oxford, alt: "Oxford View" },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl mx-2">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-[500px] rounded-lg shadow-lg"
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
