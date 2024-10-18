import axiosInstance from "@api/axiosInstance";

type GroupInfoProps = {
  clubId: number;
};

type GroupInfoResponseData = {
  groupId: number;
  groupName: string;
  groupLink: string;
  groupDescription: string;
  groupAmount: number;
};

export const getGroupInfo = async ({ clubId }: Readonly<GroupInfoProps>) => {
  const res = await axiosInstance.get<GroupInfoResponseData>(
    `/v1/clubs/${clubId}/join`
  );
  return res.data;
};
