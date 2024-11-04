import AppBar from '@components/AppBar';
import Button from '@components/Button';
import Input from '@components/Input';
import Caption2 from '@components/Caption2';
import Title2 from '@components/Title2';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { getMemberInfo } from '@libs/api/member';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';
import InputBox from '@components/InputBox';
import GenderSelection from '@pages/member/components/GenderSelection';
import { Gender, MemberInfoResponseData } from 'types/member';
import formatPhoneNumber from '@libs/util/formatPhoneNumber';

const MemberInfoWritePage = () => {
  const navigate = useCustomNavigate();

  const [memberInfo, setMemberInfo] = useState<MemberInfoResponseData>({
    memberGender: 'MAN',
  } as MemberInfoResponseData);

  useEffect(() => {
    const checkMemberInfo = async () => {
      const { memberName, memberEmail, memberSchool } = await getMemberInfo();
      setMemberInfo((prev) => ({ ...prev, memberName, memberEmail, memberSchool }));
    };

    checkMemberInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setMemberInfo((prev) => ({ ...prev, memberPhoneNumber: input }));
  };

  const handleButtonClick = () => {
    navigate(ROUTE.MEMBER_INFO_CONFIRM, { state: memberInfo });
  };

  const handleGenderChange = (gender: Gender) => {
    setMemberInfo((prev) => ({ ...prev, memberGender: gender }));
  };

  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0">
        <AppBar />
      </div>

      <div className="masked-overflow flex h-full flex-col gap-[40px] pt-[20px] scrollbar-hide">
        <Title2 text="회원님의 정보를 알려주세요" />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[12px]">
            <Caption2 text="기본 정보" />
            <InputBox text={memberInfo.memberName} />
            <GenderSelection gender={memberInfo.memberGender} setGender={handleGenderChange} />
            <Input
              inputMode="numeric"
              label="휴대폰 번호"
              name="memberPhoneNumber"
              placeholder="휴대폰 번호를 '-' 없이 입력해 주세요"
              value={formatPhoneNumber(memberInfo.memberPhoneNumber)}
              onChange={handlePhoneNumberChange}
            />
            <InputBox text={memberInfo.memberEmail} />
          </div>

          <div className="flex flex-col gap-[12px]">
            <Caption2 text="학교 정보" />
            <InputBox text={memberInfo.memberSchool} />
            <Input
              label="학과"
              name="memberMajor"
              placeholder="학과를 입력해 주세요"
              value={memberInfo.memberMajor}
              onChange={handleInputChange}
            />
            <Input
              type="number"
              inputMode="numeric"
              label="학번"
              name="memberStudentNumber"
              placeholder="학번을 입력해 주세요"
              value={memberInfo.memberStudentNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button
          text="다음"
          onClick={handleButtonClick}
          disabled={
            !memberInfo.memberMajor?.trim() ||
            !memberInfo.memberStudentNumber?.trim() ||
            !memberInfo.memberPhoneNumber?.trim()
          }
        />
      </div>
    </div>
  );
};

export default MemberInfoWritePage;
