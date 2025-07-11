"use client";
import React, { useState } from "react";
import { Container } from "@/components/Container";
import { Typography } from "@/components/Typography";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { BackButton } from "@/components/BackButton";
import { TitleCard } from "@/components/TitleCard";

// Mock data for demonstration
const mockTitle = {
  title: "The Great Adventure",
  subtitle: "A Journey Beyond Imagination",
  category: "Fantasy",
  rating: 4.5,
  views: 12345,
  bookmarks: 678,
  likes: 234,
  description:
    "Embark on an epic journey through magical lands, facing mythical creatures and unraveling ancient mysteries. This adventure will test your courage, wit, and heart. Along the way, you'll meet unforgettable characters, discover hidden secrets, and face challenges that will shape your destiny. Will you rise to the occasion and become a legend? The adventure awaits!",
  image: "/mock-title.jpg", // Replace with a real image path if available
  details: [
    { label: "Release Year", value: "2023", icon: "calendar" },
    { label: "Author", value: "Jane Doe", icon: "user" },
    { label: "Status", value: "Ongoing", icon: "refresh" },
    { label: "Publisher", value: "Mimiru Press", icon: "building" },
    { label: "Language", value: "English", icon: "globe" },
  ],
  genres: ["Fantasy", "Adventure", "Magic", "Drama"],
};

const mockChapters = [
  { number: 1, name: "The Beginning", description: "Our hero sets out on their journey.", date: "2024-01-01", length: 32, status: "Available" },
  { number: 2, name: "Into the Woods", description: "Strange things lurk in the forest.", date: "2024-01-08", length: 28, status: "Available" },
  { number: 3, name: "The First Trial", description: "A test of courage awaits.", date: "2024-01-15", length: 30, status: "Available" },
  { number: 4, name: "Allies and Enemies", description: "New friends and foes appear.", date: "2024-01-22", length: 27, status: "Available" },
  { number: 5, name: "The Hidden Path", description: "A secret route is discovered.", date: "2024-01-29", length: 35, status: "Available" },
  { number: 6, name: "The Great Battle", description: "A fierce confrontation ensues.", date: "2024-02-05", length: 40, status: "Coming Soon" },
  { number: 7, name: "Aftermath", description: "The dust settles and truths are revealed.", date: "2024-02-12", length: 25, status: "Coming Soon" },
  { number: 8, name: "New Horizons", description: "A new journey begins.", date: "2024-02-19", length: 29, status: "Coming Soon" },
];

const mockRelated = [
  { id: "2", title: "Mystery Manor", category: "Mystery", rating: 4.2 },
  { id: "3", title: "Space Odyssey", category: "Sci-Fi", rating: 4.8 },
  { id: "4", title: "Romance in Paris", category: "Romance", rating: 4.1 },
];

const CHAPTERS_PER_PAGE = 5;

const iconMap = {
  calendar: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ),
  user: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /></svg>
  ),
  refresh: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582M20 20v-5h-.581M5.582 9A7.003 7.003 0 0012 19a7 7 0 006.418-4M19.418 15A7.003 7.003 0 0012 5a7 7 0 00-6.418 4" /></svg>
  ),
  building: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M9 21V9m6 12V9" /></svg>
  ),
  globe: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v20m0-20C7.03 2 2 7.03 2 12s5.03 10 10 10 10-5.03 10-10S16.97 2 12 2z" /></svg>
  ),
};

export const TitleDetailPage: React.FC<{ titleID: string }> = () => {
  // Description expand/collapse
  const [descExpanded, setDescExpanded] = useState(false);
  const descLimit = 180;
  const isLongDesc = mockTitle.description.length > descLimit;

  // Chapters search and pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filteredChapters = mockChapters.filter(
    (ch) =>
      ch.name.toLowerCase().includes(search.toLowerCase()) ||
      ch.number.toString().includes(search)
  );
  const totalPages = Math.ceil(filteredChapters.length / CHAPTERS_PER_PAGE);
  // Sorting
  const [sortBy, setSortBy] = useState<'number' | 'date'>("number");
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>("asc");
  const sortedChapters = [...filteredChapters].sort((a, b) => {
    if (sortBy === "number") {
      return sortDir === "asc" ? a.number - b.number : b.number - a.number;
    } else {
      return sortDir === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
  const paginatedChapters = sortedChapters.slice(
    (page - 1) * CHAPTERS_PER_PAGE,
    page * CHAPTERS_PER_PAGE
  );

  // Reset to page 1 on search
  React.useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <Container className="pt-32 pb-10">
      <BackButton />

      {/* Main Title Card Section */}
      <section className="mb-10">
        <AnimatedContainer className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-10 relative">
          {/* Image Section */}
          <div className="flex-shrink-0 w-full md:w-1/3 flex items-center justify-center relative group">
            <div className="w-full aspect-[3/4] max-w-[320px] bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm overflow-hidden flex items-center justify-center relative">
              <ImageWithFallback
                src={mockTitle.image}
                alt={mockTitle.title}
                fill
                className="object-cover w-full h-full"
              />
              {/* Change Cover Button (UI only, visible on hover/focus) */}
              <button
                type="button"
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                title="Change cover (UI only)"
                aria-label="Change cover"
                tabIndex={0}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Change cover</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" />
                </svg>
              </button>
            </div>
          </div>
          {/* Details Section */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <Typography variant="h2" weight="bold" className="mb-1 text-white">
                {mockTitle.title}
              </Typography>
              <Typography variant="h5" weight="normal" className="mb-2 text-blue-300">
                {mockTitle.subtitle}
              </Typography>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-block px-2 py-0.5 bg-blue-800/80 rounded text-blue-200 font-semibold text-xs">
                  {mockTitle.category}
                </span>
                <span className="inline-block px-2 py-0.5 bg-zinc-800 rounded text-yellow-400 font-semibold text-xs flex items-center gap-1">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle"><title>Rating</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.505l6.908-1.004L12 2.25l3.092 6.251L22 9.505l-5.007 4.617 1.179 6.873z" /></svg>
                  {mockTitle.rating}
                </span>
                <span className="inline-block px-2 py-0.5 bg-green-800/80 rounded text-green-200 font-semibold text-xs">
                  {mockTitle.details.find(d => d.label === "Status")?.value}
                </span>
                <span className="inline-block px-2 py-0.5 bg-zinc-700 rounded text-zinc-200 font-semibold text-xs">
                  {mockTitle.details.find(d => d.label === "Author")?.value}
                </span>
                {/* Genres/Tags */}
                {mockTitle.genres.map((genre) => (
                  <span key={genre} className="inline-block px-2 py-0.5 bg-purple-800/80 rounded text-purple-200 font-semibold text-xs">
                    {genre}
                  </span>
                ))}
              </div>
              {/* Stats & Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="flex items-center gap-1 text-zinc-400 text-xs">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Views</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
                  {mockTitle.views} views
                </span>
                <span className="flex items-center gap-1 text-zinc-400 text-xs">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Bookmarks</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" /></svg>
                  {mockTitle.bookmarks}
                </span>
                <span className="flex items-center gap-1 text-zinc-400 text-xs">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Likes</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9l-2-2-2 2m0 6l2 2 2-2m-2-2v2m0-2V7m0 6v2m0-2h2m-2 0H8" /></svg>
                  {mockTitle.likes}
                </span>
                {/* Actions (UI only) */}
                <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium px-2 py-1 rounded transition-colors" title="Bookmark" aria-label="Bookmark">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" /></svg>
                  Bookmark
                </button>
                <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium px-2 py-1 rounded transition-colors" title="Share" aria-label="Share">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12v.01M8 12v.01M12 12v.01M16 12v.01M20 12v.01" /></svg>
                  Share
                </button>
              </div>
              {/* Description with Read More toggle */}
              <Typography variant="body" className="mb-4 text-zinc-300 text-sm">
                {isLongDesc && !descExpanded
                  ? mockTitle.description.slice(0, descLimit) + "..."
                  : mockTitle.description}
                {isLongDesc && (
                  <button
                    type="button"
                    className="ml-2 text-blue-400 hover:underline text-xs font-medium focus:outline-none"
                    onClick={() => setDescExpanded((v) => !v)}
                    aria-label={descExpanded ? "Show less description" : "Read more description"}
                  >
                    {descExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </Typography>
              {/* Details Grid with Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {mockTitle.details.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    {item.icon && iconMap[item.icon as keyof typeof iconMap]}
                    <div>
                      <Typography variant="overline" className="text-zinc-400 mb-0.5 text-xs">
                        {item.label}
                      </Typography>
                      <Typography variant="body-sm" className="text-zinc-200">
                        {item.value}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </section>

      {/* Chapters Section */}
      <section>
        <AnimatedContainer className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-lg shadow p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <Typography variant="h3" weight="bold" className="text-white">
              Chapters
            </Typography>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search chapters..."
                className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-500 text-sm w-full sm:w-64"
                aria-label="Search chapters"
              />
              <div className="flex gap-1 items-center">
                <label htmlFor="sortBy" className="text-zinc-400 text-xs mr-1">Sort by:</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'number' | 'date')}
                  className="bg-zinc-800 border border-zinc-700 rounded text-zinc-100 text-xs px-2 py-1 focus:outline-none"
                >
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                </select>
                <button
                  type="button"
                  onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
                  className="ml-1 px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs hover:bg-zinc-700"
                  aria-label="Toggle sort direction"
                  title="Toggle sort direction"
                >
                  {sortDir === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-zinc-200">
              <thead className="bg-zinc-800 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">#</th>
                  <th className="px-3 py-2 text-left font-semibold">Name</th>
                  <th className="px-3 py-2 text-left font-semibold">Date</th>
                  <th className="px-3 py-2 text-left font-semibold">Length</th>
                  <th className="px-3 py-2 text-left font-semibold">Status</th>
                  <th className="px-3 py-2 text-left font-semibold">Summary</th>
                  <th className="px-3 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedChapters.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-zinc-400 py-6">No chapters found.</td>
                  </tr>
                ) : (
                  paginatedChapters.map((chapter) => (
                    <tr
                      key={chapter.number}
                      className="hover:bg-zinc-700/40 transition-colors"
                    >
                      <td className="px-3 py-2 font-bold text-blue-300">{chapter.number}</td>
                      <td className="px-3 py-2 font-semibold text-white">{chapter.name}</td>
                      <td className="px-3 py-2">
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Date</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {new Date(chapter.date).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="flex items-center gap-1">
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Length</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          {chapter.length} pages
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${chapter.status === 'Available' ? 'bg-green-800/80 text-green-200' : 'bg-zinc-700 text-zinc-300'}`}>{chapter.status}</span>
                      </td>
                      <td className="px-3 py-2 text-zinc-300">{chapter.description}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium px-2 py-1 rounded transition-colors bg-zinc-900 border border-zinc-700" title="Bookmark" aria-label="Bookmark chapter">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" /></svg>
                          </button>
                          <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium px-2 py-1 rounded transition-colors bg-zinc-900 border border-zinc-700" title="Share" aria-label="Share chapter">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm6 8a6 6 0 00-12 0v1a2 2 0 002 2h8a2 2 0 002-2v-1z" /></svg>
                            <span className="sr-only">Share</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 disabled:opacity-50 text-sm"
                aria-label="Previous page"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    p === page
                      ? "bg-blue-700 text-white"
                      : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                  }`}
                  aria-label={`Go to page ${p}`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 disabled:opacity-50 text-sm"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </AnimatedContainer>
      </section>

      {/* Related Titles Section */}
      <section className="mt-12">
        <AnimatedContainer className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-lg shadow p-8">
          <Typography variant="h3" weight="bold" className="mb-6 text-white">
            Related Titles
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mockRelated.map((title) => (
              <TitleCard
                key={title.id}
                title={title.title}
                category={title.category}
                rating={title.rating}
                href={`/titles/${title.id}`}
              />
            ))}
          </div>
        </AnimatedContainer>
      </section>
    </Container>
  );
};
