import React, { useState, useRef } from "react";
import { SearchIcon, AdjustmentsIcon, XIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    lighting: [],
    colorTone: [],
    photographer: [],
    orientation: "all",
  });

  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Generate query params from filters
    const queryParams = new URLSearchParams();
    queryParams.append("q", query);

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (!Array.isArray(value) && value !== "all") {
        queryParams.append(key, value);
      }
    });

    navigate(`/search?${queryParams.toString()}`);
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (Array.isArray(newFilters[category])) {
        // For multi-select filters (checkboxes)
        if (newFilters[category].includes(value)) {
          newFilters[category] = newFilters[category].filter(
            (v) => v !== value
          );
        } else {
          newFilters[category] = [...newFilters[category], value];
        }
      } else {
        // For single-select filters (radio buttons)
        newFilters[category] = value;
      }

      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      lighting: [],
      colorTone: [],
      photographer: [],
      orientation: "all",
    });
  };

  return (
    <div className="max-w-2xl w-full mx-auto relative">
      <form onSubmit={handleSearch} className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for cinematic portraits..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-12 rounded-full bg-surface border border-divider text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary focus:outline-none transition-colors"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent-primary transition-colors"
          aria-label="Toggle filters"
        >
          <AdjustmentsIcon className="w-5 h-5" />
        </button>
      </form>

      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-6 bg-surface border border-divider rounded-lg shadow-lg z-10"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-text-primary">Filters</h3>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-accent-primary hover:text-accent-primary/80 transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lighting Style */}
              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-2">
                  Lighting Style
                </h4>
                <div className="space-y-2">
                  {[
                    "Dramatic",
                    "Low-key",
                    "High-key",
                    "Cinematic",
                    "Natural",
                  ].map((style) => (
                    <label key={style} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.lighting.includes(style.toLowerCase())}
                        onChange={() =>
                          handleFilterChange("lighting", style.toLowerCase())
                        }
                        className="rounded border-divider text-accent-primary focus:ring-accent-primary"
                      />
                      <span className="text-text-primary">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Tone */}
              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-2">
                  Color Tone
                </h4>
                <div className="space-y-2">
                  {["Monochrome", "Warm", "Cool", "Vibrant", "Muted"].map(
                    (tone) => (
                      <label key={tone} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.colorTone.includes(
                            tone.toLowerCase()
                          )}
                          onChange={() =>
                            handleFilterChange("colorTone", tone.toLowerCase())
                          }
                          className="rounded border-divider text-accent-primary focus:ring-accent-primary"
                        />
                        <span className="text-text-primary">{tone}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Orientation */}
              <div>
                <h4 className="text-sm font-medium text-text-secondary mb-2">
                  Orientation
                </h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Orientations" },
                    { value: "portrait", label: "Portrait" },
                    { value: "landscape", label: "Landscape" },
                    { value: "square", label: "Square" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="radio"
                        checked={filters.orientation === option.value}
                        onChange={() =>
                          handleFilterChange("orientation", option.value)
                        }
                        className="rounded-full border-divider text-accent-primary focus:ring-accent-primary"
                      />
                      <span className="text-text-primary">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 rounded-md bg-accent-primary text-black font-medium hover:bg-opacity-90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
