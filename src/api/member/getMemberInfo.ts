import axiosInstance from "@api/axiosInstance";

type MemberInfoResponseData = {
  memberName: string;
  memberPhoneNumber: string;
  memberEmail: string;
  memberSchool: string;
  memberMajor: string;
  memberStudentNumber: string;
  memberGender: "MAN" | "WOMAN";
};

export const getMemberInfo = async () => {
  const res = await axiosInstance.get<MemberInfoResponseData>(
    `/v1/member/info`
  );
  return res.data;
};
