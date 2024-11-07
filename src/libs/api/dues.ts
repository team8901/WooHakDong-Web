import axiosInstance from '@libs/api/axiosInstance';
import { ClubAccountRequestData, ClubAccountResponseData, ClubDuesProps, ClubsDuesResponseData } from 'types/dues';

const getClubDues = async ({ clubId, year, month }: Readonly<ClubDuesProps>) => {
  const res = await axiosInstance.get<ClubsDuesResponseData>(`/v1/clubs/${clubId}/dues?year=${year}&month=${month}`);
  return res.data;
};

const getClubAccount = async ({ clubId }: Readonly<ClubAccountRequestData>) => {
  const res = await axiosInstance.get<ClubAccountResponseData>(`/v1/clubs/${clubId}/accounts`);
  return res.data;
};

export { getClubDues, getClubAccount };
