declare global {
  interface Window {
    IMP: any;
  }
}

export interface IMPResponse {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  error_code?: string;
  error_msg?: string;
  pay_method: string;
  paid_amount: number;
  status: string;
  name: string;
  buyer_name: string;
  buyer_email: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
  custom_data?: any;
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string;
  vbank_date?: number;
  card_name?: string;
  card_quota?: number;
  card_number?: string;
  card_type?: string;
}
