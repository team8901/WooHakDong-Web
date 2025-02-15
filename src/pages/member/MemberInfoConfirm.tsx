import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import Title2 from '@components/Title2';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { postMemberInfo } from '@libs/api/member';
import { GENDER_TYPE } from '@libs/constant/member';
import ROUTE from '@libs/constant/path';
import formatPhoneNumber from '@libs/util/formatPhoneNumber';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';
import { MemberInfoRequestData, MemberInfoResponseData } from 'types/member';

const MemberInfoConfirmPage = () => {
  const navigate = useNavigate();
  const customNavigate = useCustomNavigate();
  const { state } = useLocation();
  const [memberInfo, setMemberInfo] = useState<MemberInfoResponseData | null>(null);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();

  useEffect(() => {
    if (!state?.memberInfo) {
      customNavigate(ROUTE.MEMBER_REGISTER);
    }

    setMemberInfo(state.memberInfo);
  }, []);

  const handleButtonClick = async () => {
    if (memberInfo === null) return;

    const postData: MemberInfoRequestData = {
      memberPhoneNumber: memberInfo.memberPhoneNumber,
      memberMajor: memberInfo.memberMajor,
      memberStudentNumber: memberInfo.memberStudentNumber,
      memberGender: memberInfo.memberGender,
    };

    setIsLoading(true);
    try {
      await postMemberInfo(postData);
      customNavigate(ROUTE.CLUB_REGISTER);
      setToastMessage('회원 정보가 저장되었어요');
    } catch (error) {
      if ((error as AxiosError).message === 'Invalid phone number format') {
        setToastMessage('올바른 전화번호 형식이 아니에요');
        return;
      }
      setToastMessage(`회원 정보를 저장하는 데 실패했어요`);
    } finally {
      setIsLoading(false);
    }
  };

  if (memberInfo === null) return null;
  return (
    <div className="relative h-full px-[20px] pt-[56px]">
      <div className="absolute left-0 top-0">
        <AppBar goBackCallback={() => navigate(-1)} />
      </div>

      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[40px]">
        <Title2 text="회원님의 정보가 맞으신가요?" />

        {isLoading ? (
          <div>
            <Skeleton width={100} height={16} count={1} borderRadius={14} />
            <Skeleton height={150} borderRadius={14} className="mt-[10px]" />
            <Skeleton width={100} height={16} count={1} borderRadius={14} className="mt-[20px]" />
            <Skeleton height={150} borderRadius={14} className="mt-[10px]" />
          </div>
        ) : (
          <div className="flex flex-col gap-[20px] pb-[80px]">
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
        )}
      </ScrollView>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button text="맞아요" onClick={handleButtonClick} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default MemberInfoConfirmPage;
