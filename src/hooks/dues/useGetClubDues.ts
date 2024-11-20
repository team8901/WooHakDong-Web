import { getClubDues } from '@libs/api/dues';
import { useQuery } from '@tanstack/react-query';
import { ClubDuesRequestData } from 'types/dues';

const useGetClubDues = ({ clubId, year, month }: Readonly<ClubDuesRequestData>) => {
  return useQuery({
    queryKey: ['getDuesList'],
    queryFn: () => getClubDues({ clubId, year, month }),
    enabled: !!clubId && !!year && !!month,
  });
};

export default useGetClubDues;
