'use client';

import React from 'react'
import { Typography } from '@/components/Typography'
import { AnimatedContainer } from '@/components/AnimatedContainer'

const TitlesPage = () => {
  // Mock data for demonstration - in real app this would come from API
  const mockTitles = [
    { id: '1', title: 'The Great Adventure', category: 'Fantasy', rating: 4.5 },
    { id: '2', title: 'Mystery Manor', category: 'Mystery', rating: 4.2 },
    { id: '3', title: 'Space Odyssey', category: 'Sci-Fi', rating: 4.8 },
    { id: '4', title: 'Romance in Paris', category: 'Romance', rating: 4.1 },
    { id: '5', title: 'Thriller Night', category: 'Thriller', rating: 4.6 },
    { id: '6', title: 'Comedy Central', category: 'Comedy', rating: 4.3 },
  ]

  return (
    <AnimatedContainer>
      <div className="py-8">
        <div className="max-w-6xl mx-auto">
          <Typography variant="h1" weight="bold" className="mb-8 text-center">
            Browse Titles
          </Typography>
          
          <div className="mb-8">
            <Typography variant="body-lg" weight="normal" className="text-center mb-6">
              Discover amazing content from various categories
            </Typography>
            
            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search titles..."
                  className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500"
                />
              </div>
              <select className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500">
                <option value="">All Categories</option>
                <option value="fantasy">Fantasy</option>
                <option value="mystery">Mystery</option>
                <option value="scifi">Sci-Fi</option>
                <option value="romance">Romance</option>
                <option value="thriller">Thriller</option>
                <option value="comedy">Comedy</option>
              </select>
            </div>
          </div>

          {/* Titles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTitles.map((title) => (
              <div key={title.id} className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 hover:border-zinc-600 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <Typography variant="h4" weight="semibold" className="flex-1">
                    {title.title}
                  </Typography>
                  <div className="flex items-center gap-1 ml-2">
                    <span className="text-yellow-400">★</span>
                    <Typography variant="body-sm" weight="medium">
                      {title.rating}
                    </Typography>
                  </div>
                </div>
                <Typography variant="body-sm" weight="normal" className="text-zinc-400 mb-4">
                  {title.category}
                </Typography>
                <div className="flex justify-between items-center">
                  <Typography variant="caption" weight="normal" className="text-zinc-500">
                    ID: {title.id}
                  </Typography>
                  <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                    <Typography variant="body-sm" weight="medium">
                      View Details
                    </Typography>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
              <Typography variant="body-sm" weight="medium">
                Previous
              </Typography>
            </button>
            <div className="flex gap-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    page === 1 ? 'bg-zinc-700' : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  <Typography variant="body-sm" weight="medium">
                    {page}
                  </Typography>
                </button>
              ))}
            </div>
            <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
              <Typography variant="body-sm" weight="medium">
                Next
              </Typography>
            </button>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  )
}

export { TitlesPage } 