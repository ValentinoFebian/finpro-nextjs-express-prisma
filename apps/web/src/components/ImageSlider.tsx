import React from 'react';
import Slider, { Settings } from 'react-slick';
import Image from 'next/image';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl cursor-pointer z-10"
    onClick={onClick}
  >
    <FaCircleChevronRight />
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl cursor-pointer z-10"
    onClick={onClick}
  >
    <FaCircleChevronLeft />
  </div>
);

const ImageSlider: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        <div className="w-full h-[200px] sm:h-[500px] lg:h-[600px] relative">
          <Image
            src="/event-list/dua.webp"
            alt="Party to the Polls"
            width={3213}
            height={1581}
            className="rounded-lg object-cover"
            priority
          />
        </div>

        <div className="w-full h-[200px] sm:h-[500px] lg:h-[600px] relative">
          <Image
            src="/event-list/tiga.webp"
            alt="Party to the Polls"
            width={3213}
            height={1581}
            className="rounded-lg object-cover"
            priority
          />
        </div>

        <div className="w-full h-[200px] sm:h-[500px] lg:h-[600px] relative">
          <Image
            src="/event-list/satu.webp"
            alt="Another Event"
            width={3213}
            height={1581}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
