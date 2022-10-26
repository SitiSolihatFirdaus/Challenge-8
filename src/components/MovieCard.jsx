import React from 'react'

const MovieCard = ({ movie }) => {
  return (
    <>
        <div className='inline-block justify-center relative rounded-[10px] overflow-hidden m-[0.5rem] min-w-[200px] z-0 ml-4'>
            <img 
                className='h-[300px] border-solid border-black border-4'
                src={`https://image.tmdb.org/t/p/original/${movie?movie.poster_path:''}`} 
                alt={movie?.title} />
        </div>
    </>
  )
}

export default MovieCard