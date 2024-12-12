import { AdminInquiryResponseData } from 'types/admin';
import { InquiryCategory } from 'types/inquiry';

const TERMS_MENU = [
  { term: '2023-03-01', label: '23-1' },
  { term: '2023-09-01', label: '23-2' },
  { term: '2024-03-01', label: '24-1' },
  { term: '2024-09-01', label: '24-2' },
  { term: '', label: '전체' },
];

const TERMS_MENU_REVERSE = [...TERMS_MENU].reverse();

const TERMS_LABEL = TERMS_MENU.map(({ label }) => label);

const SLICED_TERMS_LABEL = TERMS_LABEL.slice(0, -1);

const INQUIRY_MAPPING = {
  INQUIRY: '문의',
  SUGGESTION: '제안',
  DECLARATION: '신고',
  ETC: '기타',
};

const INQUIRY_CATEGORY: { category: InquiryCategory; content: string }[] = [
  { category: 'INQUIRY', content: '문의' },
  { category: 'DECLARATION', content: '신고' },
  { category: 'SUGGESTION', content: '제안' },
  { category: 'ETC', content: '기타' },
];

const INQUIRY_CATEGORY_ALL: { category: InquiryCategory | 'ALL'; content: string }[] = [
  { category: 'ALL', content: '전체' },
  ...INQUIRY_CATEGORY,
];

const INQUIRY_DATA: AdminInquiryResponseData[] = [
  {
    inquiryCategory: 'DECLARATION',
    inquiryContent: '문의 내용입니다',
    inquiryId: 1,
    memberEmail: 'aaa@naver.com',
    creatDate: new Date().toISOString(),
  },
  {
    inquiryCategory: 'INQUIRY',
    inquiryContent: '문의 내용입니다2222',
    inquiryId: 2,
    memberEmail: 'bbb@naver.com',
    creatDate: new Date().toISOString(),
  },
  {
    inquiryCategory: 'DECLARATION',
    inquiryContent: '문의 내용입니다3333',
    inquiryId: 3,
    memberEmail: 'ccc@naver.com',
    creatDate: new Date().toISOString(),
  },
  {
    inquiryCategory: 'SUGGESTION',
    inquiryContent: '제안합니다.',
    inquiryId: 4,
    memberEmail: 'ddd@naver.com',
    creatDate: new Date().toISOString(),
  },
];

export {
  INQUIRY_MAPPING,
  SLICED_TERMS_LABEL,
  TERMS_LABEL,
  TERMS_MENU,
  TERMS_MENU_REVERSE,
  INQUIRY_CATEGORY,
  INQUIRY_CATEGORY_ALL,
  INQUIRY_DATA,
};
