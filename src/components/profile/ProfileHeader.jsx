import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPinIcon,
  GlobeAltIcon,
  UserPlusIcon,
  CameraIcon,
} from "@heroicons/react/24/solid"; // ✅ Corrected imports

const ProfileHeader = ({ profile }) => {
  return (
    <section className="relative">
      {/* Cover photo */}
      <div className="relative h-60 md:h-80 w-full overflow-hidden">
        <img
          src={profile.coverPhoto}
          alt={`Cover for ${profile.name}`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
          {/* Profile picture */}
          <motion.div
            className="w-40 h-40 rounded-full border-4 border-background overflow-hidden shadow-xl bg-surface"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={profile.avatar}
              alt={profile.name}
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
                  {profile.name}
                </h1>
                <p className="text-accent-primary text-lg">
                  @{profile.username}
                </p>
              </div>

              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-md bg-accent-primary text-black font-medium hover:bg-opacity-80 transition-colors">
                  <UserPlusIcon className="w-5 h-5 inline mr-2" />
                  <span>Follow</span>
                </button>
                <button className="px-5 py-2.5 rounded-md border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-black transition-colors">
                  Contact
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-text-secondary">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-1.5">
                  <GlobeAltIcon className="w-4 h-4" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-primary transition-colors"
                  >
                    {(() => {
                      try {
                        return new URL(profile.website).hostname;
                      } catch {
                        return profile.website;
                      }
                    })()}
                  </a>
                </div>
              )}
              {profile.camera && (
                <div className="flex items-center gap-1.5">
                  <CameraIcon className="w-4 h-4" />
                  <span>{profile.camera}</span>
                </div>
              )}
            </div>

            <p className="mt-4 text-text-primary max-w-3xl">{profile.bio}</p>

            <div className="mt-6 flex gap-6">
              <div>
                <span className="text-text-primary font-medium">
                  {profile.stats.photos.toLocaleString()}
                </span>
                <span className="text-text-secondary ml-1">Photos</span>
              </div>
              <div>
                <span className="text-text-primary font-medium">
                  {profile.stats.followers.toLocaleString()}
                </span>
                <span className="text-text-secondary ml-1">Followers</span>
              </div>
              <div>
                <span className="text-text-primary font-medium">
                  {profile.stats.following.toLocaleString()}
                </span>
                <span className="text-text-secondary ml-1">Following</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Profile navigation */}
      <div className="border-b border-divider mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex">
            {["Gallery", "Collections", "About", "Gear"].map((item, index) => (
              <Link
                key={index}
                to={`/${profile.username}/${item.toLowerCase()}`}
                className={`px-5 py-4 text-sm font-medium ${
                  index === 0
                    ? "text-accent-primary border-b-2 border-accent-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
