import axios from 'axios';
import { getCurrentUser } from '@/services/actions';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getCurrentUser();
    if (session && session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export default fetcher;
