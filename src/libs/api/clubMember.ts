import axiosInstance from '@libs/api/axiosInstance';
import { ClubMemberRequestData, ClubMembersResponseData } from 'types/clubMember';

const getClubMemberList = async ({ clubId, clubMemberAssignedTerm }: Readonly<ClubMemberRequestData>) => {
  const res = await axiosInstance.get<ClubMembersResponseData>(
    `/v1/clubs/${clubId}/members?clubMemberAssignedTerm=${clubMemberAssignedTerm}`,
  );

  return res.data;
};

export { getClubMemberList };
