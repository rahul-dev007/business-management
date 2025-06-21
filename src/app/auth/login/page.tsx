'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Login:', form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-8 space-y-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none"
        />

        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none"
          />
          <span
            className="absolute right-4 top-3 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className="text-right text-sm">
          <Link href="/auth/forgot-password" className="underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-purple-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{' '}
          <Link href="/auth/register" className="underline text-white">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
