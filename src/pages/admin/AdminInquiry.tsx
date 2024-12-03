import Button from '@components/Button';
import EmptyText from '@components/EmptyText';
import useGetAdminInquiryByCategory from '@hooks/admin/useGetAdminInquiryByCategory';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import InquiryDropdown from '@pages/admin/components/InquiryDropdown';
import InquiryListItem from '@pages/admin/components/InquiryListItem';

import { useEffect, useState } from 'react';
import { InquiryCategory } from 'types/inquiry';

const AdminInquiryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<InquiryCategory | null>(null);
  const { data } = useGetAdminInquiryByCategory({ category: selectedCategory });
  const navigate = useCustomNavigate();

  useEffect(() => {
    document.body.style.minWidth = '100%';
    document.body.style.maxWidth = '100%';
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center gap-[30px] overflow-auto px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
      <div className="fixed left-[30px]">
        <InquiryDropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>

      <div className="flex w-full flex-col gap-[12px] pt-[80px]">
        {!data?.result || data?.result.length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <EmptyText text="접수된 문의가 없어요" />
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            {data?.result.map((inquiry) => (
              <div key={inquiry.inquiryId}>
                <InquiryListItem inquiry={inquiry} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-[20px] right-[30px] flex flex-col gap-[12px]">
        <Button text="전체 통계 보기" onClick={() => navigate(ROUTE.ADMIN_STATS)} className="w-[170px] px-[20px]" />
      </div>
    </div>
  );
};

export default AdminInquiryPage;
