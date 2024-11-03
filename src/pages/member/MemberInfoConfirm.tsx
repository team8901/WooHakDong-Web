import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import Title2 from '@components/Title2';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { postMemberInfo } from '@libs/api/member';
import { GENDER_TYPE } from '@libs/constant/member';
import ROUTE from '@libs/constant/path';
import formatPhoneNumber from '@libs/util/formatPhoneNumber';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MemberInfoRequestData, MemberInfoResponseData } from 'types/member';

const MemberInfoConfirmPage = () => {
  const navigate = useCustomNavigate();
  const location = useLocation();
  const [memberInfo, setMemberInfo] = useState<MemberInfoResponseData | null>(null);

  useEffect(() => {
    if (location.state === null) {
      navigate(ROUTE.MEMBER_REGISTER);
    }

    setMemberInfo(location.state);
  }, []);

  const handleButtonClick = async () => {
    if (memberInfo === null) return;

    const postData: MemberInfoRequestData = {
      memberPhoneNumber: memberInfo.memberPhoneNumber,
      memberMajor: memberInfo.memberMajor,
      memberStudentNumber: memberInfo.memberStudentNumber,
      memberGender: memberInfo.memberGender,
    };
    await postMemberInfo(postData);

    navigate(ROUTE.CLUB_REGISTER);
  };

  if (memberInfo === null) return null;
  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0">
        <AppBar />
      </div>

      <div className="masked-overflow flex h-full flex-col gap-[40px] pt-[20px] scrollbar-hide">
        <Title2 text="회원님의 정보가 맞으신가요?" />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[12px]">
            <Caption2 text="기본 정보" />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray px-[16px] py-[12px]">
              <Body1 text={memberInfo.memberName} />
              <Body1 text={GENDER_TYPE[memberInfo.memberGender]} />
              <Body1 text={formatPhoneNumber(memberInfo.memberPhoneNumber)} />
              <Body1 text={memberInfo.memberEmail} />
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            <Caption2 text="학교 정보" />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray px-[16px] py-[12px]">
              <Body1 text={memberInfo.memberSchool} />
              <Body1 text={memberInfo.memberMajor} />
              <Body1 text={memberInfo.memberStudentNumber} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button text="맞아요" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default MemberInfoConfirmPage;
