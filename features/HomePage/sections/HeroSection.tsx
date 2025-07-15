import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Typography } from "@/components/Typography";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { motion } from "framer-motion";

const SHADOW_GRADIENT = `
  linear-gradient(
    to bottom,
    rgba(18,18,20,0) 0%,
    rgba(18,18,20,0.01) 4%,
    rgba(18,18,20,0.02) 8%,
    rgba(18,18,20,0.03) 12%,
    rgba(18,18,20,0.05) 16%,
    rgba(18,18,20,0.08) 20%,
    rgba(18,18,20,0.12) 25%,
    rgba(18,18,20,0.17) 30%,
    rgba(18,18,20,0.23) 36%,
    rgba(18,18,20,0.30) 44%,
    rgba(18,18,20,0.38) 52%,
    rgba(18,18,20,0.47) 60%,
    rgba(18,18,20,0.57) 70%,
    rgba(18,18,20,0.68) 80%,
    rgba(18,18,20,0.80) 90%,
    #18181b 97%,
    #09090b 100%
  )
`;

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
      className={`relative flex flex-col items-center justify-center h-screen text-white transition-colors duration-700 ${
        showGradient ? "bg-gradient-to-r from-blue-500 to-purple-500" : ""
      }`}
    >
      {/* Shadow at bottom for ultra-smooth transition */}
      <div
        className="absolute bottom-0 left-0 w-full h-36 pointer-events-none"
        style={{
          background: SHADOW_GRADIENT
        }}
      />
      <Container className="text-center">
        <AnimatedContainer className="mb-8">
          <Typography variant="h1" weight="bold" className="mb-4">
            Welcome to Mimiru
          </Typography>
          <Typography variant="h2" weight="semibold" className="mb-6">
            Discover and explore amazing content
          </Typography>
        </AnimatedContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <AnimatedContainer className="group p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl shadow-zinc-950/40 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start relative overflow-hidden">
            <span className="absolute top-6 right-6 text-blue-500 opacity-20 text-6xl pointer-events-none select-none group-hover:opacity-40 transition-opacity duration-300">★</span>
            <Typography variant="h3" weight="bold" className="mb-3 text-blue-400 tracking-tight text-2xl group-hover:text-blue-300 transition-colors">
              Browse Titles
            </Typography>
            <Typography variant="body" weight="normal" className="mb-4 text-zinc-300 text-base leading-relaxed">
              Explore our collection of titles and find your next favorite content.
            </Typography>
            <Typography variant="caption" weight="medium" className="text-xs text-zinc-500 mt-auto italic">
              Curated for you
            </Typography>
          </AnimatedContainer>
          <AnimatedContainer className="group p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl shadow-zinc-950/40 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start relative overflow-hidden">
            <span className="absolute top-6 right-6 text-purple-500 opacity-20 text-6xl pointer-events-none select-none group-hover:opacity-40 transition-opacity duration-300">★</span>
            <Typography variant="h3" weight="bold" className="mb-3 text-purple-400 tracking-tight text-2xl group-hover:text-purple-300 transition-colors">
              About Us
            </Typography>
            <Typography variant="body" weight="normal" className="mb-4 text-zinc-300 text-base leading-relaxed">
              Learn more about Mimiru and our mission to provide quality content.
            </Typography>
            <Typography variant="caption" weight="medium" className="text-xs text-zinc-500 mt-auto italic">
              Our story & values
            </Typography>
          </AnimatedContainer>
          <AnimatedContainer className="group p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl shadow-zinc-950/40 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start relative overflow-hidden">
            <span className="absolute top-6 right-6 text-green-500 opacity-20 text-6xl pointer-events-none select-none group-hover:opacity-40 transition-opacity duration-300">★</span>
            <Typography variant="h3" weight="bold" className="mb-3 text-green-400 tracking-tight text-2xl group-hover:text-green-300 transition-colors">
              Get Started
            </Typography>
            <Typography variant="body" weight="normal" className="mb-4 text-zinc-300 text-base leading-relaxed">
              Ready to dive in? Start exploring our platform today.
            </Typography>
            <Typography variant="caption" weight="medium" className="text-xs text-zinc-500 mt-auto italic">
              Join now
            </Typography>
          </AnimatedContainer>
        </div>
      </Container>
    </motion.section>
  );
};

export { HeroSection };
