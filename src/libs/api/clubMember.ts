import axiosInstance from '@libs/api/axiosInstance';
import {
  ClubMemberRequestData,
  ClubMemberResponseData,
  ClubMemberResultResponseData,
  ClubMyInfoRequestData,
} from 'types/clubMember';

const getClubMembers = async ({ clubId, clubMemberAssignedTerm }: Readonly<ClubMemberRequestData>) => {
  const res = await axiosInstance.get<ClubMemberResultResponseData>(
    `/v1/clubs/${clubId}/members?clubMemberAssignedTerm=${clubMemberAssignedTerm}`,
  );

  return res.data;
};

const getClubMembersMy = async ({ clubId }: Readonly<ClubMyInfoRequestData>) => {
  const res = await axiosInstance.get<ClubMemberResponseData>(`/v1/clubs/${clubId}/members/me`);

  return res.data;
};

export { getClubMembers, getClubMembersMy };
