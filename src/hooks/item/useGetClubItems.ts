import { getClubItems } from '@libs/api/item';
import { useQuery } from '@tanstack/react-query';
import { ClubItemRequestData } from 'types/item';

const useGetClubItems = ({ clubId }: Readonly<ClubItemRequestData>) => {
  return useQuery({ queryKey: ['getClubItems', clubId], queryFn: () => getClubItems({ clubId }), enabled: !!clubId });
};

export default useGetClubItems;
