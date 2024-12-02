import AppBar from '@components/AppBar';
import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import Input from '@components/Input';
import InputBox from '@components/InputBox';
import ScrollView from '@components/ScrollView';
import Title2 from '@components/Title2';
import { useToast } from '@contexts/ToastContext';
import useGetMemberInfo from '@hooks/member/useGetMemberInfo';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { getMemberInfo, postMemberInfo } from '@libs/api/member';
import ROUTE from '@libs/constant/path';
import formatPhoneNumber from '@libs/util/formatPhoneNumber';
import GenderSelection from '@pages/member/components/GenderSelection';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
import { Gender, MemberInfoResponseData } from 'types/member';

const MemberInfoWritePage = () => {
  const { state } = useLocation();
  const navigate = useCustomNavigate();
  const { isLoading: isMemberInfoLoading, setIsLoading: setIsMemberInfoLoading } = useLoading();
  const { isLoading: isButtonLoading, setIsLoading: setIsButtonLoading } = useLoading();
  const { setToastMessage } = useToast();
  const { isLoading, setIsLoading } = useLoading();
  const { refetch: refetchMemberInfo } = useGetMemberInfo();

  const [memberInfo, setMemberInfo] = useState<MemberInfoResponseData>({
    memberGender: state?.memberInfo?.memberGender ?? 'MAN',
    memberPhoneNumber: state?.memberInfo?.memberPhoneNumber ?? '',
    memberMajor: state?.memberInfo?.memberMajor ?? '',
    memberStudentNumber: state?.memberInfo?.memberStudentNumber ?? '',
  } as MemberInfoResponseData);

  useEffect(() => {
    (async () => {
      setIsMemberInfoLoading(true);
      try {
        const { memberName, memberEmail, memberSchool } = await getMemberInfo();

        setMemberInfo((prev) => ({ ...prev, memberName, memberEmail, memberSchool }));
      } catch (error) {
        console.error(error);
        setToastMessage('회원 정보를 불러오는 데 실패했어요');
      } finally {
        setIsMemberInfoLoading(false);
      }
    })();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setMemberInfo((prev) => ({ ...prev, memberPhoneNumber: input }));
  };

  const handleStudentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setMemberInfo((prev) => ({ ...prev, memberStudentNumber: input }));
  };

  const handleGoNext = async () => {
    if (disabled) return;

    if (state?.isSettingPage) {
      setIsLoading(true);
      try {
        await postMemberInfo(memberInfo);
        await refetchMemberInfo();
        navigate(ROUTE.SETTING);
        setToastMessage('회원 정보가 저장되었어요');
      } catch (error) {
        setToastMessage(`회원 정보를 저장하는 데 실패했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsButtonLoading(true);
    setTimeout(() => {
      setIsButtonLoading(false);
      navigate(ROUTE.MEMBER_INFO_CONFIRM, { state: { memberInfo } });
    }, 500);
  };

  const handleButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleGoNext();
  };

  const handleGenderChange = (gender: Gender) => {
    setMemberInfo((prev) => ({ ...prev, memberGender: gender }));
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleGoNext();
    }
  };

  const handleNextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      studentNumberRef.current?.focus();
    }
  };

  const studentNumberRef = useRef<HTMLInputElement>(null);

  const disabled =
    !memberInfo.memberMajor?.trim() ||
    !memberInfo.memberStudentNumber?.trim() ||
    !memberInfo.memberPhoneNumber?.trim() ||
    isButtonLoading ||
    isLoading;

  return (
    <div className="relative h-full px-[20px] pt-[56px]">
      <div className="absolute left-0 top-0">
        <AppBar />
      </div>

      <form onSubmit={handleButtonClick} className="h-full">
        <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[40px]">
          <Title2 text={state?.isSettingPage ? '회원 정보 수정' : '회원님의 정보를 알려주세요'} />

          {isMemberInfoLoading ? (
            <div>
              <Skeleton width={100} height={16} count={1} borderRadius={14} />
              <Skeleton height={47} count={3} borderRadius={14} className="mt-[10px]" />
              <Skeleton width={100} height={16} count={1} borderRadius={14} className="mt-[40px]" />
              <Skeleton height={47} count={3} borderRadius={14} className="mt-[10px]" />
            </div>
          ) : (
            <div className="flex flex-col gap-[20px] pb-[80px]">
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
                  onKeyDown={handleNextInput}
                />
                <Input
                  inputMode="numeric"
                  label="학번"
                  name="memberStudentNumber"
                  placeholder="학번을 입력해 주세요"
                  value={memberInfo.memberStudentNumber}
                  onChange={handleStudentNumberChange}
                  onKeyDown={handleEnterPress}
                  ref={studentNumberRef}
                />
              </div>
            </div>
          )}
        </ScrollView>

        <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
          <Button
            text={state?.isSettingPage ? '저장' : '다음'}
            disabled={disabled}
            isLoading={isButtonLoading || isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default MemberInfoWritePage;
