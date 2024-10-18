import axiosInstance from "@api/axiosInstance";

type GroupJoinProps = {
  merchantUid: string;
  groupId: number;
};

type GroupJoinRequestData = {
  merchantUid: string;
};

type GroupJoinResponseData = {
  orderId: string;
};

export const postGroupJoin = async ({
  merchantUid,
  groupId,
}: Readonly<GroupJoinProps>) => {
  const data: GroupJoinRequestData = { merchantUid };

  const res = await axiosInstance.post<GroupJoinResponseData>(
    `${import.meta.env.VITE_API_URL}/v1/groups/${groupId}/joins`,
    data
  );
  const { orderId } = res.data;
  return orderId;
};
