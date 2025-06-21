// 'use client';

// import { createContext, useState, useEffect, ReactNode } from 'react';

// export const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState(null);

//   // auto fetch user if token exists (optional)
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch('/api/user/profile');
//         const data = await res.json();
//         if (res.ok) setUser(data.user);
//       } catch (err) {
//         console.error('AuthContext: Fetch profile failed');
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
