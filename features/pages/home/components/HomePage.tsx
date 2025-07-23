"use client";

import React from "react";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "./HeroSection";
import { RecommendationSection } from "./RecommendationSection";
import { NewSection } from "./NewSection";
import { MostPopularSection } from "./MostPopularSection";

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