import { getClubSchedules } from '@libs/api/clubSchedule';
import { useQuery } from '@tanstack/react-query';
import { ClubScheduleRequestData } from 'types/clubSchedule';

interface UseGetClubSchedulesProps extends ClubScheduleRequestData {
  currentMonth: number;
}

const useGetClubSchedules = ({ clubId, date, currentMonth }: Readonly<UseGetClubSchedulesProps>) => {
  return useQuery({
    queryKey: ['getClubSchedules', clubId, currentMonth],
    queryFn: () => getClubSchedules({ clubId, date }),
    enabled: !!clubId && !!date,
  });
};

export default useGetClubSchedules;
