import React, { useState, useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedPhotographer from "../components/home/FeaturedPhotographer";
import MasonryGrid from "../components/gallery/MasonryGrid";
import PremiumBanner from "../components/common/PremiumBanner";
import CategorySelector from "../components/home/CategorySelector";
import { photos, featuredPhotographer } from "../data/mockData";
import useLazyLoading from "../hooks/useLazyLoading";

const HomePage = () => {
  useLazyLoading(); // Enable lazy loading globally

  const [homepagePhotos, setHomepagePhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Simulate API call with a delay
    const fetchInitialPhotos = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHomepagePhotos(photos.slice(0, 9));
      setLoading(false);
    };

    fetchInitialPhotos();
  }, []);

  const loadMorePhotos = async () => {
    if (loading || !hasMore) return; // Prevent multiple calls

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentLength = homepagePhotos.length;
    const morePhotos = photos.slice(currentLength, currentLength + 6);

    if (morePhotos.length === 0) {
      setHasMore(false);
    } else {
      setHomepagePhotos((prev) => [...prev, ...morePhotos]);
    }

    setLoading(false);
  };

  return (
    <div>
      <HeroSection />

      <div className="py-8 md:py-12">
        <CategorySelector />
      </div>

      <FeaturedPhotographer photographer={featuredPhotographer} />

      <div className="py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-medium mb-8">
            Latest Cinematic Portraits
          </h2>

          <MasonryGrid
            photos={homepagePhotos}
            loadMore={loadMorePhotos}
            hasMore={hasMore}
            loading={loading}
          />
        </div>
      </div>

      <PremiumBanner />
    </div>
  );
};

export default HomePage;
