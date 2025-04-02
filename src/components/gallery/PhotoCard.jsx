import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeartIcon, BookmarkIcon } from "@heroicons/react/outline";

const PhotoCard = ({ photo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-md bg-surface"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Link to={`/photo/${photo.id}`}>
        <div className="relative aspect-auto">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Gradient overlay visible on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Photo info overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-medium mb-1 truncate">{photo.title}</h3>
            <p className="text-sm text-gray-300">by {photo.photographer}</p>
          </motion.div>
        </div>
      </Link>

      {/* Action buttons */}
      <motion.div
        className="absolute top-3 right-3 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-accent-primary hover:text-black transition-colors">
          <HeartIcon className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-accent-primary hover:text-black transition-colors">
          <BookmarkIcon className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PhotoCard;
