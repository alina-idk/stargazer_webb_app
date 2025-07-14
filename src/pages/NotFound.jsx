import React from "react";
import { useNavigate } from "react-router-dom";
import imgDesktop from "../assets/404-desktop.png";
import imgMobile from "../assets/404-mobile.png";
import "../styles/NotFound.css";


export function NotFound() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };
    
    
    return (
    <div className="notfound-container">
      <picture className="notfound-bg">
        <source srcSet={imgDesktop} media="(min-width: 1024px)" />
        <img src={imgMobile} alt="404 Not Found" className="notfound-image" />
      </picture>

      <div className="notfound-overlay">
        <p className="notfound-text">Oops! You're lost in space 🪐</p>
        <button className="notfound-button" onClick={goHome}>
          Return to Earth 🌍
        </button>
      </div>
    </div>
  );
}