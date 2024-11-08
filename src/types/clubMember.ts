import { Gender } from 'types/member';

/**
 * ClubMemberRole
 * 'MEMBER' : 멤버
 * 'OFFICER' : 임원
 * 'PRESIDENT' : 회장
 * 'VICEPRESIDENT' : 부회장
 * 'SECRETARY' : 총무
 */
type ClubMemberRole = 'MEMBER' | 'OFFICER' | 'PRESIDENT' | 'VICEPRESIDENT' | 'SECRETARY';

type ClubMemberRequestData = {
  clubId: number;
  clubMemberAssignedTerm: string;
};

type ClubMemberResponseData = {
  memberId: number;
  memberName: string;
  memberPhoneNumber: string;
  memberEmail: string;
  memberGender: Gender;
  memberMajor: string;
  memberStudentNumber: string;
  clubMemberRole: ClubMemberRole;
  clubMemberId: number;
  clubJoinedDate: string;
  clubMemberAssignedTerm: string;
};

type ClubMemberResultResponseData = {
  result: ClubMemberResponseData[];
};

type ClubMemberListProps = {
  member: ClubMemberResponseData;
};

export type {
  ClubMemberRole,
  ClubMemberRequestData,
  ClubMemberResponseData,
  ClubMemberResultResponseData,
  ClubMemberListProps,
};
