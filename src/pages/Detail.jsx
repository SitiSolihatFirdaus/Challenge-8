import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

const Detail = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { keyword } = useParams();
  const url = `https://api.themoviedb.org/3/${keyword}/${id}?api_key=0badcefffc03af1c8584bd67dfc87507`;

  useEffect(() => {
    window.scroll(0, 0);
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, [id, keyword]);

  const image = `https://image.tmdb.org/t/p/w1280${data.poster_path}`;
  const bg = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;
  const title = data.original_title || data.name;

  return (
  <>
    <div className='w-full h-screen'>
      <img 
        className='hidden sm:block absolute w-full h-full object-cover' 
        src={bg}
        alt='/' 
      />
      <div className='bg-black/80 fixed top-0 left-0 w-full h-screen'></div>
        <div className='flex items-center justify-between p-4 w-full absolute'>
          <h1 className='text-red-600 text-2xl lg:text-4xl font-bold'>Movielist</h1> 
          <Link to='/'>
            <button className='flex items-center justify-between lg:w-[120px] text-xs lg:text-base py-auto lg:py-2 px-2 lg:p-4 rounded-3xl border-solid border-red-600 border-2 cursor-pointer text-red-600 hover:text-white'>Back to<i className="pl-2"><AiFillHome /></i></button>
          </Link>
        </div>

        <div className="flex items-center justify-between p-4 w-full absolute mt-[80px]">
          <img className="w-[120px] lg:w-[300px] sm:h-[260px] lg:h-[500px] rounded-3xl border-white border-2 border-solid" src={image} alt="" />
          <div className="ml-4 lg:ml-10">
            <h1 className="text-white font-bold text-sm lg:text-6xl mb-2 lg:mb-4">{title}</h1>
            <div className="flex justify-left">
              <button className="flex items-center justify-between text-xs lg:text-base px-2 lg:px-4 py-auto lg:py-2 rounded-full border-solid border-blue-400 border-x-2 text-blue-400"> 
                <h1 className="text-white">{data.original_language}</h1>
              </button>
              <button className="flex items-center justify-between text-xs lg:text-base px-2 py-auto lg:py-2 rounded-full border-solid border-yellow-500 border-2 text-yellow-400">
                <i className="mr-2"><BsFillStarFill /></i> 
                <h1 className="text-white">{data.vote_average}</h1>
              </button>
            </div>
              <h3 className="text-red-600 my-2 lg:my-4 text-xs lg:text-xl">Release: {data.release_date}</h3>
              <p className="text-white text-[8px] lg:text-xl mr-4">{data.overview}</p>
          </div>
        </div>
    </div>
  </>
  );
};

export default Detail;