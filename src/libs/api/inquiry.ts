import axiosInstance from '@libs/api/axiosInstance';
import { InquiryRequestData } from 'types/inquiry';

const postInquiry = async ({ inquiryCategory, inquiryContent }: Readonly<InquiryRequestData>) => {
  await axiosInstance.post(`/v1/members/inquiries`, { inquiryCategory, inquiryContent });
};

export { postInquiry };
