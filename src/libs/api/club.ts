import axiosInstance from '@libs/api/axiosInstance';
import axios from 'axios';
import { ClubInfoRequestData, ClubInfoResponseData, ClubInfoResultResponseData } from 'types/club';

const getClubInfo = async ({ clubEnglishName }: Readonly<ClubInfoRequestData>) => {
  axios.defaults.headers.common['Authorization'] = undefined;

  const res = await axios.get<ClubInfoResponseData>(
    `${import.meta.env.VITE_API_URL}/v1/clubs/search?clubEnglishName=${clubEnglishName}`,
  );
  return res.data;
};

const getClubsInfo = async () => {
  const res = await axiosInstance.get<ClubInfoResultResponseData>(`/v1/clubs`);
  return res.data;
};

export { getClubInfo, getClubsInfo };
