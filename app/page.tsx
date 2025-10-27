'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPosts } from './lib/api';
import { Post } from './types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [page, search]);

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchPosts(page, search);
    setPosts(data.posts);
    setTotalPages(Math.ceil(data.total / data.limit));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border p-2 flex-1 mr-2"
        />
        <Link href="/posts/create" className="bg-blue-500 text-white px-4 py-2">
          Create Post
        </Link>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id} className="border p-4 mb-2">
              <Link href={`/posts/${post._id}`} className="text-lg font-bold">{post.title}</Link>
              <p>by {post.author.name}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-4 gap-2">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">
          Prev
        </button>
        <span className="px-3 py-1 border rounded">{page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}
