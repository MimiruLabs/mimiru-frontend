"use client";
import { useEffect, useState, useRef } from 'react';
import { Title } from '@/types/db';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export const TitleDetailDashboard = ({ titleId }: { titleId: string }) => {
  const [title, setTitle] = useState<Title | null>(null);

  useEffect(() => {
    // TODO: Replace with Supabase fetch
    setTitle({ id: Number(titleId), title: `Demo Title ${titleId}`, description: `Description for title ${titleId}` });
  }, [titleId]);

  // Mock title versions (translated by different teams)
  const titleVersions = [
    {
      id: 1,
      team: 'Team Alpha',
      cover: '/covers/team-alpha.jpg',
      chapters: [
        { id: 1, number: 1, title: 'Chapter 1: Beginning' },
        { id: 2, number: 2, title: 'Chapter 2: Middle' },
        { id: 3, number: 3, title: 'Chapter 3: End' },
      ],
    },
    {
      id: 2,
      team: 'Team Bravo',
      cover: '/covers/team-bravo.jpg',
      chapters: [
        { id: 4, number: 1, title: 'Capítulo 1: Inicio' },
        { id: 5, number: 2, title: 'Capítulo 2: Medio' },
        { id: 6, number: 3, title: 'Capítulo 3: Fin' },
      ],
    },
  ];
  const [activeVersion, setActiveVersion] = useState(titleVersions[0].id);
  const [chapterOrder, setChapterOrder] = useState(
    titleVersions.find(v => v.id === activeVersion)?.chapters || []
  );

  // Update chapter order when switching version
  useEffect(() => {
    setChapterOrder(titleVersions.find(v => v.id === activeVersion)?.chapters || []);
  }, [activeVersion]);

  // Drag and drop logic
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };
  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };
  const handleDragEnd = () => {
    const items = [...chapterOrder];
    const dragIdx = dragItem.current;
    const overIdx = dragOverItem.current;
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) {
      const dragged = items[dragIdx];
      items.splice(dragIdx, 1);
      items.splice(overIdx, 0, dragged);
      setChapterOrder(items);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };
  const router = useRouter();
  const comments = [
    { id: 1, user: 'Alice', text: 'Great story!' },
    { id: 2, user: 'Bob', text: 'Loved the ending.' },
  ];

  if (!title) return <div className="text-zinc-300">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-8">
        {/* Vertical Team Tabs */}
        <div className="flex flex-col gap-2 min-w-[120px] pt-2">
          {titleVersions.map((version) => (
            <button
              key={version.id}
              className={`flex flex-col items-center gap-1 px-2 py-3 rounded-lg border text-xs font-medium transition-colors shadow-sm ${
                activeVersion === version.id
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
              onClick={() => setActiveVersion(version.id)}
            >
              <Image src={version.cover} alt={version.team} width={40} height={40} className="rounded mb-1" />
              <span>{version.team}</span>
            </button>
          ))}
        </div>
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex gap-6">
            {/* Title Image */}
            <div className="w-48 h-64 relative rounded-lg overflow-hidden shadow border border-zinc-200 dark:border-zinc-800">
              <ImageWithFallback src="/covers/title-demo.jpg" alt={title.title} fill className="object-cover w-full h-full" />
            </div>
            {/* Details & Controls */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">{title.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-base leading-relaxed">{title.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Edit</button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          </div>
          {/* Chapters Card */}
          <div className="mt-8 bg-zinc-50 dark:bg-zinc-800 rounded-lg shadow p-4 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Chapters</h3>
            <div className="flex flex-col gap-2">
              {chapterOrder.map((ch, idx) => (
                <div
                  key={ch.id}
                  className="bg-white dark:bg-zinc-900 rounded p-3 flex justify-between items-center cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-700 transition border border-zinc-100 dark:border-zinc-800"
                  onClick={() => router.push(`/dashboard/chapters/${ch.id}`)}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragEnter={() => handleDragEnter(idx)}
                  onDragEnd={handleDragEnd}
                  onDragOver={e => e.preventDefault()}
                  style={{ opacity: dragItem.current === idx ? 0.5 : 1 }}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-zinc-400 cursor-move" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7" cy="6" r="1" />
                      <circle cx="7" cy="10" r="1" />
                      <circle cx="7" cy="14" r="1" />
                      <circle cx="13" cy="6" r="1" />
                      <circle cx="13" cy="10" r="1" />
                      <circle cx="13" cy="14" r="1" />
                    </svg>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{ch.title}</span>
                    <span className="ml-2 text-zinc-500 dark:text-zinc-400">(#{ch.number})</span>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">Delete</button>
                </div>
              ))}
            </div>
            <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">Add Chapter</button>
          </div>
          {/* Comments Card */}
          <div className="mt-8 bg-zinc-50 dark:bg-zinc-800 rounded-lg shadow p-4 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Comments</h3>
            <div className="flex flex-col gap-2">
              {comments.map((c) => (
                <div key={c.id} className="bg-white dark:bg-zinc-900 rounded p-3 border border-zinc-100 dark:border-zinc-800">
                  <span className="font-bold text-blue-600 dark:text-blue-400">{c.user}:</span>
                  <span className="ml-2 text-zinc-700 dark:text-zinc-300">{c.text}</span>
                </div>
              ))}
            </div>
            <form className="mt-3 flex gap-2">
              <input type="text" placeholder="Add a comment..." className="flex-1 px-3 py-2 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-100 dark:border-zinc-800" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
