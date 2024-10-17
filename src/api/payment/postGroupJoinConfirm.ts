import axiosInstance from "@api/axiosInstance";
import { AxiosError } from "axios";

type GroupJoinConfirmProps = {
  merchantUid: string;
  groupId: number;
  impUid: string;
  orderId: string;
};

type GroupJoinConfirmRequestData = {
  merchantUid: string; // 주문 식별을 위한 식별자
  impUid: string; // 결제 완료 후, 포트원으로부터 받은 값
  orderId: string; // 주문하기 시에, 서버 측으로부터 받은 값
};

type ErrorResponseData = {
  ErrorCode: string;
  ErrorDetail: string;
};

export const postGroupJoinConfirm = async ({
  merchantUid,
  groupId,
  impUid,
  orderId,
}: Readonly<GroupJoinConfirmProps>) => {
  const data: GroupJoinConfirmRequestData = { merchantUid, impUid, orderId };

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
