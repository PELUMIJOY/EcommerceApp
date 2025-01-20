import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";

const SliderMainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "/api/placeholder/1168/384",
      alt: "Adidas Store Banner",
    },
    {
      src: "/api/placeholder/1168/384",
      alt: "Oraimo Store Banner",
    },
    {
      src: "/api/placeholder/1168/384",
      alt: "Nivea Store Banner",
    },
    {
      src: "/api/placeholder/1168/384",
      alt: "Nestle Store Banner",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="mb-4 p-4 bg-lime-300 rounded-lg">
        <h2 className="text-xl font-bold">Official Store</h2>
      </div>

      {/* Carousel */}
      <Card className="relative overflow-hidden">
        <div className="relative h-96">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Slide Buttons */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <Button
            key={index}
            type={currentSlide === index ? "primary" : "default"}
            shape="circle"
            size="small"
            onClick={() => goToSlide(index)}
            className="w-8 h-8 flex items-center justify-center"
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SliderMainPage;
