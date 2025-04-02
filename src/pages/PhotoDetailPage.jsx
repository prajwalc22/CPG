import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  CameraIcon,
  CalendarIcon,
  MapPinIcon, // ✅ Fixed incorrect MapIcon (should be MapPinIcon)
} from "@heroicons/react/24/outline"; // ✅ Corrected import

import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid"; // ✅ Corrected import

import Avatar from "../components/common/Avatar";
import Button from "../components/common/Button";
import IconButton from "../components/common/IconButton";
import Loader from "../components/common/Loader";
import { useGallery } from "../context/GalleryContext";
import { useUser } from "../context/UserContext";

const PhotoDetailPage = () => {
  const { id } = useParams();
  const { getPhotoById, getRelatedPhotos } = useGallery();
  const { isPhotoLiked, isPhotoSaved, toggleLike, toggleSave, user } =
    useUser();

  const [photo, setPhoto] = useState(null);
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch photo details when component mounts or ID changes
    const fetchPhotoDetails = async () => {
      setLoading(true);
      try {
        const photoData = await getPhotoById(id);
        setPhoto(photoData);

        // Fetch related photos
        const related = await getRelatedPhotos(id, 6);
        setRelatedPhotos(related);
      } catch (error) {
        console.error("Failed to load photo details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetails();

    // Scroll to top when navigating between photos
    window.scrollTo(0, 0);
  }, [id, getPhotoById, getRelatedPhotos]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl mb-4">Photo not found</h1>
        <p className="text-text-secondary mb-8">
          The photo you're looking for doesn't exist or has been removed.
        </p>
        <Button to="/gallery" variant="primary">
          Back to Gallery
        </Button>
      </div>
    );
  }

  const isLiked = isPhotoLiked(photo.id);
  const isSaved = isPhotoSaved(photo.id);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-background">
      {/* Hero section with large photo */}
      <div className="bg-surface border-b border-divider">
        <div className="container-custom py-8">
          <div className="max-w-5xl mx-auto">
            <motion.img
              src={photo.highResUrl || photo.url}
              alt={photo.title}
              className="w-full h-auto rounded-lg shadow-image"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>

      {/* Photo details section */}
      <div className="container-custom py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column with photo info */}
            <div className="lg:w-2/3">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-medium text-text-primary">
                  {photo.title}
                </h1>

                <div className="flex space-x-2">
                  <IconButton
                    icon={isLiked ? <HeartIconSolid /> : <HeartIcon />}
                    variant={isLiked ? "primary" : "default"}
                    onClick={() => toggleLike(photo.id)}
                    ariaLabel={isLiked ? "Unlike photo" : "Like photo"}
                  />
                  <IconButton
                    icon={isSaved ? <BookmarkIconSolid /> : <BookmarkIcon />}
                    variant={isSaved ? "primary" : "default"}
                    onClick={() => toggleSave(photo.id)}
                    ariaLabel={isSaved ? "Unsave photo" : "Save photo"}
                  />
                  <IconButton
                    icon={<ShareIcon />}
                    variant="default"
                    onClick={() => {
                      /* Handle share */
                    }}
                    ariaLabel="Share photo"
                  />
                </div>
              </div>

              {/* Photo stats */}
              <div className="flex space-x-4 mt-4 text-text-secondary text-sm">
                <span>{photo.likes} likes</span>
                <span>{photo.saves} saves</span>
              </div>

              {/* Photo description */}
              <p className="mt-6 text-text-primary">{photo.description}</p>

              {/* Photo metadata */}
              <div className="mt-6 flex flex-wrap gap-4 text-text-secondary text-sm">
                {photo.camera && (
                  <div className="flex items-center gap-1">
                    <CameraIcon className="w-4 h-4" />
                    <span>{photo.camera}</span>
                  </div>
                )}
                {photo.location && (
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />{" "}
                    {/* ✅ Fixed incorrect icon */}
                    <span>{photo.location}</span>
                  </div>
                )}
                {photo.date && (
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{formatDate(photo.date)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right column with photographer info */}
            <div className="lg:w-1/3 flex flex-col items-center lg:items-start lg:border-l lg:border-divider lg:pl-8">
              <Avatar
                src={photo.photographerAvatar}
                alt={photo.photographer}
                size="lg"
                className="mb-4"
              />
              <h2 className="text-xl font-medium text-text-primary">
                {photo.photographer}
              </h2>
              <p className="text-text-secondary mb-4">
                @{photo.photographerUsername}
              </p>
              <Button
                to={`/photographer/${photo.photographerUsername}`}
                variant="primary"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailPage;
