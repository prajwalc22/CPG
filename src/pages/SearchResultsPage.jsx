import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MasonryGrid from "../components/gallery/MasonryGrid";
import SearchBar from "../components/common/SearchBar";
import Loader from "../components/common/Loader";
import Badge from "../components/common/Badge";
import { XCircleIcon } from "@heroicons/react/outline";
import { useGallery } from "../context/GalleryContext";

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { fetchPhotos } = useGallery();

  const query = searchParams.get("q") || "";

  // Get all filters
  const filterParams = {
    lighting: searchParams.getAll("lighting"),
    colorTone: searchParams.getAll("colorTone"),
    photographer: searchParams.getAll("photographer"),
    orientation: searchParams.get("orientation") || "all",
  };

  // Count active filters
  const activeFiltersCount = Object.values(filterParams)
    .flat()
    .filter((f) => f && f !== "all").length;

  useEffect(() => {
    // Fetch search results when query or filters change
    const fetchSearchResults = async () => {
      setLoading(true);
      setResults([]);

      try {
        // Add query to filters
        const searchFilters = { ...filterParams, query };

        const fetchedPhotos = await fetchPhotos(1, 12, searchFilters);
        setResults(fetchedPhotos);
        setHasMore(fetchedPhotos.length === 12);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [fetchPhotos, query, searchParams]);

  const loadMoreResults = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const currentPage = Math.ceil(results.length / 12) + 1;
      const searchFilters = { ...filterParams, query };

      const newPhotos = await fetchPhotos(currentPage, 12, searchFilters);

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setResults((prev) => [...prev, ...newPhotos]);
        setHasMore(newPhotos.length === 12);
      }
    } catch (error) {
      console.error("Failed to load more results:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFilter = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (key === "orientation") {
      newSearchParams.delete(key);
    } else {
      // Get all values for this key
      const values = newSearchParams.getAll(key);

      // Remove all instances of this key
      newSearchParams.delete(key);

      // Add back all values except the one to remove
      values.forEach((v) => {
        if (v !== value) {
          newSearchParams.append(key, v);
        }
      });
    }

    setSearchParams(newSearchParams);
  };

  const clearAllFilters = () => {
    const newSearchParams = new URLSearchParams();
    if (query) {
      newSearchParams.set("q", query);
    }
    setSearchParams(newSearchParams);
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl md:text-4xl font-medium mb-6">
        {query ? `Search Results for "${query}"` : "Search Results"}
      </h1>

      <div className="max-w-3xl mx-auto mb-10">
        <SearchBar />
      </div>

      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Active Filters</h2>
            <button
              onClick={clearAllFilters}
              className="text-sm text-accent-primary hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterParams.lighting.map((light) => (
              <Badge
                key={`lighting-${light}`}
                variant="primary"
                className="flex items-center gap-1"
              >
                <span>Lighting: {light}</span>
                <button onClick={() => removeFilter("lighting", light)}>
                  <XIcon className="w-3 h-3" />
                </button>
              </Badge>
            ))}

            {filterParams.colorTone.map((tone) => (
              <Badge
                key={`tone-${tone}`}
                variant="primary"
                className="flex items-center gap-1"
              >
                <span>Tone: {tone}</span>
                <button onClick={() => removeFilter("colorTone", tone)}>
                  <XIcon className="w-3 h-3" />
                </button>
              </Badge>
            ))}

            {filterParams.orientation && filterParams.orientation !== "all" && (
              <Badge variant="primary" className="flex items-center gap-1">
                <span>Orientation: {filterParams.orientation}</span>
                <button onClick={() => removeFilter("orientation")}>
                  <XIcon className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Results display */}
      {loading && results.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl text-text-primary mb-2">No results found</h2>
          <p className="text-text-secondary">
            Try adjusting your search query or filters
          </p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-text-secondary">
            {results.length} results found
          </p>
          <MasonryGrid
            photos={results}
            loadMore={loadMoreResults}
            hasMore={hasMore}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
