import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

// List of all the endpoints
export const requestGuest = () => api.post('/request-guest');
export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);

// Inceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      if (error.response.data.message === 'Guest Account has Expired') {
        try {
          await api.post('/request-guest');
          return api.request(originalRequest);
        } catch (err) {
          console.log(err.message);
        }
      }
    }
    throw error;
  }
);
