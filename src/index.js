import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FavoriteProvider } from "./context/FavoriteContext"; // importă providerul

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavoriteProvider>
    <App />
  </FavoriteProvider>
);
