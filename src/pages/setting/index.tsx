import ChevronRightGrayIcon from '@assets/images/chevrons/ChevronRightGrayIcon';
import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body4 from '@components/Body4';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import { useAuth } from '@contexts/AuthContext';
import { useToast } from '@contexts/ToastContext';
import useGetMemberInfo from '@hooks/member/useGetMemberInfo';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { GENDER_TYPE } from '@libs/constant/member';
import ROUTE from '@libs/constant/path';
import formatPhoneNumber from '@libs/util/formatPhoneNumber';
import { useNavigate } from 'react-router-dom';

const SettingPage = () => {
  const navigate = useNavigate();
  const customNavigate = useCustomNavigate();
  const { logout } = useAuth();
  const { setToastMessage } = useToast();
  const { data: memberInfo } = useGetMemberInfo();

  const handleLogout = () => {
    logout();
    setToastMessage('로그아웃 되었어요');
    navigate(ROUTE.LOGIN_REGISTER);
  };

  return (
    <div className="relative h-full px-[20px] pt-[56px]">
      <div className="absolute left-0 top-0">
        <AppBar goBackCallback={() => customNavigate(ROUTE.MEMBER)} title="설정" />
      </div>

      <ScrollView className="flex h-full flex-col gap-[20px]">
        <div className="flex flex-col gap-[12px]">
          <Caption2 text="내 정보" />
          <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[12px]">
            <div className="flex items-center gap-[32px] px-[20px]">
              <div className="flex flex-shrink-0 flex-col items-center">
                <Body1 text={memberInfo?.memberName ?? ''} />
                <Caption2 text={GENDER_TYPE[memberInfo?.memberGender ?? 'MAN']} className="text-darkGray" />
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-[4px]">
                  <div className="flex flex-col">
                    <Body4 text={formatPhoneNumber(memberInfo?.memberPhoneNumber ?? '')} />
                    <Body4 text={memberInfo?.memberEmail ?? ''} />
                  </div>
                  <div className="h-[0.6px] bg-lightGray" />
                  <div className="flex flex-col">
                    <Body4 text={memberInfo?.memberStudentNumber ?? ''} />
                    <div className="flex items-center gap-[4px]">
                      <Body4 text={memberInfo?.memberSchool ?? ''} />
                      <div className="h-[8px] w-[1px] bg-gray" />
                      <Body4 text={memberInfo?.memberMajor ?? ''} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex h-[32px] items-center justify-center rounded-[7px] bg-lightGray p-[8px]"
              onClick={() => customNavigate(ROUTE.MEMBER_INFO_WRITE, { state: { memberInfo, isSettingPage: true } })}
            >
              <Caption2 text="내 정보 수정" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <Caption2 text="이용 안내" />
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between py-[12px]"
              onClick={() =>
                window.open(
                  'https://jjunhub.notion.site/956afbccfda44b87bf0c23dd7662b115?pvs=4',
                  '서비스 이용약관',
                  'noopener',
                )
              }
            >
              <Body1 text="서비스 이용약관" />
              <ChevronRightGrayIcon />
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between py-[12px]"
              onClick={() =>
                window.open(
                  'https://jjunhub.notion.site/cc5e593f28234357ad49544a9a56d8bc?pvs=4',
                  '개인정보 처리방침',
                  'noopener',
                )
              }
            >
              <Body1 text="개인정보 처리방침" />
              <ChevronRightGrayIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <Caption2 text="서비스" />
          <div>
            <button type="button" className="flex w-full items-center justify-between py-[12px]" onClick={handleLogout}>
              <Body1 text="로그아웃" />
              <ChevronRightGrayIcon />
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-between py-[12px]"
              onClick={() => customNavigate(ROUTE.INQUIRY, { state: { memberEmail: memberInfo?.memberEmail } })}
            >
              <Body1 text="고객센터" />
              <ChevronRightGrayIcon />
            </button>
          </div>
        </div>
      </ScrollView>
    </div>
  );
};

export default SettingPage;
