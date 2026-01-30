import React from "react";
import Skeleton from "./Skeleton";

const BlogSkeleton = () => {
  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm p-4">
      <Skeleton className="w-full aspect-video rounded-xl mb-4" />
      <Skeleton className="h-8 w-3/4 mb-3" />
      <Skeleton className="h-4 w-1/2 mb-6" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
};

export default BlogSkeleton;
