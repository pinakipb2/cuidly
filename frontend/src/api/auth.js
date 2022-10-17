import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

// List of all the endpoints
export const requestGuest = (config = {}) => api.post('/request-guest', config);
export const registerUser = (data) => api.post('/register', data);
export const logInUser = (data) => api.post('/login', data);
export const logOutUser = (data, config = {}) => api.post('/logout', data, config);
export const refreshTokens = (data, config = {}) => api.post('/refresh', data, config);

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
    return Promise.reject(error);
  }
);
