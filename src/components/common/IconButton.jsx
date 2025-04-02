import React from "react";

const IconButton = ({
  icon,
  size = "md",
  variant = "default",
  rounded = false,
  disabled = false,
  ariaLabel,
  className = "",
  onClick,
  ...props
}) => {
  // Size variants
  const sizeVariants = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  // Icon size variants
  const iconSizeVariants = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Variant styles
  const variantStyles = {
    default:
      "bg-transparent text-text-primary hover:bg-surface focus:bg-surface",
    primary:
      "bg-accent-primary text-black hover:bg-opacity-90 focus:bg-opacity-90",
    secondary:
      "bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary hover:bg-opacity-10",
    dark: "bg-surface text-text-primary hover:bg-opacity-90 focus:bg-opacity-90",
  };

  // Shape styles
  const shapeStyle = rounded ? "rounded-full" : "rounded-md";

  // Combine all styles
  const buttonClasses = `
    inline-flex items-center justify-center
    ${sizeVariants[size]}
    ${variantStyles[variant]}
    ${shapeStyle}
    transition-colors
    focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  // Apply the appropriate icon size
  const iconClasses = iconSizeVariants[size];

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {React.cloneElement(icon, { className: iconClasses })}
    </button>
  );
};

export default IconButton;
