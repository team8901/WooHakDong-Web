import axiosInstance from '@libs/api/axiosInstance';
import {
  ClubAccountRequestData,
  ClubAccountResponseData,
  ClubDuesRequestData,
  ClubDuesResultResponseData,
} from 'types/dues';

const getClubDues = async ({ clubId, date, keyword }: Readonly<ClubDuesRequestData>) => {
  if (date && keyword) {
    const res = await axiosInstance.get<ClubDuesResultResponseData>(
      `/v1/clubs/${clubId}/dues?date=${date}&keyword=${keyword}`,
    );
    return res.data;
  }

  if (date) {
    const res = await axiosInstance.get<ClubDuesResultResponseData>(`/v1/clubs/${clubId}/dues?date=${date}`);
    return res.data;
  }

  if (keyword) {
    const res = await axiosInstance.get<ClubDuesResultResponseData>(`/v1/clubs/${clubId}/dues?keyword=${keyword}`);
    return res.data;
  }

  const res = await axiosInstance.get<ClubDuesResultResponseData>(`/v1/clubs/${clubId}/dues`);
  return res.data;
};

const getClubAccount = async ({ clubId }: Readonly<ClubAccountRequestData>) => {
  const res = await axiosInstance.get<ClubAccountResponseData>(`/v1/clubs/${clubId}/accounts`);
  return res.data;
};

export { getClubDues, getClubAccount };
