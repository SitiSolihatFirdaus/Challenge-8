import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Popular from './pages/Popular'
import NotFound from "./pages/404.jsx";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import reportWebVitals from "./reportWebVitals";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Menu from "./pages/Menu";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route
          path="/popular"
          element={
            <Protected>
              <Popular />
            </Protected>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
