import axiosInstance from '@libs/api/axiosInstance';
import { GroupInfoProps, GroupInfoResponseData } from 'types/group';

const getGroupInfo = async ({ clubId }: Readonly<GroupInfoProps>) => {
  const res = await axiosInstance.get<GroupInfoResponseData>(`/v1/clubs/${clubId}/join`);
  return res.data;
};

export { getGroupInfo };
