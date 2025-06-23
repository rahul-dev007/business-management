// src/app/layout.tsx
import React from 'react';

export const metadata = {
  title: 'Business Management',
  description: 'Backend API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
