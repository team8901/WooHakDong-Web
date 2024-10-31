import axiosInstance from '@libs/api/axiosInstance';
import { ClubDuesProps, ClubsDuesResponseData } from 'types/dues';

const getClubDues = async ({ clubId, year, month }: Readonly<ClubDuesProps>) => {
  const res = await axiosInstance.get<ClubsDuesResponseData>(`/v1/club/${clubId}/dues?year=${year}&month=${month}`);
  return res.data;
};

export { getClubDues };
