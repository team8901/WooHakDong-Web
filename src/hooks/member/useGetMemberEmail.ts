import { getMemberInfo } from '@libs/api/member';
import { useQuery } from '@tanstack/react-query';

const useGetMemberEmail = () => {
  return useQuery({
    queryKey: ['getMemberInfo'],
    queryFn: () => getMemberInfo(),
    select: (data) => data?.memberEmail,
  });
};

export default useGetMemberEmail;
