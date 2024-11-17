import { getClubMembers } from '@libs/api/clubMember';
import { useQuery } from '@tanstack/react-query';
import { ClubMemberRequestData } from 'types/clubMember';

const useGetClubMembers = ({ clubId, clubMemberAssignedTerm }: Readonly<ClubMemberRequestData>) => {
  return useQuery({
    queryKey: ['getClubMembers', clubId, clubMemberAssignedTerm],
    queryFn: () => getClubMembers({ clubId, clubMemberAssignedTerm }),
    enabled: !!clubId && !!clubMemberAssignedTerm,
  });
};

export default useGetClubMembers;
