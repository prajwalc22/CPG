import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' in React 18+
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import { UserProvider } from "./context/UserContext";
import { GalleryProvider } from "./context/GalleryContext";
// Create a root using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <GalleryProvider>
      <Router>
        <App />
      </Router>
    </GalleryProvider>
  </UserProvider>
);
