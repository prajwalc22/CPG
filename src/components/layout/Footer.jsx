import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaGithub,
  FaHeart,
} from "react-icons/fa";
import Logo from "../common/Logo";

const Footer = () => {
  const footerLinks = {
    Explore: [
      { name: "Latest Photos", url: "/gallery" },
      { name: "Featured Artists", url: "/featured-artists" },
      { name: "Popular Categories", url: "/categories" },
      { name: "Collections", url: "/collections" },
    ],
    Company: [
      { name: "About Us", url: "/about" },
      { name: "Careers", url: "/careers" },
      { name: "Press", url: "/press" },
      { name: "Contact", url: "/contact" },
    ],
    Resources: [
      { name: "Help Center", url: "/help" },
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" },
      { name: "Cookie Policy", url: "/cookies" },
    ],
  };

  const socialIcons = {
    instagram: <FaInstagram className="h-6 w-6" />,
    twitter: <FaTwitter className="h-6 w-6" />,
    github: <FaGithub className="h-6 w-6" />,
    pinterest: <FaPinterest className="h-6 w-6" />,
  };

  return (
    <footer className="bg-surface border-t border-divider">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-text-secondary text-sm">
              A premium platform showcasing cinematic portrait photography with
              a focus on dramatic lighting, rich textures, and storytelling
              depth.
            </p>
            <div className="mt-6 flex space-x-4">
              {/* Social Media Icons */}
              {Object.entries(socialIcons).map(([name, Icon]) => (
                <a
                  key={name}
                  href={`https://${name}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                  aria-label={`Follow on ${name}`}
                >
                  {Icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-medium text-text-primary mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.url}
                      className="text-text-secondary hover:text-accent-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-divider flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Cinematic Portrait Gallery. All rights
            reserved.
          </p>
          <p className="text-text-secondary text-sm mt-4 md:mt-0">
            Built by{" "}
            <a
              href="mailto:prajwalc22@example.com"
              className="text-accent-primary hover:underline flex items-center space-x-1"
            >
              <span>Pajwal</span>
              <FaHeart className="text-accent-primary h-4 w-4" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
