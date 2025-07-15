"use client";
import { useEffect, useState } from 'react';
// Use TitleCardProps type for mock data
import { TitleCard } from '@/components/TitleCard';
import { useRouter } from 'next/navigation';

export const TitlesDashboardHome = () => {
  const [titles, setTitles] = useState<Array<{ id: number; title: string; category: string; rating: number }>>([]);
  const router = useRouter();

  useEffect(() => {
    // TODO: Replace with Supabase fetch
    setTitles([
      { id: 1, title: 'The Great Adventure', category: 'Fantasy', rating: 4.5 },
      { id: 2, title: 'Mystery Manor', category: 'Mystery', rating: 4.2 },
      { id: 3, title: 'Space Odyssey', category: 'Sci-Fi', rating: 4.8 },
      { id: 4, title: 'Romance in Paris', category: 'Romance', rating: 4.1 },
      { id: 5, title: 'Thriller Night', category: 'Thriller', rating: 4.6 },
      { id: 6, title: 'Comedy Central', category: 'Comedy', rating: 4.3 },
      { id: 7, title: 'Epic Legends', category: 'Fantasy', rating: 4.7 },
      { id: 8, title: 'Detective Files', category: 'Mystery', rating: 4.0 },
      { id: 9, title: 'Galactic Wars', category: 'Sci-Fi', rating: 4.9 },
      { id: 10, title: 'Love in Tokyo', category: 'Romance', rating: 4.2 },
      { id: 11, title: 'Night Stalker', category: 'Thriller', rating: 4.4 },
      { id: 12, title: 'Laugh Factory', category: 'Comedy', rating: 4.5 },
      { id: 13, title: 'Dragon Quest', category: 'Fantasy', rating: 4.6 },
      { id: 14, title: 'Haunted House', category: 'Mystery', rating: 4.1 },
      { id: 15, title: 'Starship Troopers', category: 'Sci-Fi', rating: 4.7 },
      { id: 16, title: 'Paris Nights', category: 'Romance', rating: 4.3 },
      { id: 17, title: 'Edge of Fear', category: 'Thriller', rating: 4.8 },
      { id: 18, title: 'Comedy Hour', category: 'Comedy', rating: 4.2 },
    ]);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-zinc-100">Titles</h1>
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {titles.map((title) => (
          <TitleCard
            key={title.id}
            title={title.title}
            category={title.category}
            rating={title.rating}
            href={`/dashboard/titles/${title.id}`}
          />
        ))}
      </div>
    </div>
  );
}
