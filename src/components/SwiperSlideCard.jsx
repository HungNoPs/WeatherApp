import React, { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

import SummaryCard from './SummaryCard'
import 'swiper/css'

const SwiperSlideCard = ({ listSlice }) => {
  const swiperRef = React.useRef(null)

  return (
    <div className="relative">
      <Swiper ref={swiperRef} slidesPerView={2.2} spaceBetween={20}>
        {listSlice.map((days, index) => (
          <SwiperSlide key={index}>
            <SummaryCard day={days} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiperRef.current.swiper.slideNext()}
        className="btn-slice btn-next hover:text-gray-900 hover:opacity-100 duration-500 ease-in-outs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        onClick={() => swiperRef.current.swiper.slidePrev()}
        className="btn-slice btn-prev hover:text-gray-900 hover:opacity-100 duration-500 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  )
}

export default SwiperSlideCard
