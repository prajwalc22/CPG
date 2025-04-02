import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; // ✅ Corrected Import
import Button from "../components/common/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-accent-primary mb-4">404</h1>
        <h2 className="text-2xl font-medium text-text-primary mb-2">
          Page not found
        </h2>
        <p className="text-text-secondary max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            to="/"
            variant="primary"
            icon={<ArrowLeftIcon className="w-5 h-5" />} // ✅ Fixed Icon
            iconPosition="left"
          >
            Back to Home
          </Button>
          <Button to="/gallery" variant="secondary">
            Browse Gallery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
