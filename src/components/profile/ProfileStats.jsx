import React from "react";

const ProfileStats = ({ stats }) => {
  return (
    <div className="mt-6 flex gap-6">
      <div>
        <span className="text-text-primary font-medium">{stats.photos}</span>
        <span className="text-text-secondary ml-1">Photos</span>
      </div>
      <div>
        <span className="text-text-primary font-medium">{stats.followers}</span>
        <span className="text-text-secondary ml-1">Followers</span>
      </div>
      <div>
        <span className="text-text-primary font-medium">{stats.following}</span>
        <span className="text-text-secondary ml-1">Following</span>
      </div>
    </div>
  );
};

export default ProfileStats;
