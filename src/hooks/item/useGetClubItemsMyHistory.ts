import { getClubItemsMyHistory } from '@libs/api/item';
import { useQuery } from '@tanstack/react-query';
import { ClubItemsMyRequestData } from 'types/item';

const useGetClubItemsMyHistory = ({ clubId }: Readonly<ClubItemsMyRequestData>) => {
  return useQuery({
    queryKey: ['getClubItemsMyHistory', clubId],
    queryFn: () => getClubItemsMyHistory({ clubId }),
    enabled: !!clubId,
  });
};

export default useGetClubItemsMyHistory;
