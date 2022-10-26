import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { HiSearch } from "react-icons/hi"
import { FiPlayCircle } from 'react-icons/fi'
import { AiOutlineArrowRight } from "react-icons/ai"
import { MdChevronLeft, MdChevronRight, MdMovieFilter } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import request from '../Request'
import MovieCard from '../components/MovieCard'

const Menu = () => {
    const API_URL = "https://api.themoviedb.org/3"

    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');

    const movie = movies[Math.floor(Math.random() * movies.length)]

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            // remove token
            localStorage.removeItem("token");
            navigate.push("/");
          }
        }
      }
    })();
  }, [token, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
  };

    useEffect(()=> {
        axios.get(request.requestPopular).then((response)=> {
            setMovies(response.data.results)
        })
    }, [])

    const fetchMovies = async () => {
        const {data: {results}} = await axios.get(`${API_URL}/movie/popular`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY
            }
        })
        setMovies(results)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const searchMovies = async (e) => {
        e.preventDefault()
        try {
            const url=`https://api.themoviedb.org/3/search/movie?api_key=0badcefffc03af1c8584bd67dfc87507&query=${query}`;
            const res= await fetch(url);
            const data= await res.json();
            console.log(data);
            setMovies(data.results);
        }
        catch(e) {
            console.log(e)
        }
    }

    const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500;
    };

  return (
    <>
            <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
                <h1 className='text-red-600 text-4xl font-bold'>Movielist</h1>

                    <form className="relative block" onSubmit={searchMovies}>
                        <button 
                            className='absolute inset-y-0 right-0 flex items-center p-4 text-white text-xl' 
                            type="submit">
                                <i><HiSearch /></i>
                        </button>
                        <input 
                            onChange={(e) => setQuery(e.target.value)}
                            className='bg-transparent w-[500px] h-[40px] rounded-3xl border-solid border-red-600 border-2 px-4 placeholder:text-white block focus:outline-none focus:border-red-500'
                            placeholder='What do you want to watch?'
                            type="text">
                        </input>
                    </form>

                    {!token ? (
                        <>
                            <div>
                                <Link to='/login'>
                                    <button className='w-[100px] h-[40px] rounded-3xl border-solid border-red-600 border-2 cursor-pointer text-red-600 mr-2'>Login</button>
                                </Link>
                                <Link to='/register'>
                                    <button className='bg-red-600 w-[100px] py-2 rounded-3xl cursor-pointer text-white'>Register</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                        <Link to='/'>
                            <button className='w-[100px] h-[40px] rounded-3xl border-solid border-red-600 border-2 cursor-pointer text-red-600 mr-2' onClick={handleLogout}>Logout</button>
                        </Link>
                        </>
                    )}
            </div>

            <div className='w-full h-[550px] text-white'>
                <div className='w-full h-full'>
                    <div className='absolute w-full h-[550px]'></div>
                    <img 
                        className='w-full h-full object-cover'
                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                        alt={movie?.title} 
                    />
                    <div className='absolute w-full top-[20%] p-4'>
                        <h1 className='text-3xl md:text-6xl w-[50%] font-bold'>{movie?.title}</h1>
                        <p className='w-[50%] text-white my-4'>{movie?.overview}</p>
                        <button className='flex items-center justify-between bg-red-600 px-4 py-2 my-4 p-4 rounded-3xl cursor-pointer text-white font-bold'>
                            <i className='pr-2'><FiPlayCircle /></i>WATCH TRAILER</button>
                    </div>
                </div>
            </div>

            <div className='flex justify-between p-4'>
                <h1 className='font-bold text-3xl'>Popular Movie</h1>
                <Link to='/popular' className='text-red-600 text-bold mr-2 flex justify-between hover:text-red-800'>
                    See Detail Movie
                    <span className='text-red-600 py-1 px-2 text-bold hover:text-red-800'>
                        <i><AiOutlineArrowRight /></i>
                    </span>
                </Link>
            </div>

            <div className='relative flex items-center group'>
                <MdChevronLeft 
                    onClick={slideLeft}
                    className='bg-gray-600 left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
                    size={40} />
                <div id={'slider'} className='flex overflow-x-scroll whitespace-nowrap scroll-smooth space-x-4 scrollbar-hide relative'>
                    {movies.map((movie, id) => (
                        <MovieCard key={id} movie={movie} />
                    ))}
                </div>
                <MdChevronRight 
                    onClick={slideRight}
                    className='bg-gray-600 right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
                    size={40} />
            </div>

            <div className='w-full h-[100px] bg-gray-400 mt-[100px] bg-gradient-to-r from-black'>
                <div className='flex items-center justify-center text-4xl text-bold text-red-600 py-2'>
                    <i className='text-red-600 px-2'><MdMovieFilter /></i>Movielist</div>
                <p className='text-center text-white'>2022</p>
            </div>
       </>
  )
}

export default Menu