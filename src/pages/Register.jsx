import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleLogin from "../components/GoogleLogin";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai"
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setToken(getToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Name is required");
      return;
    }
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (name !== "" && email !== "" && password !== "") {
      const data = {
        name,
        email,
        password,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
          data
        );
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
          navigate('/');
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  return (
  <>
    <div className='w-full h-screen'>
      <img 
        className='hidden sm:block absolute w-full h-full object-cover' 
        src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' 
        alt='/' 
      />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full mx-0 lg:mx-4 z-50'>
          <div className='sm:max-w-[350px] md:max-w-[400px] lg:w-[450px] py-2 sm:text-xs md:text-md lg:text-base h-[800] mx-auto mt-10 bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-6'>
              <h1 className='sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8'>Create Account</h1>
              
                <form onSubmit={handleSubmit}>
                  <div className="relative block">
                    <span className='absolute inset-y-0 right-0 flex items-center p-2 text-gray-400 text-xl'>
                      <i><AiOutlineUser /></i>
                    </span>
                    <input 
                      className='w-full p-2 my-2 bg-gray-700 rounded-3xl' 
                      type='name' 
                      placeholder='Name' 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

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
                
                  <button className='w-full bg-red-600 py-3 my-6 rounded-3xl font-bold hover:text-black' type="submit">Register</button>
                  <h3 className='text-center'>OR</h3>
                  <GoogleLogin setToken={setToken} label="Register with Google" />
                  <p className="py-1">
                    <span className="text-gray-400 text-center">
                      Already on Movielist?
                    </span>{' '}
                    <Link to='/login' className="hover:text-red-600">Login</Link>
                  </p>    
                </form>

            </div>
          </div>
        </div>
    </div>
  </>
  );
};

export default Register;