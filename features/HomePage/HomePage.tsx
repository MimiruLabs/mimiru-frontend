"use client";

import React from "react";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "./sections/HeroSection";
import { RecommendationSection } from "./sections/RecommendationSection";
import { NewSection } from "./sections/NewSection";
import { MostPopularSection } from "./sections/MostPopularSection";

const HomePage = () => {
  return (
    <AnimatedContainer>
      <HeroSection />
      <RecommendationSection />
      <NewSection />
      <MostPopularSection />
    </AnimatedContainer>
  );
};

export { HomePage };