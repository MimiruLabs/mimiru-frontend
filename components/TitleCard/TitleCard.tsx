"use client";
import React from "react";
import { Typography } from "@/components/Typography";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { motion } from "framer-motion";
import { useNavigation } from "@/hooks/ui";

type TitleCardProps = {
  title: string;
  category: string;
  rating: number;
  href?: string; // Add href for link
};

import type { Variants } from "framer-motion";

const bottomVariants: Variants = {
  initial: {
    y: 0,
    height: 64,
    opacity: 1,
  },
  hover: {
    y: 0,
    height: 120,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const extraInfoVariants: Variants = {
  initial: { opacity: 0, y: 10, pointerEvents: "none", height: 0 },
  hover: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    height: "auto",
    transition: { delay: 0.1, type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const CutCornerBox = () => (
  <svg width="60" height="60" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <path
    d="
      M 300 300
      L 150 300
      A 150 150 0 0 0 300 150
      Z
    "
    fill="currentColor"
  />
</svg>
);


export const TitleCard: React.FC<TitleCardProps> = ({
  title,
  category,
  rating,
  href,
}) => {
  const { navigateWithLoading } = useNavigation();

  const handleClick = () => {
    if (href) {
      // Start loading immediately and navigate after animation delay
      navigateWithLoading(href, 150); // 150ms matches the tap animation
    }
  };

  return (
    <motion.div
      className="relative group min-w-[200px] max-w-[400px] border border-zinc-800 rounded-2xl aspect-[3/4] overflow-hidden cursor-pointer"
      whileHover="hover"
      initial="initial"
      onClick={handleClick}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
      whileTap={{ scale: 0.98 }}
      animate="initial"
      tabIndex={0}
      role="link"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <ImageWithFallback
          src="/"
          alt={title}
          className="object-cover h-full w-full"
          fill
        />
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-zinc-950/90 px-4 py-3 flex flex-col justify-center z-20 rounded-tl-3xl drop-shadow-inherit shadow-red-300"
        variants={bottomVariants}
      >
        <div className="absolute -top-15 right-0 text-zinc-950/90">
          <CutCornerBox />
        </div>
        <div className="flex items-center justify-between flex-nowrap gap-2">
          <Typography variant="h6" className="text-white">
            {title}
          </Typography>
          <Typography variant="body-sm" className="text-zinc-400">
            {rating}
          </Typography>
        </div>
        <motion.div variants={extraInfoVariants}>
          <Typography variant="body-sm" className="text-zinc-400 mt-2">
            {category}
          </Typography>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
