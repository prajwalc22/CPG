import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const LightBox = ({
  photo,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(true);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (hasPrev) onPrev();
          break;
        case "ArrowRight":
          if (hasNext) onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  // Reset loading state when photo changes
  useEffect(() => {
    setIsLoading(true);
  }, [photo]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-accent-primary hover:text-black transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          {/* Previous button */}
          {hasPrev && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-accent-primary hover:text-black transition-colors"
              onClick={onPrev}
              aria-label="Previous image"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
          )}

          {/* Main image container */}
          <motion.div
            className="max-w-[90%] max-h-[85vh] relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <img
              src={photo.highResUrl || photo.url}
              alt={photo.title}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              onLoad={() => setIsLoading(false)}
            />

            {/* Photo details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  className="absolute left-0 right-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-medium text-white mb-2">
                    {photo.title}
                  </h2>
                  <p className="text-gray-300 text-lg mb-3">
                    by {photo.photographer}
                  </p>

                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-300">
                    {photo.camera && (
                      <div className="flex items-center gap-1">
                        <CameraIcon className="w-4 h-4" />
                        <span>{photo.camera}</span>
                      </div>
                    )}
                    {photo.location && (
                      <div className="flex items-center gap-1">
                        <MapPinMarkerIcon className="w-4 h-4" />
                        <span>{photo.location}</span>
                      </div>
                    )}
                    {photo.settings && (
                      <div className="flex items-center gap-1">
                        <span className="text-accent-primary">
                          {photo.settings}
                        </span>
                      </div>
                    )}
                  </div>

                  {photo.description && (
                    <p className="mt-3 text-gray-200">{photo.description}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Next button */}
          {hasNext && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-accent-primary hover:text-black transition-colors"
              onClick={onNext}
              aria-label="Next image"
            >
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          )}

          {/* Toggle details button */}
          <button
            className="absolute bottom-6 right-6 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-accent-primary hover:text-black transition-colors"
            onClick={() => setShowDetails(!showDetails)}
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showDetails ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightBox;
