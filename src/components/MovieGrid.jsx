import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, SearchMovies } from "../redux/actions/actions";

const MovieGrid = (catalog) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.Popularmovies.products);

  useEffect(() => {
    dispatch(SearchMovies(catalog.value));
  }, [catalog.value]);
  
  useEffect(() => {
    dispatch(getMovies(catalog.catalog));
    window.scroll(0, 0);
  }, [catalog.catalog]);

  return (
  <>
    <div className="relative flex items-center">
      {item.map((el) => (
        <div className="cursor-pointer relative p-2 mt-[100px]">
          <MovieItem item={el} key={el.id} catalog={catalog.catalog} />
        </div>
      ))} 
    </div>
  </>
  );
};

const MovieItem = (props) => {
  const item = props.item;
  const image = `https://image.tmdb.org/t/p/w1280${item.poster_path}`;

  return (
  <>
    <Link to={`/detail/${item.id}/${props.catalog}`}>
      <img className="rounded-2xl hover:translate-y-4 duration-200 hover:animate-pulse" src={image} alt="" />
    </Link>
  </>
  );
};

export default MovieGrid;