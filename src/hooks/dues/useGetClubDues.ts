import { getClubDues } from '@libs/api/dues';
import { useQuery } from '@tanstack/react-query';
import { ClubDuesRequestData } from 'types/dues';

const useGetClubDues = ({ clubId, date, keyword }: Readonly<ClubDuesRequestData>) => {
  return useQuery({
    queryKey: ['getClubDues', date, keyword],
    queryFn: () => getClubDues({ clubId, date, keyword }),
    enabled: !!clubId,
  });
};

export default useGetClubDues;
