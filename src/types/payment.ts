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

type PortOneProps = {
  clubId: number;
  pg: string;
  pay_method: string;
  merchantUid: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
};

type PortOneRequestData = {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
};

export type {
  GroupJoinProps,
  GroupJoinRequestData,
  GroupJoinResponseData,
  GroupJoinConfirmProps,
  GroupJoinConfirmRequestData,
  PortOneProps,
  PortOneRequestData,
};
