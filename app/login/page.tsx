'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    if (token && user) {
      router.replace('/home');
    }
  }, []);

  const login = async () => {
    try {
      const res = await axios.post('/api/auth', { username, password: "password" });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      router.push('/home');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full bg-pink-100 flex">
      <div className="max-w-2xl max-h-2xl w-full h-full mx-auto mt-20 bg-pink-50 shadow-lg p-8 rounded-xl flex flex-col items-center">
        <img
          src="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg"
          alt="Lovely Cat"
          className="w-32 h-32 rounded-full mb-4 shadow-md border-4 border-pink-300"
        />
        <h1 className="text-3xl font-bold mb-2 text-center text-pink-700">Welcome Cat Lover!</h1>
        <p className="mb-6 text-center text-pink-500">Log in to join the lovely cat community.</p>
        <input
          className="w-full border border-pink-300 p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <input
        className="w-full border border-pink-300 p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        /> */}
        <button
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded font-bold transition"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}
