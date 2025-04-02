import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  to,
  icon,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  // Define button styles based on variant
  const variantStyles = {
    primary: "bg-accent-primary text-black hover:bg-opacity-90",
    secondary:
      "bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary hover:bg-opacity-10",
    tertiary: "bg-transparent text-text-primary hover:text-accent-primary",
    dark: "bg-surface text-text-primary hover:bg-opacity-90",
    danger: "bg-error text-white hover:bg-opacity-90",
  };

  // Define button sizes
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-6 py-3 text-lg",
  };

  // Combine styles
  const baseStyles =
    "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50 flex items-center justify-center";
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    fullWidth ? "w-full" : ""
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  // Icon rendering
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <span className={`${iconPosition === "left" ? "mr-2" : "ml-2"}`}>
        {icon}
      </span>
    );
  };

  // Render content with appropriate icon position
  const renderContent = () => (
    <>
      {iconPosition === "left" && renderIcon()}
      {children}
      {iconPosition === "right" && renderIcon()}
    </>
  );

  // If 'to' prop is provided, render as a Link component (internal navigation)
  if (to) {
    return (
      <Link to={to} className={styles} {...props}>
        {renderContent()}
      </Link>
    );
  }

  // If 'href' prop is provided, render as an anchor tag (external link)
  if (href) {
    return (
      <a
        href={href}
        className={styles}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  // Otherwise, render as a button
  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
