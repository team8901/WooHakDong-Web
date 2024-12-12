import { getGroupsByClubId } from '@libs/api/group';
import { useQuery } from '@tanstack/react-query';
import { GroupInfoRequestData } from 'types/group';

const useGetGroupsByClubId = ({ clubId }: Readonly<GroupInfoRequestData>) => {
  return useQuery({
    queryKey: ['getGroupsByClubId', clubId],
    queryFn: () => getGroupsByClubId({ clubId }),
    enabled: !!clubId,
  });
};

export default useGetGroupsByClubId;
