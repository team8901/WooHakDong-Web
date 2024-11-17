import { getClubItems } from '@libs/api/item';
import { useQuery } from '@tanstack/react-query';

const useGetClubItems = ({ clubId }: Readonly<{ clubId: number }>) => {
  return useQuery({ queryKey: ['getClubItems', clubId], queryFn: () => getClubItems({ clubId }), enabled: !!clubId });
};

export default useGetClubItems;
