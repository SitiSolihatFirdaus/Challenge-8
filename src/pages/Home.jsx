import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../redux/actions/actions";
import { MdMovie } from "react-icons/md";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state);

  useEffect(() => {
    console.log(products);
    dispatch(getPopularMovies());
  }, []);

  return (
  <>
    <Header />
    <HeroSlider />

    <div className='flex justify-between p-2 my-6'>
      <h1 className='font-bold sm:text-xl md:text-2xl lg:text-3xl text-white'>Popular Movies</h1>
      <Link to='/movie'>
        <button className='text-white sm:text-xs md:text-md lg:text-base text-bold py-2 px-2 flex justify-between hover:text-red-600 rounded-3xl border-solid border-red-600 border-2 cursor-pointer'>View More
          <i className='text-white py-1 pl-2 text-bold hover:text-red-600'><MdMovie /></i>
        </button>
      </Link>
    </div>
    
    <MovieList catalog={"movie"} data={products.Popularmovies} />
    <Footer />
  </>
  );
};

export default Home;