import axiosInstance from '@libs/api/axiosInstance';
import ROUTE from '@libs/constant/path';
import { MemberInfoRequestData, MemberInfoResponseData } from 'types/member';

const getMemberInfo = async () => {
  try {
    const res = await axiosInstance.get<MemberInfoResponseData>(`/v1/members/info`);

    return res.data;
  } catch (error) {
    console.error(error);
    alert('등록되지 않은 회원입니다.');
    location.replace(ROUTE.LOGIN_REGISTER);
  }
};

const postMemberInfo = async ({
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

  await axiosInstance.post(`/v1/members/info`, data);
};

export { getMemberInfo, postMemberInfo };
