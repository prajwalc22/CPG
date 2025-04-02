import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  UserIcon,
  CogIcon,
  GlobeAltIcon,
  CameraIcon,
  InformationCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon as LocationMarkerIcon } from "@heroicons/react/24/solid";

import MasonryGrid from "../components/gallery/MasonryGrid";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { photographers, photos } from "../data/mockData";
import { useUser } from "../context/UserContext";

const ProfilePage = () => {
  const { username } = useParams();
  const { user: currentUser } = useUser();
  const [photographer, setPhotographer] = useState(null);
  const [photographerPhotos, setPhotographerPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Fetch photographer details and photos
    const fetchProfileData = async () => {
      setLoading(true);

      try {
        // Find photographer by username
        const foundPhotographer = photographers.find(
          (p) => p.username.toLowerCase() === username.toLowerCase()
        );

        if (foundPhotographer) {
          setPhotographer(foundPhotographer);

          // Get photos by photographer
          const photographerPhotos = photos.filter(
            (photo) => photo.photographerId === foundPhotographer.id
          );

          setPhotographerPhotos(photographerPhotos.slice(0, 12));
          setHasMore(photographerPhotos.length > 12);
        }
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();

    // Scroll to top when navigating between profiles
    window.scrollTo(0, 0);
  }, [username]);

  const loadMorePhotos = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get photos by photographer
      const allPhotographerPhotos = photos.filter(
        (photo) => photo.photographerId === photographer.id
      );

      const currentLength = photographerPhotos.length;
      const nextPhotos = allPhotographerPhotos.slice(
        currentLength,
        currentLength + 6
      );

      if (nextPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotographerPhotos((prev) => [...prev, ...nextPhotos]);
        setHasMore(
          currentLength + nextPhotos.length < allPhotographerPhotos.length
        );
      }
    } catch (error) {
      console.error("Failed to load more photos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !photographer) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  if (!photographer) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl mb-4">Photographer not found</h1>
        <p className="text-text-secondary mb-8">
          The photographer you're looking for doesn't exist or has been removed.
        </p>
        <Button to="/gallery" variant="primary">
          Back to Gallery
        </Button>
      </div>
    );
  }

  const isOwnProfile =
    currentUser.isAuthenticated && currentUser.username === username;

  return (
    <div>
      {/* Profile header with cover image */}
      <div className="relative h-60 md:h-80 w-full overflow-hidden">
        <img
          src={photographer.coverPhoto}
          alt={`Cover for ${photographer.name}`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      </div>

      {/* Profile info section */}
      <div className="container-custom relative -mt-24">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
          {/* Profile picture */}
          <motion.div
            className="w-40 h-40 rounded-full border-4 border-background overflow-hidden shadow-xl bg-surface"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={photographer.avatar}
              alt={photographer.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Profile info */}
          <motion.div
            className="flex-1 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-medium text-white">
                  {photographer.name}
                </h1>
                <p className="text-accent-primary text-lg">
                  @{photographer.username}
                </p>
              </div>

              <div className="flex gap-3">
                {isOwnProfile ? (
                  <Button
                    to="/settings"
                    variant="secondary"
                    icon={<CogIcon className="w-5 h-5" />}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      icon={<UserIcon className="w-5 h-5" />}
                    >
                      Follow
                    </Button>
                    <Button variant="secondary">Contact</Button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-text-secondary">
              {photographer.location && (
                <div className="flex items-center gap-1.5">
                  <LocationMarkerIcon className="w-4 h-4" />
                  <span>{photographer.location}</span>
                </div>
              )}
              {photographer.website && (
                <div className="flex items-center gap-1.5">
                  <GlobeAltIcon className="w-4 h-4" />
                  <a
                    href={photographer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-primary transition-colors"
                  >
                    {new URL(photographer.website).hostname}
                  </a>
                </div>
              )}
              {photographer.camera && (
                <div className="flex items-center gap-1.5">
                  <CameraIcon className="w-4 h-4" />
                  <span>{photographer.camera}</span>
                </div>
              )}
            </div>

            <p className="mt-4 text-text-primary max-w-3xl">
              {photographer.bio}
            </p>

            <div className="mt-6 flex gap-6">
              <div>
                <span className="text-text-primary font-medium">
                  {photographer.stats.photos}
                </span>
                <span className="text-text-secondary ml-1">Photos</span>
              </div>
              <div>
                <span className="text-text-primary font-medium">
                  {photographer.stats.followers}
                </span>
                <span className="text-text-secondary ml-1">Followers</span>
              </div>
              <div>
                <span className="text-text-primary font-medium">
                  {photographer.stats.following}
                </span>
                <span className="text-text-secondary ml-1">Following</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="mt-8">
        <div className="container-custom">
          <Tab.Group>
            <Tab.List className="flex space-x-2 border-b border-divider overflow-x-auto hide-scrollbar">
              <Tab
                className={({ selected }) => `
                px-4 py-3 text-sm font-medium focus:outline-none whitespace-nowrap
                ${
                  selected
                    ? "text-accent-primary border-b-2 border-accent-primary"
                    : "text-text-secondary hover:text-text-primary border-b-2 border-transparent"
                }
              `}
              >
                <div className="flex items-center">
                  <PhotoIcon className="w-5 h-5 mr-2" />
                  <span>Gallery</span>
                </div>
              </Tab>

              <Tab
                className={({ selected }) => `
                px-4 py-3 text-sm font-medium focus:outline-none whitespace-nowrap
                ${
                  selected
                    ? "text-accent-primary border-b-2 border-accent-primary"
                    : "text-text-secondary hover:text-text-primary border-b-2 border-transparent"
                }
              `}
              >
                <div className="flex items-center">
                  <CollectionIcon className="w-5 h-5 mr-2" />
                  <span>Collections</span>
                </div>
              </Tab>

              <Tab
                className={({ selected }) => `
                px-4 py-3 text-sm font-medium focus:outline-none whitespace-nowrap
                ${
                  selected
                    ? "text-accent-primary border-b-2 border-accent-primary"
                    : "text-text-secondary hover:text-text-primary border-b-2 border-transparent"
                }
              `}
              >
                <div className="flex items-center">
                  <InformationCircleIcon className="w-5 h-5 mr-2" />
                  <span>About</span>
                </div>
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-8">
              {/* Gallery Panel */}
              <Tab.Panel>
                {photographerPhotos.length === 0 ? (
                  <div className="text-center py-16">
                    <h2 className="text-xl text-text-primary mb-2">
                      No photos yet
                    </h2>
                    <p className="text-text-secondary">
                      This photographer hasn't uploaded any photos yet.
                    </p>
                  </div>
                ) : (
                  <MasonryGrid
                    photos={photographerPhotos}
                    loadMore={loadMorePhotos}
                    hasMore={hasMore}
                    loading={loading}
                  />
                )}
              </Tab.Panel>

              {/* Collections Panel */}
              <Tab.Panel>
                <div className="text-center py-16">
                  <h2 className="text-xl text-text-primary mb-2">
                    No collections yet
                  </h2>
                  <p className="text-text-secondary">
                    This photographer hasn't created any collections yet.
                  </p>
                </div>
              </Tab.Panel>

              {/* About Panel */}
              <Tab.Panel>
                <div className="max-w-3xl">
                  <div className="bg-surface rounded-lg border border-divider p-6 mb-8">
                    <h2 className="text-xl font-medium mb-4">
                      About {photographer.name}
                    </h2>
                    <p className="text-text-primary mb-6">{photographer.bio}</p>

                    <h3 className="text-lg font-medium mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {photographer.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-background rounded-full text-text-secondary text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium mb-3">Gear</h3>
                    <p className="text-text-primary">{photographer.camera}</p>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
