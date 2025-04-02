import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedPhotographer = ({ photographer }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Featured image */}
          <motion.div
            className="md:w-3/5 relative overflow-hidden rounded-lg shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={photographer.featuredImage}
              alt={`Featured work by ${photographer.name}`}
              className="w-full h-[70vh] object-cover"
            />
          </motion.div>

          {/* Featured photographer info */}
          <motion.div
            className="md:w-2/5 flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="mb-4">
              <span className="text-accent-primary text-sm tracking-wider uppercase font-medium">
                Featured Photographer
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mt-2 text-white">
                {photographer.name}
              </h2>
            </div>

            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              {photographer.bio}
            </p>

            <div className="mt-2 mb-6 flex flex-wrap gap-4">
              {photographer.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-surface rounded-full text-text-secondary border border-divider"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {photographer.previewImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview work by ${photographer.name}`}
                  className="w-full aspect-square object-cover rounded-md hover:opacity-80 transition-opacity"
                />
              ))}
            </div>

            <div className="mt-auto flex gap-4">
              <Link
                to={`/photographer/${photographer.username}`}
                className="px-6 py-3 rounded-md bg-accent-primary text-black font-medium hover:bg-opacity-90 transition-colors"
              >
                View Portfolio
              </Link>
              <Link
                to={`/gallery/featured`}
                className="px-6 py-3 rounded-md bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary hover:bg-opacity-10 transition-colors"
              >
                Explore Featured
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPhotographer;
