'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Comment } from '@/app/types';

export default function HomePage() {
  const [catUrl, setCatUrl] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState('');
  const router = useRouter();

  const fetchCat = async () => {
    const res = await axios.get('/api/cat');
    setCatUrl(res.data.url);
  };

  const fetchComments = async () => {
    const res = await axios.get('/api/comments');
    setComments(res.data.filter((c: Comment) => c.imageUrl === catUrl));
  };

  const postComment = async () => {
    if (!comment.trim()) return;
    await axios.post('/api/comments', { imageUrl: catUrl, user: username, text: comment });
    setComment('');
    fetchComments();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    if (!token || !user) {
      router.push('/login');
      return;
    }
    setUsername(user);
    fetchCat();
  }, []);

  useEffect(() => {
    if (catUrl) fetchComments();
  }, [catUrl]);

  return (
    <div className="min-h-screen w-full bg-pink-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl flex justify-between px-2 mb-2">
        <h2 className="text-3xl font-bold text-pink-700">Welcome, {username}</h2>
        <button
          className="text-red-500 underline"
          onClick={() => {
            localStorage.clear();
            router.push('/login');
          }}
        >
          Logout
        </button>
      </div>
      <div className="w-full max-w-2xl bg-pink-50 shadow-xl p-6 rounded-2xl mx-auto">
        <div className="text-center">
          {catUrl && <img src={catUrl} alt="Cat" className="w-full max-h-96 object-contain rounded" />}
          <button
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded font-bold transition"
            onClick={fetchCat}
          >
            Next Cat
          </button>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-pink-500">Comments</h3>
          <div className="flex gap-2">
            <input
              className="w-full border border-pink-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded font-bold transition"
              onClick={postComment}
            >
              Post
            </button>
          </div>
          <ul className="mt-4 space-y-1">
            {comments.map((c, i) => (
              <li key={i} className="flex gap-2">
                <span>💬</span>
                <span>{c.user}: {c.text}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>

  );

}
