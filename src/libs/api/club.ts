import axiosInstance from '@libs/api/axiosInstance';
import { ClubInfoRequestData, ClubInfoResponseData, ClubInfoResultResponseData } from 'types/club';

const getClubInfo = async ({ clubEnglishName }: Readonly<ClubInfoRequestData>) => {
  const res = await axiosInstance.get<ClubInfoResponseData>(`/v1/clubs/search?clubEnglishName=${clubEnglishName}`);
  return res.data;
};

const getClubsInfo = async () => {
  const res = await axiosInstance.get<ClubInfoResultResponseData>(`/v1/clubs`);
  return res.data;
};

export { getClubInfo, getClubsInfo };
