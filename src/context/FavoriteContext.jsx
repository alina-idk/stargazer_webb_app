import React, { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Încarcă din localStorage la start, ca să rămână favoritele
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.url === item.url)) return prev; // nu adăuga duplicate
      return [...prev, item];
    });
  };

  const removeFavorite = (url) => {
    setFavorites((prev) => prev.filter((fav) => fav.url !== url));
  };

  const isFavorite = (url) => favorites.some((fav) => fav.url === url);

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}
