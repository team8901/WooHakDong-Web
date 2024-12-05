type InquiryCategory = 'INQUIRY' | 'DECLARATION' | 'SUGGESTION' | 'ETC';

type InquiryRequestData = {
  inquiryContent: string;
  inquiryCategory: InquiryCategory;
};

export type { InquiryRequestData, InquiryCategory };
