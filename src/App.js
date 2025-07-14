import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Gallery } from "./pages/Gallery";
import { SkyToday } from "./pages/SkyToday";
import { Facts } from "./pages/Facts";
import { Calendar } from "./pages/Calendar";
import { NotFound } from "./pages/NotFound";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FavoritesPopup } from "./components/FavoritesPopup";

export default function App() {
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openFavorites = () => setIsFavOpen(true);
  const closeFavorites = () => setIsFavOpen(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header showFavoritesButton={true} onFavoritesClick={openFavorites} />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/explore",
      element: (
        <>
          <Header showFavoritesButton={true} onFavoritesClick={openFavorites} />
          <Explore />
          <Footer />
        </>
      ),
    },
    {
      path: "/gallery",
      element: (
        <>
          <Header showFavoritesButton={true} onFavoritesClick={openFavorites} />
          <Gallery />
          <Footer />
        </>
      ),
    },
    {
      path: "/sky-today",
      element: (
        <>
          <Header showFavoritesButton={true} onFavoritesClick={openFavorites} />
          <SkyToday />
          <Footer />
        </>
      ),
    },
    {
      path: "/facts",
      element: (
        <>
          <Header showFavoritesButton={true} onFavoritesClick={openFavorites} />
          <Facts />
          <Footer />
        </>
      ),
    },
    {
      path: "/calendar",
      element: (
        <>
          <Header showFavoritesButton={true} onFavoritesClick={openFavorites} />
          <Calendar />
          <Footer />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <NotFound />
          <Footer />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <FavoritesPopup isOpen={isFavOpen} onClose={closeFavorites} />
    </>
  );
}
