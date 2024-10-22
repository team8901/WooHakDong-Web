import axiosInstance from '@libs/api/axiosInstance';
import { MemberInfoRequestData, MemberInfoResponseData } from 'types/member';

const getMemberInfo = async () => {
  const res = await axiosInstance.get<MemberInfoResponseData>(`/v1/member/info`);
  return res.data;
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

  await axiosInstance.post(`/v1/member/info`, data);
};

export { getMemberInfo, postMemberInfo };
