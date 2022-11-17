import React from "react";
import MovieCart from "../components/MovieCart";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieList = ({ catalog, data }) => {
  const slideLeft = () => {
      var slider = document.getElementById('slider');
      slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
      var slider = document.getElementById('slider');
      slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
  <>
    <div className='relative flex items-center group'>
      <MdChevronLeft onClick={slideLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
        <div id={'slider'} className='flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide space-x-4 relative'>
        {data.products.map((item) => {
          return (
            <div key={item.id} className="">
              <MovieCart item={item} catalog={catalog} />
            </div>
          );
        })}
        </div>
      <MdChevronRight onClick={slideRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
    </div>
  </>
  );
};

export default MovieList;