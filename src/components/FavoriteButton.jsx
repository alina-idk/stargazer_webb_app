import React from "react";
import "../styles/FavoriteButton.css";

export function FavoriteButton({ onClick }) {
  return (
    <button
      className="favorite-button"
      onClick={onClick}
      aria-label="Open favorites popup"
      type="button"
    >
      💜 
    </button>
  );
}

