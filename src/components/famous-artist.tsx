"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";


interface Artist {
  id: string;
  name: string;
  image: string | StaticImageData;
  description: string;
}

const artists: Artist[] = [
  {
    id: "1",
    name: "Vincent van Gogh",
    image: "/images/main.png",
    description:
      'Dutch post-impressionist painter known for "The Starry Night" and "Sunflowers".',
  },
  {
    id: "2",
    name: "Frida Kahlo",
    image: "/images/main.png",
    description:
      "Mexican artist famous for her self-portraits and works inspired by nature and Mexican culture.",
  },
  {
    id: "3",
    name: "Pablo Picasso",
    image: "/images/main.png",
    description:
      "Spanish painter, sculptor, and co-founder of the Cubist movement.",
  },
  {
    id: "4",
    name: "Leonardo da Vinci",
    image: "/images/main.png",
    description:
      'Italian Renaissance polymath, painter of the "Mona Lisa" and "The Last Supper".',
  },
  {
    id: "5",
    name: "Georgia O'Keeffe",
    image: "/images/main.png",
    description:
      "American artist known for her paintings of enlarged flowers and New Mexico landscapes.",
  },
  {
    id: "6",
    name: "Claude Monet",
    image: "/images/main.png",
    description:
      'French Impressionist painter famous for his water lily paintings and "Impression, Sunrise".',
  },
  {
    id: "7",
    name: "Andy Warhol",
    image: "/images/main.png",
    description: "American artist and leading figure in the pop art movement.",
  },
  {
    id: "8",
    name: "Salvador Dalí",
    image: "/images/main.png",
    description:
      "Spanish surrealist artist known for his striking and bizarre images.",
  },
];

export default function CreativeFamousArtists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentArtist, setCurrentArtist] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nextArtist = () => {
    setCurrentArtist((prev) => (prev + 1) % filteredArtists.length);
  };

  const prevArtist = () => {
    setCurrentArtist(
      (prev) => (prev - 1 + filteredArtists.length) % filteredArtists.length
    );
  };

  return (
    <section className="py-12 bg-[#1F2226] relative overflow-hidden" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.5 }}
      >
        <Image
          height={250}
          width={250}
          src={"/images/boxes.png"}
          alt="Decorative Dots"
          className="absolute top-20 right-0 z-0 opacity-20"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Discover Famous Artists
          </motion.h1>

          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 rounded-full bg-[#2A2E32] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FCAD06]"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </motion.div>

          {filteredArtists.length > 0 ? (
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80"
                variants={{
                  hidden: { x: -50, opacity: 0 },
                  visible: { x: 0, opacity: 1 },
                }}
              >
                <img
                //@ts-ignore
                  src={filteredArtists[currentArtist].image}
                  alt={filteredArtists[currentArtist].name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
              </motion.div>

              <motion.div
                className="text-center md:text-left md:ml-8"
                variants={{
                  hidden: { x: 50, opacity: 0 },
                  visible: { x: 0, opacity: 1 },
                }}
              >
                <h2 className="text-3xl font-bold mb-4 text-[#FCAD06]">
                  {filteredArtists[currentArtist].name}
                </h2>
                <p className="text-gray-300 mb-6 max-w-md">
                  {filteredArtists[currentArtist].description}
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <button
                    onClick={prevArtist}
                    className="p-2 rounded-full bg-[#FCAD06] text-[#1F2226] hover:bg-[#FFD700] transition-colors duration-300"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextArtist}
                    className="p-2 rounded-full bg-[#FCAD06] text-[#1F2226] hover:bg-[#FFD700] transition-colors duration-300"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <p className="text-center text-gray-400">
              No artists found matching your search.
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
