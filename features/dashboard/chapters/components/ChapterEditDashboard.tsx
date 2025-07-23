"use client";
import { useState } from 'react';

export const ChapterEditDashboard = ({ chapterId }: { chapterId: string }) => {
  const [chapter, setChapter] = useState({
    id: chapterId,
    number: chapterId,
    title: `Chapter ${chapterId}`,
    content: 'This is the chapter content.',
  });
  const [preview, setPreview] = useState(false);

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900 rounded-xl p-8 shadow">
      <h2 className="text-2xl font-bold mb-4 text-zinc-100">Edit Chapter {chapter.number}</h2>
      <form className="flex flex-col gap-4 mb-6">
        <label className="flex flex-col gap-1">
          <span className="text-zinc-300">Title</span>
          <input
            type="text"
            value={chapter.title}
            onChange={e => setChapter({ ...chapter, title: e.target.value })}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-zinc-300">Content</span>
          <textarea
            value={chapter.content}
            onChange={e => setChapter({ ...chapter, content: e.target.value })}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 min-h-[120px]"
          />
        </label>
        <div className="flex gap-2">
          <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Delete</button>
          <button type="button" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => setPreview(p => !p)}>
            {preview ? 'Hide Preview' : 'Preview'}
          </button>
        </div>
      </form>
      {preview && (
        <div className="bg-zinc-800 rounded p-4 mt-4">
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">Preview</h3>
          <div className="text-zinc-300 whitespace-pre-line">{chapter.content}</div>
        </div>
      )}
    </div>
  );
}
