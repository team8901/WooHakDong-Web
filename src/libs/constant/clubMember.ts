import { ClubMemberResponseData, ClubMemberRole } from 'types/clubMember';

const CLUB_MEMBER_ROLE = {
  MEMBER: '멤버',
  OFFICER: '임원',
  PRESIDENT: '회장',
  VICEPRESIDENT: '부회장',
  SECRETARY: '총무',
};

const CLIB_MEMBER_ROLE_MENU: { role: ClubMemberRole; label: string }[] = Object.entries(CLUB_MEMBER_ROLE).map(
  ([role, label]) => ({ role: role as ClubMemberRole, label }),
);

const CLUB_MEMBER_DATA: ClubMemberResponseData[] = [
  {
    memberId: 1,
    memberName: '이재용',
    memberPhoneNumber: '01012345678',
    memberEmail: 'samsung@ajou.ac.kr',
    memberGender: 'MAN',
    memberMajor: '경영학과',
    memberStudentNumber: '201911111',
    clubMemberRole: 'PRESIDENT',
    clubMemberId: 1,
    clubJoinedDate: '2021-10-01',
    clubMemberAssignedTerm: '2024년 2학기',
  },
  {
    memberId: 2,
    memberName: '박상준',
    memberPhoneNumber: '01012345678',
    memberEmail: 'woohakdong@ajou.ac.kr',
    memberGender: 'MAN',
    memberMajor: '소프트웨어학과',
    memberStudentNumber: '202020202',
    clubMemberRole: 'VICEPRESIDENT',
    clubMemberId: 2,
    clubJoinedDate: '2023-10-01',
    clubMemberAssignedTerm: '2024년 2학기',
  },
  {
    memberId: 3,
    memberName: '정의엽',
    memberPhoneNumber: '01012345678',
    memberEmail: 'woohakdong@ajou.ac.kr',
    memberGender: 'MAN',
    memberMajor: '소프트웨어학과',
    memberStudentNumber: '202020202',
    clubMemberRole: 'SECRETARY',
    clubMemberId: 3,
    clubJoinedDate: '2023-05-01',
    clubMemberAssignedTerm: '2024년 2학기',
  },
  {
    memberId: 4,
    memberName: '김덕배',
    memberPhoneNumber: '01012345678',
    memberEmail: 'woohakdong@ajou.ac.kr',
    memberGender: 'MAN',
    memberMajor: '체육학과',
    memberStudentNumber: '19191919',
    clubMemberRole: 'MEMBER',
    clubMemberId: 4,
    clubJoinedDate: '2023-11-06',
    clubMemberAssignedTerm: '2024년 2학기',
  },
  {
    memberId: 5,
    memberName: '강동우',
    memberPhoneNumber: '01012345678',
    memberEmail: 'woohakdong@ajou.ac.kr',
    memberGender: 'MAN',
    memberMajor: '소프트웨어학과',
    memberStudentNumber: '19191919',
    clubMemberRole: 'MEMBER',
    clubMemberId: 5,
    clubJoinedDate: '2023-11-06',
    clubMemberAssignedTerm: '2024년 2학기',
  },
  {
    memberId: 6,
    memberName: '나아주',
    memberPhoneNumber: '01012345678',
    memberEmail: 'woohakdong@ajou.ac.kr',
    memberGender: 'WOMAN',
    memberMajor: '소프트웨어학과',
    memberStudentNumber: '19191919',
    clubMemberRole: 'MEMBER',
    clubMemberId: 6,
    clubJoinedDate: '2023-11-06',
    clubMemberAssignedTerm: '2024년 2학기',
  },
  {
    memberId: 7,
    memberName: '봉지수',
    memberPhoneNumber: '01012345678',
    memberEmail: 'woohakdong@ajou.ac.kr',
    memberGender: 'WOMAN',
    memberMajor: '소프트웨어학과',
    memberStudentNumber: '19191919',
    clubMemberRole: 'MEMBER',
    clubMemberId: 7,
    clubJoinedDate: '2023-11-06',
    clubMemberAssignedTerm: '2024년 2학기',
  },
];

export { CLUB_MEMBER_ROLE, CLIB_MEMBER_ROLE_MENU, CLUB_MEMBER_DATA };
