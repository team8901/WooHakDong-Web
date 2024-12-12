type GroupInfoRequestData = {
  clubId: number;
};

type GroupInfoByGroupIdRequestData = {
  groupId: number;
};

interface GroupInfoResponseData extends GroupInfoByGroupIdRequestData {
  groupName: string;
  groupLink: string;
  groupDescription: string;
  groupAmount: number;
}

interface GroupJoinProps extends GroupInfoByGroupIdRequestData {
  merchantUid: string;
}

type GroupJoinRequestData = {
  merchantUid: string;
};

type GroupJoinResponseData = {
  orderId: string;
};

interface GroupJoinConfirmProps extends GroupInfoByGroupIdRequestData {
  merchantUid: string;
  impUid: string;
  orderId: string;
}

type GroupJoinConfirmRequestData = {
  merchantUid: string; // 주문 식별을 위한 식별자
  impUid: string; // 결제 완료 후, 포트원으로부터 받은 값
  orderId: string; // 주문하기 시에, 서버 측으로부터 받은 값
};

interface GroupInfoByGroupIdResponseData extends GroupInfoByGroupIdRequestData {
  groupName: string;
  groupJoinLink: string;
  groupDescription: string;
  groupAmount: number;
  groupChatLink: string;
  groupChatPassword: string;
  groupIsActivated: true;
  groupMemberLimit: number;
  groupMemberCount: number;
}

export type {
  GroupInfoRequestData,
  GroupInfoByGroupIdRequestData,
  GroupInfoResponseData,
  GroupJoinProps,
  GroupJoinRequestData,
  GroupJoinResponseData,
  GroupJoinConfirmProps,
  GroupJoinConfirmRequestData,
  GroupInfoByGroupIdResponseData,
};
