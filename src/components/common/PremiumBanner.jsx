import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  SparklesIcon,
  ChartBarSquareIcon,
  StarIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const PremiumBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-r from-surface to-accent-secondary/20 border border-divider rounded-lg shadow-xl my-8 mx-auto max-w-5xl"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close banner"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          <div className="relative px-6 py-8 md:flex items-center justify-between gap-6">
            <div className="md:w-3/5">
              <div className="flex items-center gap-2 mb-3">
                <SparklesIcon className="w-5 h-5 text-accent-primary" />
                <span className="text-accent-primary font-medium text-sm uppercase tracking-wider">
                  For Photographers
                </span>
              </div>

              <h3 className="text-2xl font-medium text-text-primary mb-3">
                Unlock Premium Features for Your Portfolio
              </h3>

              <p className="text-text-secondary mb-5">
                Showcase your work to a wider audience, gain valuable insights
                with analytics, and sell your prints directly through your
                profile.
              </p>

              <div className="flex flex-wrap gap-4 mb-5">
                <div className="flex items-center gap-1.5">
                  <ChartBarSquareIcon className="w-4 h-4 text-accent-primary" />
                  <span className="text-text-primary text-sm">
                    Advanced Analytics
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <StarIcon className="w-4 h-4 text-accent-primary" />
                  <span className="text-text-primary text-sm">
                    Priority in Search
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckBadgeIcon className="w-4 h-4 text-accent-primary" />
                  <span className="text-text-primary text-sm">
                    Verified Profile
                  </span>
                </div>
              </div>

              <button className="px-5 py-2.5 rounded-md bg-accent-primary text-black font-medium hover:bg-opacity-90 transition-colors">
                Upgrade to Premium
              </button>
            </div>

            <div className="hidden md:block md:w-2/5">
              <img
                src="/path/to/premium-illustration.png"
                alt="Premium features illustration"
                className="w-full max-h-56 object-contain"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumBanner;
