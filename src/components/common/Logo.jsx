import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ variant = "default", className = "" }) => {
  const variantStyles = {
    default: "text-2xl",
    small: "text-xl",
    large: "text-3xl",
  };

  const textColorClasses =
    variant === "inverted" ? "text-black" : "text-text-primary";

  const accentColorClasses =
    variant === "inverted" ? "text-surface" : "text-accent-primary";

  return (
    <Link
      to="/"
      className={`inline-flex items-center font-heading ${className}`}
    >
      <span
        className={`${accentColorClasses} ${variantStyles[variant]} font-bold mr-1`}
      >
        C
      </span>
      <span
        className={`${textColorClasses} ${
          variant === "small" ? "text-lg" : "text-xl"
        } tracking-tight`}
      >
        Portrait Gallery
      </span>
    </Link>
  );
};

export default Logo;
