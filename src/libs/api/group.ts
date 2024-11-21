import axiosInstance from '@libs/api/axiosInstance';
import {
  GroupInfoRequestData,
  GroupInfoResponseData,
  GroupJoinConfirmProps,
  GroupJoinConfirmRequestData,
  GroupJoinProps,
  GroupJoinRequestData,
  GroupJoinResponseData,
} from 'types/group';

const getGroupInfo = async ({ clubId }: Readonly<GroupInfoRequestData>) => {
  const res = await axiosInstance.get<GroupInfoResponseData>(`/v1/clubs/${clubId}/join`);

  return res.data;
};

const postGroupJoin = async ({ merchantUid, groupId }: Readonly<GroupJoinProps>) => {
  const data: GroupJoinRequestData = { merchantUid };

  const res = await axiosInstance.post<GroupJoinResponseData>(`/v1/groups/${groupId}/orders`, data);
  const { orderId } = res.data;

  return orderId;
};

const postGroupJoinConfirm = async ({ merchantUid, groupId, impUid, orderId }: Readonly<GroupJoinConfirmProps>) => {
  const data: GroupJoinConfirmRequestData = { merchantUid, impUid, orderId };

  await axiosInstance.post(`/v1/groups/${groupId}/orders/confirm`, data);
};

export { getGroupInfo, postGroupJoin, postGroupJoinConfirm };
