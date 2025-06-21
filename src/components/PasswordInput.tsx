// components/PasswordInput.tsx
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ value, onChange, placeholder }: any) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg bg-white/20 backdrop-blur text-white focus:outline-none"
      />
      <span
        onClick={() => setShow(!show)}
        className="absolute top-3 right-3 cursor-pointer text-white"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>
    </div>
  );
}
