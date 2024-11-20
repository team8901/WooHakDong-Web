import { getClubInfo } from '@libs/api/club';
import { useQuery } from '@tanstack/react-query';
import { ClubInfoRequestData } from 'types/club';

const useGetClubName = ({ clubEnglishName }: Readonly<ClubInfoRequestData>) => {
  return useQuery({
    queryKey: ['getClubName', clubEnglishName],
    queryFn: () => getClubInfo({ clubEnglishName }),
    enabled: !!clubEnglishName,
    select: (data) => data.clubName,
  });
};

export default useGetClubName;
