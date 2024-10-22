type MemberInfoRequestData = {
  memberPhoneNumber: string;
  memberMajor: string;
  memberStudentNumber: string;
  memberGender: "MAN" | "WOMAN";
};

type MemberInfoResponseData = {
  memberName: string;
  memberPhoneNumber: string;
  memberEmail: string;
  memberSchool: string;
  memberMajor: string;
  memberStudentNumber: string;
  memberGender: "MAN" | "WOMAN";
};

export type { MemberInfoRequestData, MemberInfoResponseData };
