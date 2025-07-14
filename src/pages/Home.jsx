import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ import nou!
import "../styles/Home.css";

export function Home() {
  const [nasaPics, setNasaPics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ⬅️ pentru navigare programatică

  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY || "DEMO_KEY";


  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=5`)
      .then((res) => res.json())
      .then((data) => {
        const picsOnly = data.filter((item) => item.media_type === "image");
        setNasaPics(picsOnly);
        setLoading(false);
      })
      .catch((err) => {
        console.error("NASA API fetch error:", err);
        setLoading(false);
      });
  }, [NASA_API_KEY]);

  return (
    <main className="home-container">
      <div className="banner-container">
        <video
        src="/banner.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="home-banner"
        />

      </div>

      <h1>Welcome to Stargazer ✨</h1>
      <p>Explore the wonders of the universe from your screen</p>

      <button
        className="explore-button"
        onClick={() => navigate("/explore")} // ⬅️ mergem la pagina Explore
      >
        Explore Now
      </button>

      <section className="nasa-gallery">
        {loading ? (
          <p>Loading cosmic beauties... 🚀✨</p>
        ) : (
          nasaPics.map((pic) => (
            <div key={pic.url} className="nasa-pic-container">
              <img src={pic.url} alt={pic.title} className="nasa-pic" />
              <p className="pic-title">{pic.title}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
