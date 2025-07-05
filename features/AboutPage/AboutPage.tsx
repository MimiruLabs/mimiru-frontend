'use client';

import React from 'react'
import { Typography } from '@/components/Typography'
import { AnimatedContainer } from '@/components/AnimatedContainer'

const AboutPage = () => {
  return (
    <AnimatedContainer>
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <Typography variant="h1" weight="bold" className="mb-8 text-center">
            About Mimiru
          </Typography>
          
          <div className="space-y-8">
            <section>
              <Typography variant="h2" weight="semibold" className="mb-4">
                Our Mission
              </Typography>
              <Typography variant="body-lg" weight="normal" className="mb-4">
                Mimiru is dedicated to providing a platform where users can discover, explore, and engage with high-quality content. We believe in the power of storytelling and the importance of accessible, well-curated information.
              </Typography>
              <Typography variant="body" weight="normal">
                Our platform serves as a bridge between creators and audiences, fostering a community built on shared interests and mutual respect.
              </Typography>
            </section>

            <section>
              <Typography variant="h2" weight="semibold" className="mb-4">
                What We Offer
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Typography variant="h4" weight="medium" className="mb-2">
                    Curated Content
                  </Typography>
                  <Typography variant="body-sm" weight="normal">
                    Carefully selected titles and content that meet our quality standards.
                  </Typography>
                </div>
                <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Typography variant="h4" weight="medium" className="mb-2">
                    User Experience
                  </Typography>
                  <Typography variant="body-sm" weight="normal">
                    Intuitive design that makes content discovery effortless and enjoyable.
                  </Typography>
                </div>
                <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Typography variant="h4" weight="medium" className="mb-2">
                    Community
                  </Typography>
                  <Typography variant="body-sm" weight="normal">
                    A space for like-minded individuals to connect and share experiences.
                  </Typography>
                </div>
                <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Typography variant="h4" weight="medium" className="mb-2">
                    Innovation
                  </Typography>
                  <Typography variant="body-sm" weight="normal">
                    Continuously evolving platform with cutting-edge features and technology.
                  </Typography>
                </div>
              </div>
            </section>

            <section>
              <Typography variant="h2" weight="semibold" className="mb-4">
                Our Values
              </Typography>
              <Typography variant="body-lg" weight="normal" className="mb-4">
                We are committed to transparency, quality, and user satisfaction. Every decision we make is guided by our core values of integrity, creativity, and community.
              </Typography>
              <Typography variant="body" weight="normal">
                Join us on this journey as we continue to build a platform that celebrates content, creators, and the communities that bring them together.
              </Typography>
            </section>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}

export { AboutPage } 