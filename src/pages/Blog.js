import { useState, useEffect } from "react";
import React from "react";
import client from "../client";
import { Link } from "react-router-dom";
import BlogSkeleton from "../components/BlogSkeleton";
import { motion, AnimatePresence } from "framer-motion";

const POSTS_PER_PAGE = 10;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    // Fetch total count for pagination
    client.fetch(`count(*[_type == "post"])`).then(setTotalPosts);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const start = page * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    client
      .fetch(
        `*[_type=="post"] | order(publishedAt desc) [${start}...${end}] {
          title,
          slug,
          body,
          publishedAt,
          mainImage{
            asset->{
              _id,
              url
            },
            alt
          }
        }`,
      )
      .then((data) => {
        if (isMounted) {
          setPosts(data);
          setLoading(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page]);

  const hasNextPage = (page + 1) * POSTS_PER_PAGE < totalPosts;
  const hasPrevPage = page > 0;

  return (
    <section className="min-h-screen py-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter italic">
          THE <span className="gradient-text">GARAGE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Exploring the world's most iconic machines. Page {page + 1} of{" "}
          {Math.ceil(totalPosts / POSTS_PER_PAGE) || 1}.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((n) => (
                <motion.div
                  key={`skeleton-${n}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <BlogSkeleton />
                </motion.div>
              ))
            : posts.map((post, index) => (
                <motion.article
                  key={post.slug?.current || `post-${index}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-morphism rounded-2xl overflow-hidden car-card-hover border border-white/5"
                >
                  <div className="relative group overflow-hidden">
                    {post.mainImage && post.mainImage.asset ? (
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.title}
                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-600">
                          No Image Available
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm font-medium">
                        Read Article
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-8 h-[2px] bg-red-500"></span>
                      <span className="text-xs uppercase tracking-widest text-red-500 font-bold">
                        Featured
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold mb-4 leading-tight group-hover:text-red-500 transition-colors">
                      {post.title}
                    </h4>

                    <div className="flex justify-between items-center mt-6">
                      {post.slug?.current ? (
                        <Link
                          to={`/blog/${post.slug.current}`}
                          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-red-500 transition-colors"
                        >
                          View Details
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      ) : (
                        <span className="text-gray-600 text-xs italic">
                          Coming Soon
                        </span>
                      )}

                      {post.publishedAt && (
                        <span className="text-gray-500 text-xs">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {!loading && totalPosts > POSTS_PER_PAGE && (
        <div className="mt-20 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!hasPrevPage}
            className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${
              hasPrevPage
                ? "bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600"
                : "opacity-20 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[...Array(Math.ceil(totalPosts / POSTS_PER_PAGE))].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-10 h-10 rounded-full font-bold transition-all ${
                  page === i
                    ? "bg-red-600 scale-110"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNextPage}
            className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${
              hasNextPage
                ? "bg-red-600 hover:bg-red-700"
                : "opacity-20 cursor-not-allowed border border-white/10"
            }`}
          >
            Next Page
          </button>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl text-gray-500">
            No cars found in the collection.
          </h3>
        </div>
      )}
    </section>
  );
}
