import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  // Auto-fetch user when app loads (e.g., from refreshToken)
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUser(null); // No token, no need to fetch
        return;
      }

      try {
        const res = await axiosInstance.get('/profile');
        setUser(res.data.data);
      } catch (err) {
        setUser(null); // token invalid or expired
      }
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};