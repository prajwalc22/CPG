import { useRef, useEffect, useCallback } from "react";

const useLazyLoading = (selector = ".lazy") => {
  const observer = useRef(null);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-src");
        if (src) {
          img.src = src;
          img.classList.remove("lazy"); // Remove lazy class
          img.classList.add("opacity-100", "blur-0"); // Smooth transition
        }
        observer.current.unobserve(img);
      }
    });
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "100px", // Load slightly before appearing
      threshold: 0.1,
    });

    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => observer.current.observe(element));

    return () => observer.current.disconnect();
  }, [selector, handleIntersection]);

  return null;
};

export default useLazyLoading;
