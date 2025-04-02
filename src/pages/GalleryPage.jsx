import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MasonryGrid from "../components/gallery/MasonryGrid";
import SearchBar from "../components/common/SearchBar";
import { useGallery } from "../context/GalleryContext";
import Loader from "../components/common/Loader";

const GalleryPage = ({ featured = false }) => {
  const [searchParams] = useSearchParams();
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { fetchPhotos } = useGallery();

  // Get filter values from URL parameters
  const filterFromParams = {
    lighting: searchParams.getAll("lighting"),
    colorTone: searchParams.getAll("colorTone"),
    photographer: searchParams.getAll("photographer"),
    orientation: searchParams.get("orientation") || "all",
  };

  useEffect(() => {
    // Fetch initial photos when component mounts or filters change
    const loadInitialPhotos = async () => {
      setLoading(true);
      setGalleryPhotos([]);

      try {
        // If on featured page, add a featured filter (in a real app, this would be a backend parameter)
        const additionalFilters = featured ? { featured: true } : {};
        const filters = { ...filterFromParams, ...additionalFilters };

        const fetchedPhotos = await fetchPhotos(1, 12, filters);
        setGalleryPhotos(fetchedPhotos);
        setHasMore(fetchedPhotos.length === 12);
      } catch (error) {
        console.error("Failed to load gallery photos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialPhotos();
  }, [fetchPhotos, featured, searchParams]);

  const loadMorePhotos = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const currentPage = Math.ceil(galleryPhotos.length / 12) + 1;
      const additionalFilters = featured ? { featured: true } : {};
      const filters = { ...filterFromParams, ...additionalFilters };

      const newPhotos = await fetchPhotos(currentPage, 12, filters);

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setGalleryPhotos((prev) => [...prev, ...newPhotos]);
        setHasMore(newPhotos.length === 12);
      }
    } catch (error) {
      console.error("Failed to load more photos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-medium mb-6">
          {featured ? "Featured Photography" : "Cinematic Portrait Gallery"}
        </h1>

        <div className="max-w-3xl mx-auto mb-10">
          <SearchBar />
        </div>

        {loading && galleryPhotos.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="lg" />
          </div>
        ) : galleryPhotos.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl text-text-primary mb-2">No photos found</h2>
            <p className="text-text-secondary">
              Try adjusting your search filters
            </p>
          </div>
        ) : (
          <MasonryGrid
            photos={galleryPhotos}
            loadMore={loadMorePhotos}
            hasMore={hasMore}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
