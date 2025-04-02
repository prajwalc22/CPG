import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { GalleryProvider } from "./context/GalleryContext";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <GalleryProvider>
        <div className="bg-background text-text-primary min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route
                path="/gallery/featured"
                element={<GalleryPage featured />}
              />
              <Route path="/photo/:id" element={<PhotoDetailPage />} />
              <Route path="/photographer/:username" element={<ProfilePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GalleryProvider>
    </UserProvider>
  );
};

export default App;
