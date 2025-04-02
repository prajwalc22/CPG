import React from "react";
import MasonryGrid from "@components/gallery/MasonryGrid";
import Button from "@components/common/Button";
import Loader from "@components/common/Loader";

const ProfileGallery = ({ photos, loadMore, hasMore, loading }) => {
  return (
    <div>
      {photos.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl text-text-primary mb-2">No photos yet</h2>
          <p className="text-text-secondary">
            This photographer hasn't uploaded any photos yet.
          </p>
        </div>
      ) : (
        <MasonryGrid
          photos={photos}
          loadMore={loadMore}
          hasMore={hasMore}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ProfileGallery;
