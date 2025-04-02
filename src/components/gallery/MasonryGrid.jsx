import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PhotoCard from "./PhotoCard";
import Loader from "../common/Loader";
import { useInView } from "react-intersection-observer";

const MasonryGrid = ({ photos, loadMore, hasMore, loading }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loadMore, loading]);

  // Divide photos into columns for masonry layout
  const getColumns = () => {
    const columns = [[], [], []]; // Default to 3 columns, adjust for responsiveness
    photos.forEach((photo, index) => {
      const columnIndex = index % columns.length;
      columns[columnIndex].push(photo);
    });
    return columns;
  };

  const columns = getColumns();

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6">
            {column.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PhotoCard photo={photo} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Loading indicator and intersection observer target */}
      <div ref={ref} className="flex justify-center my-8">
        {loading && <Loader />}
        {!hasMore && photos.length > 0 && (
          <p className="text-text-secondary text-sm">No more photos to load</p>
        )}
      </div>
    </div>
  );
};

export default MasonryGrid;
