import { getClubAccount } from '@libs/api/dues';
import { useQuery } from '@tanstack/react-query';
import { ClubAccountRequestData } from 'types/dues';

const useGetClubAccount = ({ clubId }: Readonly<ClubAccountRequestData>) => {
  return useQuery({
    queryKey: ['getClubAccount', clubId],
    queryFn: () => getClubAccount({ clubId }),
    enabled: !!clubId,
  });
};

export default useGetClubAccount;
