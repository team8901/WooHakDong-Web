import { getAdminInquiryByCategory } from '@libs/api/admin';
import { useQuery } from '@tanstack/react-query';
import { AdminInquiryRequestData } from 'types/admin';

const useGetAdminInquiryByCategory = ({ category }: Readonly<AdminInquiryRequestData>) => {
  return useQuery({
    queryKey: ['getAdminInquiryByCategory', category],
    queryFn: () => getAdminInquiryByCategory({ category }),
  });
};

export default useGetAdminInquiryByCategory;
