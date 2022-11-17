import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from "react-router-dom";

function GoogleLogin ({ setToken, label }) {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({

  onSuccess: async (response) => {
    try {
      const data = {
        access_token: response.access_token,
      };
      const result = await axios.post(
        `${process.env.REACT_APP_AUTH_API}/api/v1/auth/google`,
        data
      );
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        setToken(result.data.token);
        navigate('/');
      };
    } catch (error) {
      alert(error.response.data.message);
    };
  },
  onError: (error) => {
    alert(error);
  },
});

  return (
  <>
    <button className='flex items-center justify-center bg-blue-500 hover:text-black w-full py-2 my-6 rounded-3xl cursor-pointer text-white font-bold' onClick={googleLogin}>
      <i className='pr-2 sm:text-xl md:text-2xl lg:text-3xl'><FcGoogle /></i> {label}
    </button>
  </>
  );
};

export default GoogleLogin;