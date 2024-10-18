import axiosInstance from "@api/axiosInstance";

export type MemberInfoRequestData = {
  memberPhoneNumber: string;
  memberMajor: string;
  memberStudentNumber: string;
  memberGender: "MAN" | "WOMAN";
};

export const postMemberInfo = async ({
  memberPhoneNumber,
  memberMajor,
  memberStudentNumber,
  memberGender,
}: Readonly<MemberInfoRequestData>) => {
  const data: MemberInfoRequestData = {
    memberPhoneNumber,
    memberMajor,
    memberStudentNumber,
    memberGender,
  };

  await axiosInstance.post(`/v1/member/info`, data);
};
