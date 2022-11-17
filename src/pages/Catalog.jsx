import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import { AiFillHome } from "react-icons/ai";

const Catalog = () => {
  const [value, setValue] = useState("");
  const { catalog } = useParams();

  const Hendlerinput = (e) => {
    setValue(e.target.value);
  };

  return (
  <>
    <div className='w-full h-screen'>
      <img 
        className='hidden sm:block absolute w-full h-full object-cover' 
        src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' 
        alt='/' 
      />
      <div className='bg-black/80 fixed top-0 left-0 w-full h-screen'></div>
        <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
          <h1 className='text-red-600 sm:text-2xl md:text-3xl lg:text-4xl  font-bold'>Movielist</h1>

          <Link to="/movie">
            <form className="relative block">
              <input 
                className='bg-transparent w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] py-2 text-white rounded-3xl border-solid border-red-600 border-2 px-4 placeholder:text-white placeholder:sm:text-xs placeholder:md:text-md placeholder:lg:text-base block focus:outline-none focus:border-red-500'
                placeholder='What do you want to watch?'
                type="text"
                id=""
                onChange={(e) => Hendlerinput(e)}>
              </input>
            </form>
          </Link>

          <Link to='/'>
            <button className='flex items-center justify-between sm:w-[100px] md:w-[120px] lg:w-[120px] py-2 p-4 sm:text-xs md:text-md lg:text-base rounded-3xl border-solid border-red-600 border-2 cursor-pointer text-red-600 hover:text-white'>Back to<i className="pl-2"><AiFillHome /></i></button> 
          </Link>
        </div>

        <MovieGrid catalog={catalog} value={value} />
    </div>
  </>
  );
};

export default Catalog;