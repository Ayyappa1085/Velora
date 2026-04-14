import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./components/WishlistContext";
import { AuthProvider } from "./components/AuthContext";
import { BagProvider } from "./BagContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <WishlistProvider>
        <BagProvider>
          <App />
        </BagProvider>
      </WishlistProvider>
    </AuthProvider>
  </BrowserRouter>
);