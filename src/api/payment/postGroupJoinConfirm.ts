import axiosInstance from "@api/axiosInstance";
import { AxiosError } from "axios";

type GroupJoinConfirmProps = {
  merchantUid: string;
  groupId: number;
  impUid: string;
};

type GroupJoinConfirmRequestData = {
  merchantUid: string;
  impUid: string; // 결제 완료 후, 포트원으로부터 받은 값
};

type ErrorResponseData = {
  ErrorCode: string;
  ErrorDetail: string;
};

export const postGroupJoinConfirm = async ({
  merchantUid,
  groupId,
  impUid,
}: Readonly<GroupJoinConfirmProps>) => {
  const data: GroupJoinConfirmRequestData = { merchantUid, impUid };

  try {
    await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/v1/groups/${groupId}/join/confirm`,
      data
    );
  } catch (error) {
    const errorResponseData = (error as AxiosError)?.response
      ?.data as ErrorResponseData;
    console.error(errorResponseData);
  }
};
