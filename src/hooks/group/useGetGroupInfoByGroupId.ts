import { getGroupInfoByGroupId } from '@libs/api/group';
import { useQuery } from '@tanstack/react-query';
import { GroupInfoByGroupIdRequestData } from 'types/group';

const useGetGroupInfoByGroupId = ({ groupId }: Readonly<GroupInfoByGroupIdRequestData>) => {
  return useQuery({
    queryKey: ['getGroupInfoByGroupId', groupId],
    queryFn: () => getGroupInfoByGroupId({ groupId }),
    enabled: !!groupId,
  });
};

export default useGetGroupInfoByGroupId;
