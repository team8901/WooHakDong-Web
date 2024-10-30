type Gender = 'MAN' | 'WOMAN';

type MemberInfoRequestData = {
  memberPhoneNumber: string;
  memberMajor: string;
  memberStudentNumber: string;
  memberGender: Gender;
};

type MemberInfoResponseData = {
  memberName: string;
  memberPhoneNumber: string;
  memberEmail: string;
  memberSchool: string;
  memberMajor: string;
  memberStudentNumber: string;
  memberGender: Gender;
};

export type { Gender, MemberInfoRequestData, MemberInfoResponseData };
