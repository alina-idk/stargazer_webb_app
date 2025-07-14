import React, { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoriteContext";
import "../styles/Gallery.css";

export function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY || "DEMO_KEY";

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=15`
        );
        if (!res.ok) throw new Error("Failed to fetch NASA images");
        const data = await res.json();
        const picsOnly = data.filter((item) => item.media_type === "image");
        setImages(picsOnly);
      } catch (err) {
        setError("Oops, something went wrong fetching images 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [NASA_API_KEY]);

  const toggleFavorite = (item) => {
    if (isFavorite(item.url)) {
      removeFavorite(item.url);
    } else {
      addFavorite(item);
    }
  };

  return (
    <main className="gallery-container">
      <h1 className="gallery-title">✨ Cosmic Gallery ✨</h1>

      {loading && <p className="loading-msg">Loading your cosmic beauties... 🚀</p>}
      {error && <p className="error-msg">{error}</p>}

      <section className="gallery-images">
        {images.map((img) => (
          <div key={img.url} className="gallery-card">
            <img src={img.url} alt={img.title} className="gallery-img" />
            <p className="gallery-caption">{img.title}</p>
            <button
              className="fav-toggle-btn"
              onClick={() => toggleFavorite(img)}
              aria-label={isFavorite(img.url) ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite(img.url) ? "💖" : "🤍"}
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
