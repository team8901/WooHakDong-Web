import { getMemberInfo } from '@libs/api/member';
import { useQuery } from '@tanstack/react-query';

const useGetMemberInfo = () => {
  return useQuery({
    queryKey: ['getMemberInfo'],
    queryFn: () => getMemberInfo(),
  });
};

export default useGetMemberInfo;
