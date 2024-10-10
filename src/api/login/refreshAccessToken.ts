import axios, { AxiosError } from "axios";

type RefreshData = {
  accessToken: string;
  refreshToken: string;
};

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post<RefreshData>("/api/auth/refresh", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    console.log("refresh-token", res);
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    if ((error as AxiosError)?.response?.status === 401) {
      localStorage.removeItem("refreshToken");
      alert("세션이 만료되어 로그인 페이지로 이동합니다.");
      location.href = "/";
    }
  }
};
