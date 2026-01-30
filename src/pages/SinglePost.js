import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import client from "../client.js";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"]{
          title,
          body,
          publishedAt,
          mainImage {
            asset -> {
              _id,
              url
            },
            alt
          },
          gallery[] {
            asset -> {
              _id,
              url
            },
            alt
          },
          "authorName": author->name,
          "authorImage": author->image.asset->url
        }`,
      )
      .then((data) => {
        setSinglePost(data[0]);
        setIsLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.error("Error fetching single post:", error);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            repeatType: "reverse",
          }}
          className="mt-8 text-2xl font-bold tracking-[0.5em] text-red-500"
        >
          IGNITING ENGINES...
        </motion.p>
      </div>
    );
  }

  if (!singlePost) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-black text-center">
        <h2 className="text-4xl font-bold mb-8">POST NOT FOUND</h2>
        <Link to="/blog" className="px-8 py-4 bg-red-600 rounded-lg font-bold">
          BACK TO THE GARAGE
        </Link>
      </div>
    );
  }

  // Combine main image and gallery for the carousel
  const allImages = [
    ...(singlePost.mainImage ? [singlePost.mainImage] : []),
    ...(singlePost.gallery || []),
  ];

  return (
    <article className="min-h-screen bg-black text-gray-200">
      <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden">
        {allImages.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            effect="fade"
            navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full h-full car-swiper"
          >
            {allImages.map(
              (img, idx) =>
                img.asset && (
                  <SwiperSlide key={idx}>
                    <img
                      src={img.asset.url}
                      alt={img.alt || singlePost.title}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ),
            )}
          </Swiper>
        ) : (
          singlePost.mainImage &&
          singlePost.mainImage.asset && (
            <img
              src={singlePost.mainImage.asset.url}
              alt={singlePost.mainImage.alt || singlePost.title}
              className="w-full h-full object-cover"
            />
          )
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto flex flex-col items-start z-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-widest skew-x-[-20deg]">
              Exclusive Post
            </span>
            {singlePost.publishedAt && (
              <span className="text-gray-400 text-sm font-medium">
                {new Date(singlePost.publishedAt).toLocaleDateString(
                  undefined,
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </span>
            )}
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase italic leading-none mb-4 max-w-4xl tracking-tighter">
            {singlePost.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            {singlePost.authorImage ? (
              <img
                src={singlePost.authorImage}
                alt={singlePost.authorName}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/50 shadow-[0_0_15px_rgba(255,59,59,0.3)]"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-900 border-2 border-white/20"></div>
            )}
            <div>
              <p className="text-xs uppercase text-gray-500 font-bold tracking-widest">
                Driven by
              </p>
              <p className="text-white font-bold">
                {singlePost.authorName || "Sunil Surendran"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="block__content prose prose-invert prose-red max-w-none"
        >
          <PortableText value={singlePost.body} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div>
            <h4 className="text-2xl font-bold italic mb-2">
              THANKS FOR TUNING IN.
            </h4>
            <p className="text-gray-500">
              Subscribe for more high-octane content.
            </p>
          </div>
          <Link
            to="/blog"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-red-600 font-pj rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            <span className="relative flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 rotate-180 group-hover:-translate-x-1 transition-transform"
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
              BACK TO THE GARAGE
            </span>
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
