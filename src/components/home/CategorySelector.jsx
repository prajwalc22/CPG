import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategorySelector = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "low-key", name: "Low Key" },
    { id: "high-key", name: "High Key" },
    { id: "monochrome", name: "Monochrome" },
    { id: "color", name: "Vibrant Color" },
    { id: "cinematic", name: "Cinematic" },
    { id: "moody", name: "Moody" },
    { id: "natural", name: "Natural Light" },
    { id: "studio", name: "Studio" },
  ];

  return (
    <div className="container-custom">
      <div className="relative pb-2 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "text-black"
                  : "text-text-primary hover:text-accent-primary"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {activeCategory === category.id && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-accent-primary rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured collections row */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            title: "Dramatic Portraits",
            image: "/maksim-istomin-jL6guShvbhE-unsplash.jpg",
            path: "/collection/dramatic",
          },
          {
            title: "Moody Lighting",
            image: "/mohammad-hoseini-rad-qJO_1UUqyZo-unsplash.jpg",
            path: "/collection/moody",
          },
          {
            title: "Urban Stories",
            image:
              "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            path: "/collection/urban",
          },
          {
            title: "Cinematic Color",
            image:
              "https://images.unsplash.com/photo-1605405748313-a416a1b84491?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            path: "/collection/color",
          },
        ].map((collection, index) => (
          <Link
            key={index}
            to={collection.path}
            className="group relative overflow-hidden rounded-lg aspect-square"
          >
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white font-medium text-lg">
                {collection.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
