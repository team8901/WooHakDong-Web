type LoginRequestData = {
  accessToken: string;
};

type LoginResponseData = {
  accessToken: string;
  refreshToken: string;
};

export type { LoginRequestData, LoginResponseData };
