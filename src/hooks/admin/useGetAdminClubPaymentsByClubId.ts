import { getClubPaymentsByClubId } from '@libs/api/admin';
import { useQuery } from '@tanstack/react-query';
import { AdminClubStatsRequestData } from 'types/admin';

const useGetAdminClubPaymentsByClubId = ({ clubId, assignedTerm }: Readonly<AdminClubStatsRequestData>) => {
  return useQuery({
    queryKey: ['getClubPaymentsByClubId', clubId, assignedTerm],
    queryFn: () => getClubPaymentsByClubId({ clubId, assignedTerm }),
    enabled: !!clubId,
  });
};

export default useGetAdminClubPaymentsByClubId;
