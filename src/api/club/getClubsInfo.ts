import axiosInstance from "@api/axiosInstance";

export type ClubInfoResponseData = {
  clubId: number;
  clubName: string;
  clubEnglishName: string;
  clubImage: string;
  clubDescription: string;
  clubRoom: string;
  clubGeneration: string;
  clubDues: number;
};

type ClubsInfoResponseData = {
  result: ClubInfoResponseData[];
};

export const getClubsInfo = async () => {
  const res = await axiosInstance.get<ClubsInfoResponseData>(`/v1/clubs`);
  return res.data;
};
