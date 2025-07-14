import React, { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoriteContext";
import "../styles/FavoritesPopup.css";

export function FavoritesPopup({ isOpen, onClose }) {
  const { favorites, removeFavorite } = useFavorites();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  const handleOverlayClick = () => setLightboxItem(null);

  return (
    <>
      {/* LIGHTBOX OVERLAY */}
      {lightboxItem && (
        <div
          className="popup-overlay"
          onClick={handleOverlayClick}
          style={{ zIndex: 10000 }}
        >
          <div
            className="popup-content"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              padding: "15px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setLightboxItem(null)}
              style={{ position: "absolute", top: 10, right: 10 }}
            >
              ✖
            </button>
            {lightboxItem.media_type === "image" ? (
              <img
                src={lightboxItem.url}
                alt={lightboxItem.title}
                style={{ width: "100%", borderRadius: "12px" }}
              />
            ) : (
              <video
                controls
                style={{ width: "100%", borderRadius: "12px" }}
              >
                <source src={lightboxItem.url} type="video/mp4" />
              </video>
            )}
            <p style={{ marginTop: "12px", fontWeight: "bold", color: "#c5c6c7" }}>
              {lightboxItem.title}
            </p>
          </div>
        </div>
      )}

      {/* DESKTOP POPUP */}
      {!isMobile && (
        <div className="popup-overlay" onClick={onClose}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Your Cosmic Favorites 💫</h2>
            {favorites.length === 0 ? (
              <p>You have no favorites yet! Start exploring and saving 💜</p>
            ) : (
              <ul className="favorites-list">
                {favorites.map((item) => (
                  <li key={item.url} className="favorite-item">
                    {item.media_type === "image" ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="fav-img"
                        onClick={() => setLightboxItem(item)}
                        style={{ cursor: "zoom-in" }}
                      />
                    ) : (
                      <video
                        className="fav-img"
                        controls
                        onClick={() => setLightboxItem(item)}
                        style={{ cursor: "zoom-in" }}
                      >
                        <source src={item.url} type="video/mp4" />
                      </video>
                    )}
                    <div className="fav-info">
                      <p>{item.title}</p>
                      <button
                        onClick={() => removeFavorite(item.url)}
                        className="remove-fav-btn"
                        aria-label="Remove favorite"
                      >
                        ✖
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* MOBILE POPUP */}
      {isMobile && (
        <MobileFavoritesPopup
          favorites={favorites}
          removeFavorite={removeFavorite}
          onClose={onClose}
          setLightboxItem={setLightboxItem}
        />
      )}
    </>
  );
}

function MobileFavoritesPopup({ favorites, removeFavorite, onClose, setLightboxItem }) {
  const [position, setPosition] = useState({ bottom: 20, right: 20 });
  const [dragging, setDragging] = useState(false);
  const dragStart = React.useRef({ x: 0, y: 0 });
  const moved = React.useRef(false); // ✨ flag ca să detectăm mișcarea

  const onPointerDown = (e) => {
    moved.current = false;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    // dacă s-a mișcat puțin, setăm moved = true
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      moved.current = true;
    }

    setPosition((pos) => ({
      bottom: Math.max(0, pos.bottom - dy),
      right: Math.max(0, pos.right - dx),
    }));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e) => {
    setDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  const handleImageClick = (item) => {
    if (!moved.current) {
      setLightboxItem(item);
    }
  };

  return (
    <div
      className="favorites-popup-mobile"
      style={{ bottom: position.bottom, right: position.right }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <button
        className="close-btn"
        onClick={onClose}
        aria-label="Close favorites popup"
      >
        ✖
      </button>
      <h4>Favorites 💜</h4>
      {favorites.length === 0 ? (
        <p>No favorites yet! Go add some cosmic stars ✨</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((item) => (
            <li key={item.url} className="favorite-item">
              {item.media_type === "image" ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="fav-img"
                  onClick={() => handleImageClick(item)}
                  style={{ cursor: "zoom-in" }}
                />
              ) : (
                <video
                  className="fav-img"
                  controls
                  onClick={() => handleImageClick(item)}
                  style={{ cursor: "zoom-in" }}
                >
                  <source src={item.url} type="video/mp4" />
                </video>
              )}
              <div className="fav-info">
                <p>{item.title}</p>
                <button
                  className="remove-fav-btn"
                  onClick={() => removeFavorite(item.url)}
                  aria-label={`Remove ${item.title} from favorites`}
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

