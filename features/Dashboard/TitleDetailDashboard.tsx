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
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto p-8">
        <div className="flex gap-10">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex gap-8 mb-10">
              {/* Title Image - Made even larger */}
              <div className="w-72 h-96 relative rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 transform hover:scale-105 transition-transform duration-300">
                <ImageWithFallback src="/covers/title-demo.jpg" alt={title.title} fill className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Details & Controls */}
              <div className="flex-1 flex flex-col justify-between bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-xl border border-zinc-200 dark:border-zinc-700">
                <div>
                  <h2 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100 leading-tight">{title.title}</h2>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-6 text-lg leading-relaxed">{title.description}</p>
                </div>
                <div className="flex gap-4">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            {/* Chapters Card */}
            <div className="mb-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-700 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Chapters</h3>
              </div>
              
              {/* Team Version Selector */}
              <div className="flex gap-4 mb-8">
                {titleVersions.map((version) => (
                  <button
                    key={version.id}
                    className={`group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                      activeVersion === version.id
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400 shadow-blue-500/25 ring-2 ring-blue-400/50'
                        : 'bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-blue-500/10'
                    }`}
                    onClick={() => setActiveVersion(version.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-center leading-tight">{version.team}</span>
                    {activeVersion === version.id && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Chapter List */}
              <div className="flex flex-col gap-3 mb-6">
                {chapterOrder.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className="group bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    onClick={() => router.push(`/dashboard/chapters/${ch.id}`)}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragEnter={() => handleDragEnter(idx)}
                    onDragEnd={handleDragEnd}
                    onDragOver={e => e.preventDefault()}
                    style={{ opacity: dragItem.current === idx ? 0.5 : 1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-move group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                        <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <circle cx="7" cy="6" r="1" />
                          <circle cx="7" cy="10" r="1" />
                          <circle cx="7" cy="14" r="1" />
                          <circle cx="13" cy="6" r="1" />
                          <circle cx="13" cy="10" r="1" />
                          <circle cx="13" cy="14" r="1" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">{ch.title}</span>
                        <span className="text-zinc-500 dark:text-zinc-400 text-sm">Chapter #{ch.number}</span>
                      </div>
                    </div>
                    <button 
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Chapter
                </button>
              </div>
            </div>
            {/* Comments Card */}
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-700 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Comments</h3>
              </div>
              
              <div className="flex flex-col gap-4 mb-6">
                {comments.map((c) => (
                  <div key={c.id} className="group bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {c.user[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-purple-600 dark:text-purple-400">{c.user}</span>
                          <span className="text-zinc-400 text-xs">• just now</span>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <form 
                className="flex gap-4 p-4 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  U
                </div>
                <div className="flex-1 flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-zinc-400"
                  />
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}
