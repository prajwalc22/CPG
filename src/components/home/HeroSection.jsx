import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/outline";
import SearchBar from "../common/SearchBar";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/tobias-reich-c9IVZkMmYp8-unsplash.jpg"
          alt="Cinematic portrait"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20"></div>
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Discover Extraordinary{" "}
            <span className="text-accent-primary">Cinematic Portraits</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            A premium showcase of striking portrait photography with dramatic
            lighting, rich textures, and powerful storytelling.
          </motion.p>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <SearchBar />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <Link to="/gallery" className="btn-primary">
              Explore Gallery
            </Link>
            <Link
              to="/photographers"
              className="btn-secondary flex items-center"
            >
              <span>Featured Photographers</span>
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Credits */}
      {/* <div className="absolute bottom-6 right-6 z-10">
        <p className="text-sm text-text-secondary">
          Photo by{" "}
          <a href="#" className="text-accent-primary hover:underline">
            Sarah Williams
          </a>
        </p>
      </div> */}
    </section>
  );
};

export default HeroSection;
