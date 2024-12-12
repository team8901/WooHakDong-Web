import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import { INQUIRY_MAPPING } from '@libs/constant/admin';
import { formatDateDetail } from '@libs/util/formatDate';
import { AdminInquiryResponseData } from 'types/admin';

const InquiryListItem = ({ inquiry }: Readonly<{ inquiry: AdminInquiryResponseData }>) => {
  return (
    <div className="flex flex-col gap-[4px] rounded-[14px] border border-lightGray px-[20px] py-[16px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-[8px]">
          <Body4 text={inquiry.memberEmail} />
          <Body4 text={INQUIRY_MAPPING[inquiry.inquiryCategory]} className="text-darkGray" />
        </div>
        <Body4 text={formatDateDetail(inquiry.creatDate)} className="text-darkGray" />
      </div>
      <Body2 text={inquiry.inquiryContent} />
    </div>
  );
};

export default InquiryListItem;
