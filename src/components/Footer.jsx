import React from 'react';
import { MdMovieFilter } from 'react-icons/md';

const Footer = () => {
  return (
  <>
    <div className='w-full h-auto pb-0 bg-gray-400 mt-[410px] lg:mt-[80px] bg-gradient-to-b from-black'>
      <div className='flex items-center justify-center text-sm lg:text-4xl text-bold text-red-600 py-2'>
        <i className='text-red-600 px-2'><MdMovieFilter /></i>Movielist</div>
      <p className='text-center text-white text-xs lg:text-base pb-1'>Siti Solihat Firdaus</p>
      <p className='text-center text-black text-xs lg:text-base pb-2'>2022</p>
    </div>
  </>
  );
};

export default Footer;