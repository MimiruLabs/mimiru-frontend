"use client"
import { use, useState } from 'react';
import { Page } from '@/types/db';

export const PagesDashboard = () => {
  const [form, setForm] = useState<Page>({ chapter_id: 0, page_number: 1, image_url: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    // TODO: Replace with Supabase insert logic
    setTimeout(() => {
      setLoading(false);
      setMessage('Page added (mock)!');
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto bg-zinc-900 rounded-xl p-8 shadow">
      <h2 className="text-2xl font-bold mb-6 text-zinc-100">Add Page</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-zinc-300">Chapter ID</span>
          <input
            type="number"
            name="chapter_id"
            value={form.chapter_id}
            onChange={handleChange}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-zinc-300">Page Number</span>
          <input
            type="number"
            name="page_number"
            value={form.page_number}
            onChange={handleChange}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-zinc-300">Image URL</span>
          <input
            type="text"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Page'}
        </button>
        {message && <div className="text-green-400 mt-2">{message}</div>}
      </form>
    </div>
  );
};
