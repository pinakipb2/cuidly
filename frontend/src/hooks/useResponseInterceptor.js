import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { api } from '../api/auth';
import { toast } from 'react-hot-toast';

export const useResponseInterceptor = () => {
  const interceptorId = useRef(null);
  const router = useRouter();
  useEffect(() => {
    interceptorId.current = api.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const errorMessage = error.response?.data?.message;
        switch (error.response?.status) {
          case 401:
            router.push('/login');
            toast.error(errorMessage, { id: errorMessage });
            // return Promise.reject(error);
            break;
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptorId.current);
    };
  }, []);
  return true;
};
