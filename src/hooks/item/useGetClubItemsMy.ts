import { getClubItemsMy } from '@libs/api/item';
import { useQuery } from '@tanstack/react-query';
import { ClubItemsMyRequestData } from 'types/item';

const useGetClubItemsMy = ({ clubId }: Readonly<ClubItemsMyRequestData>) => {
  return useQuery({
    queryKey: ['getClubItemsMy', clubId],
    queryFn: () => getClubItemsMy({ clubId }),
    enabled: !!clubId,
  });
};

export default useGetClubItemsMy;
