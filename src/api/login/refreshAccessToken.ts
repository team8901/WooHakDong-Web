import { LoginData } from "@api/login/fetchLoginData";
import axios, { AxiosError } from "axios";

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post<LoginData>(
      `${import.meta.env.VITE_API_URL}/v1/auth/refresh`,
      {
        refreshToken: localStorage.getItem("refreshToken"),
      }
    );
    console.log(`리프레시 토큰 요청 성공`, res);
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.error(`/api/auth/refresh`, error);
    if (
      (error as AxiosError)?.response?.status === 400 ||
      (error as AxiosError)?.response?.status === 401 ||
      (error as AxiosError)?.response?.status === 403
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("세션이 만료되어 로그인 페이지로 이동합니다.");
      location.href = "/";
    }
  }
};
