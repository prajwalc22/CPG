import React from "react";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  rounded = false,
  className = "",
}) => {
  // Variant styles
  const variantStyles = {
    default: "bg-surface text-text-secondary border border-divider",
    primary:
      "bg-accent-primary bg-opacity-10 text-accent-primary border border-accent-primary border-opacity-30",
    success:
      "bg-success bg-opacity-10 text-success border border-success border-opacity-30",
    error:
      "bg-error bg-opacity-10 text-error border border-error border-opacity-30",
    neutral:
      "bg-text-secondary bg-opacity-10 text-text-secondary border border-text-secondary border-opacity-30",
  };

  // Size styles
  const sizeStyles = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-3 py-1",
  };

  // Rounded styles
  const radiusStyle = rounded ? "rounded-full" : "rounded-md";

  return (
    <span
      className={`inline-flex items-center ${variantStyles[variant]} ${sizeStyles[size]} ${radiusStyle} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
