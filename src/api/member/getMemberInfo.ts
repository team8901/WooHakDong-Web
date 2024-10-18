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
  try {
    const res = await axiosInstance.get<MemberInfoResponseData>(
      `/v1/member/info`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw Error(`회원 정보를 불러오는 데 실패하였습니다.`);
  }
};
