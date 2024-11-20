import { getClubMembersMy } from '@libs/api/clubMember';
import { useQuery } from '@tanstack/react-query';
import { ClubMyInfoRequestData } from 'types/clubMember';

const useGetClubMembersMy = ({ clubId }: Readonly<ClubMyInfoRequestData>) => {
  return useQuery({
    queryKey: ['getClubMembersMy', clubId],
    queryFn: () => getClubMembersMy({ clubId }),
    enabled: !!clubId,
  });
};

export default useGetClubMembersMy;
