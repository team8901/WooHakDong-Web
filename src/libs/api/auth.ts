import { LoginData } from "types/auth";
import axios, { AxiosError } from "axios";

const fetchLoginData = async (accessToken: string) => {
  try {
    const res = await axios.post<LoginData>(
      `${import.meta.env.VITE_API_URL}/v1/auth/login/social`,
      {
        accessToken,
      }
    );
    console.log(`로그인 성공`, res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const refreshAccessToken = async () => {
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

export { fetchLoginData, refreshAccessToken };
