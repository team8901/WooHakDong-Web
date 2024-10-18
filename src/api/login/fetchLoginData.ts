import axios from "axios";

export type LoginData = {
  accessToken: string;
  refreshToken: string;
};

export const fetchLoginData = async (accessToken: string) => {
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
