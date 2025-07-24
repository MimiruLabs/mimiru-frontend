// Example usage of the new data fetching structure
'use client';

import { useTitles, usePaginatedTitles, useCreateTitle } from '@/lib/hooks';
import { useState } from 'react';

// Example 1: Simple titles list
export function SimpleTitlesList() {
  const { titles, loading, error } = useTitles();

  if (loading) return <div>Loading titles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {titles.map(title => (
        <li key={title.id}>{title.title} - {title.status}</li>
      ))}
    </ul>
  );
}

// Example 2: Paginated titles with controls
export function PaginatedTitlesList() {
  const { data, loading, error, currentPage, nextPage, prevPage } = usePaginatedTitles(1, 10);

  if (loading) return <div>Loading titles...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <ul>
        {data.data.map(title => (
          <li key={title.id}>{title.title}</li>
        ))}
      </ul>
      
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {data.totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === data.totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

// Example 3: Create title form
export function CreateTitleForm() {
  const { create, loading, error } = useCreateTitle();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await create({
      title,
      description: description || undefined,
      status: 'ongoing',
      created_by: 'current-user-id', // You'd get this from auth context
    });
    
    if (result) {
      setTitle('');
      setDescription('');
      alert('Title created successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Title'}
      </button>
      
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </form>
  );
}

// Example 4: Server Component usage
// In a server component file:
/*
import { getTitles } from '@/app/actions/titles.actions';

export default async function ServerTitlesPage() {
  const result = await getTitles();
  
  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  return (
    <div>
      <h1>Titles (Server-side)</h1>
      <ul>
        {result.data?.map(title => (
          <li key={title.id}>{title.title}</li>
        ))}
      </ul>
    </div>
  );
}
*/
