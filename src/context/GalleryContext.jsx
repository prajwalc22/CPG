import React, { createContext, useContext, useState, useCallback } from "react";
import { photos as initialPhotos } from "../data/mockData";

// Create context
const GalleryContext = createContext();

// Gallery provider component
export const GalleryProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [filters, setFilters] = useState({
    lighting: [],
    colorTone: [],
    photographer: [],
    orientation: "all",
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to fetch photos (simulated)
  const fetchPhotos = useCallback(
    async (page = 1, pageSize = 12, filterOptions = null) => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const activeFilters = filterOptions || filters;

      // Apply filters (in a real app, this would be done on the server)
      let filteredPhotos = [...initialPhotos];

      if (activeFilters.lighting && activeFilters.lighting.length > 0) {
        // Mock filtering by lighting (in reality would use proper tags)
        filteredPhotos = filteredPhotos.filter((photo) =>
          activeFilters.lighting.some((light) =>
            photo.description?.toLowerCase().includes(light.toLowerCase())
          )
        );
      }

      if (activeFilters.colorTone && activeFilters.colorTone.length > 0) {
        // Mock filtering by color tone
        filteredPhotos = filteredPhotos.filter((photo) =>
          activeFilters.colorTone.some((tone) =>
            photo.description?.toLowerCase().includes(tone.toLowerCase())
          )
        );
      }

      if (activeFilters.orientation && activeFilters.orientation !== "all") {
        // Mock filtering by orientation - in reality would use image dimensions
        const orientationMap = {
          portrait: (photo) => photo.id % 3 === 0, // Just for mock data
          landscape: (photo) => photo.id % 3 === 1,
          square: (photo) => photo.id % 3 === 2,
        };

        filteredPhotos = filteredPhotos.filter(
          orientationMap[activeFilters.orientation]
        );
      }

      // Paginate results
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedPhotos = filteredPhotos.slice(startIndex, endIndex);

      // Update hasMore flag
      if (endIndex >= filteredPhotos.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setLoading(false);

      // Update context state if this is a new search (page 1)
      if (page === 1) {
        setPhotos(paginatedPhotos);
        setCurrentPage(1);
      } else {
        // Otherwise just return the new page
        setCurrentPage(page);
      }

      return paginatedPhotos;
    },
    [filters]
  );

  // Function to reset filters
  const resetFilters = () => {
    setFilters({
      lighting: [],
      colorTone: [],
      photographer: [],
      orientation: "all",
    });
    setCurrentPage(1);
    setHasMore(true);
  };

  // Get single photo by ID
  const getPhotoById = async (id) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Find photo in our mock data
    const photo = initialPhotos.find((p) => p.id === parseInt(id));

    if (!photo) {
      throw new Error("Photo not found");
    }

    return photo;
  };

  // Function to get related photos
  const getRelatedPhotos = async (photoId, limit = 6) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get random photos excluding the current one
    const relatedPhotos = initialPhotos
      .filter((p) => p.id !== parseInt(photoId))
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);

    return relatedPhotos;
  };

  // Context value
  const value = {
    photos,
    setPhotos,
    filters,
    setFilters,
    resetFilters,
    loading,
    setLoading,
    hasMore,
    setHasMore,
    currentPage,
    setCurrentPage,
    fetchPhotos,
    getPhotoById,
    getRelatedPhotos,
  };

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
};

// Custom hook to use gallery context
export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
