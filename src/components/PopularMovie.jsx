import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const PopularMovie = ({ fetchURL }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results);
        });
    }, [fetchURL]);

  return (
    <>
        <div className='flex justify-between p-4'>
            <h1 className='font-bold text-3xl'>Popular Movie</h1>
            <Link to='/' className='text-red-600 text-bold text-2xl flex justify-between hover:text-red-800'>
                Back Home
                <span className='text-red-600 py-1 px-2 text-bold hover:text-red-800'>
                    <i><AiOutlineHome /></i>
                </span>
            </Link>
        </div>

            <div>
                {movies.length === 0 ? (
                    <>
                        <h1 className='text-2xl text-bold text-center text-red-600'>Loading...</h1>
                    </>
                ) : (
                movies.map((movie) => (
                    <div>
                    <div className='bg-blue-300 bg-gradient-to-l from-green-400 flex items-center justify-between relative m-[0.5rem] min-w-[200px] ml-4'>
                        <img
                            className='h-[300px]'
                            src={`https://image.tmdb.org/t/p/original/${movie?movie.poster_path:''}`}
                            alt={movie?.title}
                        />
                        <h1 className='text-bold text-3xl mx-6'>{movie.title}</h1>
                        <div className='mr-4'>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                    </div>
                    ))
                )}
            </div>
    </>
  )
}

export default PopularMovie