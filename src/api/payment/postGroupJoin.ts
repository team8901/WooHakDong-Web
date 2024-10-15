import axiosInstance from "@api/axiosInstance";
import { AxiosError } from "axios";

type GroupJoinProps = {
  merchantUid: string;
  groupId: number;
};

type GroupJoinRequestData = {
  merchantUid: string;
};

type GroupJoinResponseData = {
  orderId: number;
};

type ErrorResponseData = {
  ErrorCode: string;
  ErrorDetail: string;
};

export const postGroupJoin = async ({
  merchantUid,
  groupId,
}: Readonly<GroupJoinProps>) => {
  const data: GroupJoinRequestData = { merchantUid };

  try {
    const res = await axiosInstance.post<GroupJoinResponseData>(
      `${import.meta.env.VITE_API_URL}/v1/groups/${groupId}/joins`,
      data
    );
    console.log(res);
    return res.data;
  } catch (error) {
    const errorResponseData = (error as AxiosError)?.response
      ?.data as ErrorResponseData;
    console.error(errorResponseData);
  }
};
