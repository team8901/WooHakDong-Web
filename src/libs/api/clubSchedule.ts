import axiosInstance from '@libs/api/axiosInstance';
import { ClubScheduleRequestData, ClubSchedulesResponseData } from 'types/clubSchedule';

const getClubSchedules = async ({ clubId, date }: Readonly<ClubScheduleRequestData>) => {
  const res = await axiosInstance.get<ClubSchedulesResponseData>(`/v1/clubs/${clubId}/schedules?date=${date}`);

  return res.data;
};

export { getClubSchedules };
