"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";


interface Product {
  title: string;
  subtitle: string;
  cta: string;
  image: string | StaticImageData;
  color: string;
  hoverColor: string;
}

const products: Product[] = [
  {
    title: "ANYTIME",
    subtitle: "VIDEO CHAT",
    cta: "SING ALONG",
    image: "/images/logo.png",
    color: "from-yellow-400 to-orange-500",
    hoverColor: "from-yellow-500 to-orange-600",
  },
  {
    title: "WATCH",
    subtitle: "VIDEOS",
    cta: "PIPELINE",
    image: "/images/hg-pipeline.png",
    color: "from-green-400 to-blue-500",
    hoverColor: "from-green-500 to-blue-600",
  },
  {
    title: "START",
    subtitle: "MEETUPS",
    cta: "SCROLL PAGES",
    image: "/images/hg-radio.png",
    color: "from-purple-400 to-pink-500",
    hoverColor: "from-purple-500 to-pink-600",
  },
  {
    title: "SUBMIT",
    subtitle: "MUSIC",
    cta: "HQ GLOBALLY",
    image: "/images/hg-sing-along.png",
    color: "from-red-400 to-yellow-500",
    hoverColor: "from-red-500 to-yellow-600",
  },
];

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isHovered ? product.hoverColor : product.color
        } transition-all duration-300`}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white z-10">
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 transform group-hover:scale-110"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">{product.title}</h2>
          <p className="text-2xl font-light">{product.subtitle}</p>
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300"
              >
                {product.cta}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="20"
          cy="20"
          r="10"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M40 20 Q 100 50, 160 20 T 280 20"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};

export default function CreativeProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const showcaseRef = useRef(null);
  const isInView = useInView(showcaseRef, { once: true });

  return (
    <div
      className="h-full bg-gray-900 py-16 px-4 sm:px-6 lg:px-8"
      ref={showcaseRef}
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Discover Our Products
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} index={index} />
        ))}
      </div>
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`bg-gradient-to-br ${selectedProduct.color} p-8 rounded-2xl max-w-2xl w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-4xl font-bold mb-4 text-white">
                {selectedProduct.title}
              </h2>
              <p className="text-xl mb-6 text-white">
                {selectedProduct.subtitle}
              </p>
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={400}
                height={300}
                objectFit="cover"
                className="rounded-lg mb-6"
              />
              <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300">
                {selectedProduct.cta}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
