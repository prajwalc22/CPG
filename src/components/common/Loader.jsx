import React from "react";

const Loader = ({ size = "md", color = "accent-primary", className = "" }) => {
  // Size variants
  const sizeVariants = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  // Color variants
  const colorVariants = {
    "accent-primary": "border-accent-primary border-t-transparent",
    "text-primary": "border-text-primary border-t-transparent",
    "text-secondary": "border-text-secondary border-t-transparent",
    white: "border-white border-t-transparent",
  };

  const loaderClasses = `rounded-full animate-spin ${sizeVariants[size]} ${colorVariants[color]} ${className}`;

  return (
    <div className="flex justify-center items-center">
      <div className={loaderClasses}></div>
    </div>
  );
};

export default Loader;
