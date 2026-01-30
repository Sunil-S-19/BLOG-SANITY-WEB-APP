import React from "react";

const Skeleton = ({ className }) => {
  return (
    <div
      className={`animate-pulse bg-gray-700/50 rounded-lg ${className}`}
    ></div>
  );
};

export default Skeleton;
