import '../styles/globals.css'; // অথবা পথ অনুযায়ী ঠিক করো


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}

