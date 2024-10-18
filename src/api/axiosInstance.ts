import { refreshAccessToken } from "@api/login/refreshAccessToken";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    (config as AxiosRequestConfig).headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "ngrok-skip-browser-warning": "any",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      if (!localStorage.getItem("refreshToken")) {
        alert("로그인이 필요한 페이지입니다.");
        location.href = "/";
        return;
      }
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    }
    // return Promise.reject(error);
    return Promise.reject(`${error.response.data.message}`);
  }
);

export default axiosInstance;
