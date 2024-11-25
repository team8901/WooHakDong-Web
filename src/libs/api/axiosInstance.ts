import { refreshAccessToken } from '@libs/api/auth';
import ROUTE from '@libs/constant/path';
import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    (config as AxiosRequestConfig).headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'ngrok-skip-browser-warning': 'any',
    };
    return config;
  },
  (error) => {
    Promise.reject(new Error(error.response.data.message));
  },
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      if (!localStorage.getItem('refreshToken')) {
        alert('로그인이 필요한 페이지입니다.');
        location.replace(ROUTE.ROOT);
        return;
      }

      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return axiosInstance(originalRequest);
    }

    console.error(`${error.response.data.message}`);

    if (error.response.data.message === 'member not found') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      if (localStorage.getItem('admin')) {
        localStorage.removeItem('admin');
      }

      alert('로그인이 필요한 페이지입니다.');
      location.replace(ROUTE.ROOT);
      return;
    }

    return Promise.reject(new Error(error.response.data.message));
  },
);

export default axiosInstance;
