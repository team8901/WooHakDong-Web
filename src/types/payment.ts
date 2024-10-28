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
  m_redirect_url: string;
};

export type { PortOneProps, PortOneRequestData };
