import React from "react";
import { Link } from "react-router-dom";

const MovieCart = (props) => {
  const item = props.item;

  return (
  <>
    <Link to={`/detail/${item.id}/${props.catalog}`}>
      <div className='inline-block justify-center relative rounded-[10px] overflow-hidden min-w-[80px] lg:min-w-[200px] z-0 ml-4'>
        <img 
          className='rounded-2xl w-[80px] lg:w-[240px] hover:translate-x-4 duration-200 hover:animate-spin'
          src={`https://image.tmdb.org/t/p/w1280/${item?.poster_path}`}
          alt={item?.title}
          />
      </div>
    </Link>
  </>
  );
};

export default MovieCart;