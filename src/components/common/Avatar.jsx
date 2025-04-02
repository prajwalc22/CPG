import React from "react";

const Avatar = ({
  src,
  alt,
  size = "md",
  variant = "circle",
  status,
  statusPosition = "bottom-right",
  fallback,
  className = "",
}) => {
  // Size variants
  const sizeVariants = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl",
  };

  // Shape variants
  const shapeVariants = {
    circle: "rounded-full",
    square: "rounded-md",
  };

  // Status styles and positions
  const statusColors = {
    online: "bg-success",
    offline: "bg-text-secondary",
    busy: "bg-error",
    away: "bg-amber-400",
  };

  const statusPositions = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  // Calculate status badge size based on avatar size
  const getStatusSize = () => {
    const sizesMap = {
      xs: "w-1.5 h-1.5",
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-3 h-3",
      xl: "w-4 h-4",
      "2xl": "w-5 h-5",
    };
    return sizesMap[size];
  };

  // Function to generate fallback content (initials or default icon)
  const renderFallback = () => {
    if (typeof fallback === "string") {
      // If fallback is a string, use it directly (typically initials)
      return fallback;
    }

    // If fallback is provided as a component, use it
    if (React.isValidElement(fallback)) {
      return fallback;
    }

    // Default fallback is a user icon represented as text
    return alt ? alt.charAt(0).toUpperCase() : "?";
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className={`object-cover ${sizeVariants[size]} ${shapeVariants[variant]} border border-divider`}
        />
      ) : (
        <div
          className={`flex items-center justify-center bg-surface text-text-primary ${sizeVariants[size]} ${shapeVariants[variant]} border border-divider`}
        >
          {renderFallback()}
        </div>
      )}

      {/* Status indicator */}
      {status && (
        <span
          className={`absolute ${statusPositions[statusPosition]} ${
            statusColors[status]
          } ${getStatusSize()} rounded-full border-2 border-background`}
        ></span>
      )}
    </div>
  );
};

export default Avatar;
