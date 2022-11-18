import React, {useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

function Header () {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            navigate.push("/");
          };
        };
      };
    })();
  }, [token, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate('/')
  };

  return (
  <>
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <h1 className='text-red-600 text-lg lg:text-4xl font-bold'>Movielist</h1>

      <Link to="/movie">
        <form className="relative block">
          <button 
            className='absolute inset-y-0 right-0 flex items-center pr-2 lg:pr-4 text-white text-[8px] lg:text-base' 
            type="submit">
              <i><HiSearch /></i>
          </button>
          <input 
            className='bg-transparent w-[140px] lg:w-[400px] py-auto lg:py-2 rounded-3xl border-solid border-red-600 border-2 px-2 lg:px-4 placeholder:text-white placeholder:text-[8px] placeholder:lg:text-base block focus:outline-none'
            placeholder='What do you want to watch?'
            type="text">
          </input>
        </form>
      </Link>

      {!token ? (
      <>
      <div>
        <Link to='/login'>
          <button className='w-[40px] lg:w-[120px] py-auto lg:py-2 text-[8px] lg:text-base rounded-3xl border-solid border-red-600 border-2 text-red-600 mr-2 hover:text-white'>Login</button>
        </Link>
        <Link to='/register'>
          <button className='bg-red-600 w-[40px] lg:w-[120px] text-[8px] lg:text-base py-auto lg:py-2 rounded-3xl border-solid border-red-600 border-2 text-white hover:text-black'>Register</button>
        </Link>
      </div>
      </>
      ) : (
      <>
          <button className='w-[40px] lg:w-[120px] text-[8px] lg:text-base py-auto lg:py-2 rounded-3xl border-solid border-red-600 border-2 cursor-pointer text-red-600 mr-2 hover:text-white' onClick={handleLogout}>Logout</button>
      </>
      )}
    </div>
  </>
  );
};

export default Header;