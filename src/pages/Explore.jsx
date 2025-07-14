import React, { useState } from "react";
import "../styles/Explore.css";
import { useFavorites } from "../context/FavoriteContext";

export function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("information"); // "information" sau "media"
  const [wikiData, setWikiData] = useState(null);
  const [nasaData, setNasaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY || "DEMO_KEY";


  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Fetch Wikipedia Summary
  const fetchWiki = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");
    setWikiData(null);
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!res.ok) throw new Error("Not found on Wiki");
      const data = await res.json();
      setWikiData(data);
    } catch (err) {
      setError("Could not find info on Wikipedia 😢");
    } finally {
      setLoading(false);
    }
  };

  // Fetch NASA Media (random 5 images/videos)
  const fetchNasa = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");
    setNasaData([]);
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=10`
      );
      if (!res.ok) throw new Error("NASA API error");
      const data = await res.json();
      const picsOnly = data.filter(
        (item) => item.media_type === "image" || item.media_type === "video"
      );
      setNasaData(picsOnly);
    } catch (err) {
      setError("Could not fetch NASA media 😢");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (tab) => {
    setActiveTab(tab);
    if (tab === "information") {
      fetchWiki();
    } else {
      fetchNasa();
    }
  };

  const toggleFavorite = (item) => {
    if (isFavorite(item.url)) {
      removeFavorite(item.url);
    } else {
      addFavorite(item);
    }
  };

  return (
    <main className="explore-container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="🔭 Search the stars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(activeTab);
          }}
        />
        <button
          className={`search-btn ${
            activeTab === "information" ? "active" : ""
          }`}
          onClick={() => handleSearch("information")}
        >
          Information
        </button>
        <button
          className={`search-btn ${activeTab === "media" ? "active" : ""}`}
          onClick={() => handleSearch("media")}
        >
          Photos/Videos
        </button>
      </div>

      {loading && <p className="loading">Searching for cosmic wonders... 🌌</p>}
      {error && <p className="error">{error}</p>}

      {activeTab === "information" && wikiData && (
        <section className="wiki-result">
          <h2>{wikiData.title}</h2>
          {wikiData.thumbnail && (
            <img
              src={wikiData.thumbnail.source}
              alt={wikiData.title}
              className="wiki-img"
            />
          )}
          <p>{wikiData.extract}</p>
          <a
            href={wikiData.content_urls.desktop.page}
            target="_blank"
            rel="noreferrer"
            className="wiki-link"
          >
            Read more on Wikipedia
          </a>
        </section>
      )}

      {activeTab === "media" && nasaData.length > 0 && (
        <section className="nasa-results">
          {nasaData.map((item) => (
            <div key={item.url} className="nasa-result-card">
              {item.media_type === "image" ? (
                <img src={item.url} alt={item.title} className="result-img" />
              ) : item.media_type === "video" && item.url.includes("youtube") ? (
                <iframe
                  width="100%"
                  height="150"
                  src={item.url}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="result-img"
                ></iframe>
              ) : item.media_type === "video" ? (
                <video controls className="result-img" preload="metadata">
                  <source src={item.url} type="video/mp4" />
                  Sorry, your browser does not support the video tag.
                </video>
              ) : null}
              <p className="result-title">{item.title}</p>
              <button
                className="fav-toggle-btn"
                onClick={() => toggleFavorite(item)}
                aria-label={
                  isFavorite(item.url)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {isFavorite(item.url) ? "💖" : "🤍"}
              </button>
            </div>
          ))}
        </section>
      )}

      {!loading && !error && !wikiData && !nasaData.length && (
        <p className="search-info">Try searching for something cosmic above! ✨</p>
      )}
    </main>
  );
}
