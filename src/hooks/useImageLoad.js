import { useState, useEffect } from "react";

const useImageLoad = (url, placeholderUrl) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderUrl || "");

  useEffect(() => {
    if (!url) return;

    const img = new Image();

    img.onload = () => {
      setLoaded(true);
      setCurrentSrc(url);
    };

    img.onerror = () => {
      setError(true);
      if (placeholderUrl) setCurrentSrc(placeholderUrl);
    };

    img.src = url;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url, placeholderUrl]);

  return { loaded, error, currentSrc };
};

export default useImageLoad;
