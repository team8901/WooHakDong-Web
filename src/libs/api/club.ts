import axiosInstance from '@libs/api/axiosInstance';
import { ClubInfoProps, ClubInfoResponseData, ClubsInfoResponseData } from 'types/club';

const getClubInfo = async ({ clubEnglishName }: Readonly<ClubInfoProps>) => {
  const res = await axiosInstance.get<ClubInfoResponseData>(`/v1/clubs/search?clubEnglishName=${clubEnglishName}`);
  return res.data;
};

const getClubsInfo = async () => {
  const res = await axiosInstance.get<ClubsInfoResponseData>(`/v1/clubs`);
  return res.data;
};

export { getClubInfo, getClubsInfo };
