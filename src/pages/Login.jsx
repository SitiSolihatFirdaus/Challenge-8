import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleLogin from "../components/GoogleLogin";
import { AiOutlineMail, AiTwotoneHome } from "react-icons/ai"
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (email !== "" && password !== "") {
      const data = {
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/login`,
          data
        );
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setToken(null);
  // };

  return (
    <div className='w-full h-screen'>
      <img 
        className='hidden sm:block absolute w-full h-full object-cover' 
        src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' 
        alt='/' 
      />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
          <div className='fixed w-full mx-4 z-50'>
          <div className='max-w-[450px] h-[800] mx-auto bg-black/75 text-white mt-10'>
            <div className='max-w-[320px] mx-auto py-6'>
              <h1 className='text-3xl font-bold text-center mb-8'>Log in to Your Account</h1>
              {!token ? (
                <>
                <form onSubmit={handleSubmit}>
                <div className="relative block">
                  <span className='absolute inset-y-0 right-0 flex items-center p-2 text-gray-400 text-xl'>
                    <i><AiOutlineMail /></i>
                  </span>
                  <input 
                    className='w-full p-2 my-2 bg-gray-700 rounded-3xl' 
                    type='email' 
                    placeholder='Email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative block">
                  <span className='absolute inset-y-0 right-0 flex items-center p-2 text-gray-400 text-xl'>
                    <i><RiLockPasswordLine /></i>
                  </span>
                  <input 
                    className='w-full p-2 my-2 bg-gray-700 rounded-3xl' 
                    type='password' 
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Link to='/' >
                  <button className='w-full bg-red-600 py-3 my-6 rounded-3xl font-bold' type="submit">Login</button>
                </Link>
                <h3 className='text-center'>OR</h3>
                <GoogleLogin setToken={setToken} label="Login with Google" />
                  
              </form>
              </>
              ) : (
                <Link to='/'>
                  <button className='w-full flex items-center justify-center bg-red-600 hover:bg-red-800 px-4 py-2 my-4 p-4 rounded-3xl cursor-pointer text-white font-bold'>
                    Go<i className='pl-2 pr-2'><AiTwotoneHome /></i>to Explore Popular Film</button>
                </Link>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Login;
