'use client';

import React from 'react'
import { Typography } from '@/components/Typography'
import { AnimatedContainer } from '@/components/AnimatedContainer'

interface TitleDetailPageProps {
  titleID: string
}

const TitleDetailPage = ({ titleID }: TitleDetailPageProps) => {
  // Mock data for demonstration - in real app this would come from API
  const mockTitle = {
    id: titleID,
    title: 'The Great Adventure',
    category: 'Fantasy',
    rating: 4.5,
    description: 'An epic journey through mystical lands filled with wonder and danger. Follow our hero as they discover ancient secrets and face incredible challenges.',
    author: 'John Smith',
    publishDate: '2024-01-15',
    chapters: 24,
    status: 'Ongoing',
    tags: ['Adventure', 'Fantasy', 'Magic', 'Quest']
  }

  return (
    <AnimatedContainer className="pt-20">
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <Typography variant="overline" weight="medium" className="text-zinc-400 mb-2">
              {mockTitle.category} • ID: {mockTitle.id}
            </Typography>
            <Typography variant="h1" weight="bold" className="mb-4">
              {mockTitle.title}
            </Typography>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <Typography variant="body" weight="medium">
                  {mockTitle.rating}
                </Typography>
              </div>
              <Typography variant="body-sm" weight="normal" className="text-zinc-400">
                by {mockTitle.author}
              </Typography>
              <Typography variant="body-sm" weight="normal" className="text-zinc-400">
                Published {mockTitle.publishDate}
              </Typography>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <section>
                <Typography variant="h2" weight="semibold" className="mb-4">
                  Description
                </Typography>
                <Typography variant="body-lg" weight="normal" className="leading-relaxed">
                  {mockTitle.description}
                </Typography>
              </section>

              <section>
                <Typography variant="h2" weight="semibold" className="mb-4">
                  Chapters
                </Typography>
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Typography variant="body" weight="medium">
                      Total Chapters: {mockTitle.chapters}
                    </Typography>
                    <Typography variant="body-sm" weight="normal" className="text-zinc-400">
                      Status: {mockTitle.status}
                    </Typography>
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="flex justify-between items-center p-2 hover:bg-zinc-800 rounded cursor-pointer">
                        <Typography variant="body-sm" weight="normal">
                          Chapter {i + 1}: The Beginning
                        </Typography>
                        <Typography variant="caption" weight="normal" className="text-zinc-400">
                          Read
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <section>
                <Typography variant="h3" weight="semibold" className="mb-4">
                  Tags
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {mockTitle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full"
                    >
                      <Typography variant="caption" weight="medium">
                        {tag}
                      </Typography>
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <Typography variant="h3" weight="semibold" className="mb-4">
                  Actions
                </Typography>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <Typography variant="body" weight="medium">
                      Start Reading
                    </Typography>
                  </button>
                  <button className="w-full px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                    <Typography variant="body" weight="medium">
                      Add to Library
                    </Typography>
                  </button>
                  <button className="w-full px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                    <Typography variant="body" weight="medium">
                      Share
                    </Typography>
                  </button>
                </div>
              </section>

              <section>
                <Typography variant="h3" weight="semibold" className="mb-4">
                  Statistics
                </Typography>
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 space-y-3">
                  <div className="flex justify-between">
                    <Typography variant="body-sm" weight="normal">Views</Typography>
                    <Typography variant="body-sm" weight="medium">12.5K</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="body-sm" weight="normal">Likes</Typography>
                    <Typography variant="body-sm" weight="medium">2.3K</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="body-sm" weight="normal">Comments</Typography>
                    <Typography variant="body-sm" weight="medium">456</Typography>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}

export { TitleDetailPage } 