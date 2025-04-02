import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create context
const UserContext = createContext();

// User provider component
export const UserProvider = ({ children }) => {
  // Store user data in localStorage for persistence
  const [user, setUser] = useLocalStorage("user", {
    isAuthenticated: false,
    id: null,
    name: "",
    username: "",
    avatar: "",
    isPremium: false,
  });

  // Store liked and saved photos
  const [likedPhotos, setLikedPhotos] = useLocalStorage("likedPhotos", []);
  const [savedPhotos, setSavedPhotos] = useLocalStorage("savedPhotos", []);

  // Handle user login
  const login = (userData) => {
    setUser({
      isAuthenticated: true,
      id: userData.id,
      name: userData.name,
      username: userData.username,
      avatar: userData.avatar,
      isPremium: userData.isPremium || false,
    });
  };

  // Handle user logout
  const logout = () => {
    setUser({
      isAuthenticated: false,
      id: null,
      name: "",
      username: "",
      avatar: "",
      isPremium: false,
    });
  };

  // Toggle like status for a photo
  const toggleLike = (photoId) => {
    if (likedPhotos.includes(photoId)) {
      setLikedPhotos(likedPhotos.filter((id) => id !== photoId));
    } else {
      setLikedPhotos([...likedPhotos, photoId]);
    }
  };

  // Toggle save status for a photo
  const toggleSave = (photoId) => {
    if (savedPhotos.includes(photoId)) {
      setSavedPhotos(savedPhotos.filter((id) => id !== photoId));
    } else {
      setSavedPhotos([...savedPhotos, photoId]);
    }
  };

  // Check if a photo is liked
  const isPhotoLiked = (photoId) => {
    return likedPhotos.includes(photoId);
  };

  // Check if a photo is saved
  const isPhotoSaved = (photoId) => {
    return savedPhotos.includes(photoId);
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    likedPhotos,
    savedPhotos,
    toggleLike,
    toggleSave,
    isPhotoLiked,
    isPhotoSaved,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
