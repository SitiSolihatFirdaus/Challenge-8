import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from 'react-icons/fc';

function GoogleLogin({ setToken, label }) {
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      // Send access token to backend
      try {
        const data = {
          access_token: response.access_token,
        };
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/google`,
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
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <>
      <button className='flex items-center justify-center bg-blue-500 hover:bg-blue-700 w-full py-2 my-6 rounded-3xl cursor-pointer text-white font-bold' onClick={googleLogin}>
        <i className='pr-2 text-3xl'><FcGoogle /></i> {label}
      </button>
    </>
  );
}

export default GoogleLogin;
