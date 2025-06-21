// app/dashboard/page.tsx
'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) return <p>লোড হচ্ছে...</p>;

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold">স্বাগতম {user.name}!</h1>
      <p className="mt-2 text-gray-600">আপনি এখন আপনার ড্যাশবোর্ড এ আছেন।</p>
    </div>
  );
}
