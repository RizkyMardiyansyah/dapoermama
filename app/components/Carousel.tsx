"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

export default function Carousel() {
  return (
    <div className="px-4 md:px-12 mt-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
        loop={true}
        className="rounded-3xl shadow-xl overflow-hidden h-22 sm:h-72"

      >
        <SwiperSlide>
          <img
            src="img/baner.svg"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/kastengel.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/semprit.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/semprit.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/bawang.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/gabus.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/kacang.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/keju.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/jambu.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="img/salju.png"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
       {/* PAGINATION DI LUAR */}
       <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  )
}
