import { getClubInfo } from '@libs/api/club';
import { useQuery } from '@tanstack/react-query';
import { ClubInfoRequestData } from 'types/club';

const useGetClubId = ({ clubEnglishName }: Readonly<ClubInfoRequestData>) => {
  return useQuery({
    queryKey: ['getClubId', clubEnglishName],
    queryFn: () => getClubInfo({ clubEnglishName }),
    enabled: !!clubEnglishName,
    select: (data) => data.clubId,
  });
};

export default useGetClubId;
