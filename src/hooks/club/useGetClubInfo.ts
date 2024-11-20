import { getClubInfo } from '@libs/api/club';
import { useQuery } from '@tanstack/react-query';
import { ClubInfoRequestData } from 'types/club';

const useGetClubInfo = ({ clubEnglishName }: Readonly<ClubInfoRequestData>) => {
  return useQuery({
    queryKey: ['getClubInfo', clubEnglishName],
    queryFn: () => getClubInfo({ clubEnglishName }),
    enabled: !!clubEnglishName,
  });
};

export default useGetClubInfo;
