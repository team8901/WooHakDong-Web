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

  try {
    await axiosInstance.post(`/v1/member/info`, data);
  } catch (error) {
    console.error(error);
    throw Error(`회원 정보를 저장하는 데 실패하였습니다.`);
  }
};
