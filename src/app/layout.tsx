export const metadata = {
  title: "Business Management API",
  description: "Backend API running on Vercel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
