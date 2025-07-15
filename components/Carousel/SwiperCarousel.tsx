import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface SwiperCarouselProps {
  children: React.ReactNode[];
  slidesPerView?: number;
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ children, slidesPerView = 4 }) => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView={slidesPerView}
      spaceBetween={24}
      style={{ paddingBottom: '2rem' }}
    >
      {children.map((child, idx) => (
        <SwiperSlide key={idx}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export { SwiperCarousel };
