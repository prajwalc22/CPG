import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import SearchBar from "../common/SearchBar";
import Logo from "../common/Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Featured", path: "/gallery/featured" },
    { name: "Photographers", path: "/photographers" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}

          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-accent-primary ${
                  location.pathname === item.path
                    ? "text-accent-primary"
                    : "text-text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar className="w-64" />
            <Link
              to="/login"
              className="text-sm font-medium text-text-primary hover:text-accent-primary transition-colors"
            >
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary">
              Join
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-4 py-3 space-y-1 bg-surface border-t border-divider">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block py-2 text-base font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-accent-primary"
                  : "text-text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="py-3">
            <SearchBar className="w-full" />
          </div>
          <div className="pt-4 pb-3 border-t border-divider flex flex-col space-y-3">
            <Link
              to="/login"
              className="text-center py-2 text-text-primary font-medium"
            >
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary text-center">
              Join
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
