import React from 'react';
import { MdMovieFilter } from 'react-icons/md';

const Footer = () => {
  return (
  <>
    <div className='w-full h-auto bg-gray-400 mt-[80px] bg-gradient-to-b from-black'>
      <div className='flex items-center justify-center sm:text-2xl md:text-3xl lg:text-4xl text-bold text-red-600 py-4'>
        <i className='text-red-600 px-2'><MdMovieFilter /></i>Movielist</div>
      <p className='text-center text-white sm:text-xs md:text-md lg:text-base'><span className='text-black text-bold'>Siti Solihat Firdaus</span> - 2022</p>
    </div>
  </>
  );
};

export default Footer;