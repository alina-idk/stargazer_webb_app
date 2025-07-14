import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.png";

export function Header({ onFavoritesClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <Link to="/" className="logo-link" onClick={() => setIsOpen(false)}>
        <img src={logo} alt="Logo" className="header-logo" />
      </Link>

      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/explore" onClick={() => setIsOpen(false)}>Explore</Link>
        <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
        <Link to="/sky-today" onClick={() => setIsOpen(false)}>Sky Today</Link>
        <Link to="/facts" onClick={() => setIsOpen(false)}>Facts</Link>
        <Link to="/calendar" onClick={() => setIsOpen(false)}>Calendar</Link>
      </nav>

      <div className="mobile-menu-container">
        <button
          className="fav-heart-btn mobile-heart"
          onClick={onFavoritesClick}
          aria-label="Open favorites popup"
          title="Open Favorites"
          type="button"
        >
          💜
        </button>

        <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <button
        className="fav-heart-btn desktop-heart"
        onClick={onFavoritesClick}
        aria-label="Open favorites popup"
        title="Open Favorites"
        type="button"
      >
        💜
      </button>
    </header>
  );
}
