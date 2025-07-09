import { Container } from "@/components/Container";
import { Typography } from "@/components/Typography";
import { AnimatedContainer } from "@/components/AnimatedContainer";

const HeroSection = () => (
  <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
    <AnimatedContainer>
        <Container className="text-center">
      <Typography variant="h1" weight="bold" className="mb-6">
        Welcome to Mimiru
      </Typography>
      <Typography variant="body-lg" weight="normal" className="mb-8">
        Discover and explore amazing content
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <Typography variant="h3" weight="semibold" className="mb-3">
            Browse Titles
          </Typography>
          <Typography variant="body" weight="normal">
            Explore our collection of titles and find your next favorite
            content.
          </Typography>
        </div>
        <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <Typography variant="h3" weight="semibold" className="mb-3">
            About Us
          </Typography>
          <Typography variant="body" weight="normal">
            Learn more about Mimiru and our mission to provide quality content.
          </Typography>
        </div>
        <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <Typography variant="h3" weight="semibold" className="mb-3">
            Get Started
          </Typography>
          <Typography variant="body" weight="normal">
            Ready to dive in? Start exploring our platform today.
          </Typography>
        </div>
      </div>
    </Container>
    </AnimatedContainer>
  </section>
);

export { HeroSection };
