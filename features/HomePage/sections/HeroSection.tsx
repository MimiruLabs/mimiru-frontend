import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Typography } from "@/components/Typography";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowGradient(true), 300); // match animation duration
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.section
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backgroundColor: "rgb(59,130,246)" }} // Tailwind blue-500
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className={`flex flex-col items-center justify-center h-screen text-white transition-colors duration-700 ${
        showGradient ? "bg-gradient-to-r from-blue-500 to-purple-500" : ""
      }`}
    >
      <Container className="text-center">
        <AnimatedContainer className="mb-8">
          <Typography variant="h1" weight="bold" className="mb-4">
            Welcome to Mimiru
          </Typography>
          <Typography variant="h2" weight="semibold" className="mb-6">
            Discover and explore amazing content
          </Typography>
        </AnimatedContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedContainer className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <Typography variant="h3" weight="semibold" className="mb-3">
              Browse Titles
            </Typography>
            <Typography variant="body" weight="normal">
              Explore our collection of titles and find your next favorite
              content.
            </Typography>
          </AnimatedContainer>
          <AnimatedContainer className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <Typography variant="h3" weight="semibold" className="mb-3">
              About Us
            </Typography>
            <Typography variant="body" weight="normal">
              Learn more about Mimiru and our mission to provide quality content.
            </Typography>
          </AnimatedContainer>
          <AnimatedContainer className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <Typography variant="h3" weight="semibold" className="mb-3">
              Get Started
            </Typography>
            <Typography variant="body" weight="normal">
              Ready to dive in? Start exploring our platform today.
            </Typography>
          </AnimatedContainer>
        </div>
      </Container>
    </motion.section>
  );
};

export { HeroSection };
