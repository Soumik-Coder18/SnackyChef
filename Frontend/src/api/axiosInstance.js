import axios from 'axios';

console.log("Base URL:", import.meta.env.VITE_API_BASE_URL); // Debug: check if env is loaded

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/user`,
  withCredentials: true, // to send cookies for auth (like refreshToken)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptors for adding tokens or handling errors globally
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Add centralized error handling
    return Promise.reject(error);
  }
);

export default axiosInstance;
