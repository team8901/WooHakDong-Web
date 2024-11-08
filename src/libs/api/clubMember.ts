import axiosInstance from '@libs/api/axiosInstance';
import { ClubMemberRequestData, ClubMemberResultResponseData } from 'types/clubMember';

const getClubMemberList = async ({ clubId, clubMemberAssignedTerm }: Readonly<ClubMemberRequestData>) => {
  const res = await axiosInstance.get<ClubMemberResultResponseData>(
    `/v1/clubs/${clubId}/members?clubMemberAssignedTerm=${clubMemberAssignedTerm}`,
  );

  return res.data;
};

export { getClubMemberList };
