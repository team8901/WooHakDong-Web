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

export type {
  GroupInfoProps,
  GroupInfoResponseData,
  GroupJoinProps,
  GroupJoinRequestData,
  GroupJoinResponseData,
  GroupJoinConfirmProps,
  GroupJoinConfirmRequestData,
};
