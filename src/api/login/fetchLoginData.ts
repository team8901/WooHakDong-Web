import axios from "axios";

type LoginData = {
  accessToken: string;
  refreshToken: string;
  memberEmail: string;
  memberName: string;
};

export const fetchLoginData = async (accessToken: string) => {
  try {
    const res = await axios.post<LoginData>(`/api/auth/login/social`, {
      accessToken,
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
