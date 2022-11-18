import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { FiPlayCircle } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";

const url =
  "https://api.themoviedb.org/3/tv/popular?api_key=0badcefffc03af1c8584bd67dfc87507&language=en-US&page=1";

const HeroSlider = () => {
  const [modalActive, setModalActive] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data.results.slice(0, 5));
    });
  }, []);

  return (
  <>
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        speed={1000}
        grabCursor={true}
        autoplay={{ delay: 6000 }}
        loop
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                modalActive={modalActive}
                setModalActive={setModalActive}
                className={` ${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </>
  );
};

const HeroSlideItem = (props) => {
  const item = props.item;

  return (
  <>
    <div className='w-full h-full text-white'>
      <div className='w-full h-full'>
        <div className="absolute w-full h-full bg-gradient-to-t from-black"></div>
        <img 
          className='w-full h-full object-cover'
          src={`https://image.tmdb.org/t/p/w1280/${item?.backdrop_path}`}
          alt=""
        />
        <div className='absolute w-full top-[30%] lg:top-[25%] p-2 lg:p-4'>
          <h1 className='text-3xl md:text-5xl w-[50%] font-bold text-white'>{item?.title}</h1>
          <button className="flex items-center justify-between text-[8px] lg:text-base px-2 py-auto lg:py-2 rounded-full border-solid border-yellow-500 border-2 text-yellow-400">
            <i className="mr-2"><BsFillStarFill /></i> 
            <h1 className="text-white">{item?.vote_average}</h1>
          </button>
          <p className='w-[75%] lg:w-[50%] text-[8px] lg:text-base text-white my-2 lg:my-4'>{item?.overview}</p>
          <button className='flex items-center justify-between w-auto lg:w-[190px] bg-red-600 py-auto lg:py-2 lg:p-4 rounded-3xl cursor-pointer text-white text-[8px] lg:text-base hover:text-black font-bold'>
            <i className='hover:text-black'><FiPlayCircle /></i>WATCH TRAILER</button>
        </div>
      </div>
    </div>
  </>
  );
};

export default HeroSlider;