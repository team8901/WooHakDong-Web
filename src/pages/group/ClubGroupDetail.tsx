import InfoIcon from '@assets/images/dues/InfoIcon';
import ChatIcon from '@assets/images/group/ChatIcon';
import LinkIcon from '@assets/images/group/LinkIcon';
import MoneyIcon from '@assets/images/group/MoneyIcon';
import PasswordIcon from '@assets/images/group/PasswordIcon';
import PersonGrayIcon from '@assets/images/group/PersonGrayIcon';
import { default as TextInfoIcon } from '@assets/images/schedule/InfoIcon';
import TitleIcon from '@assets/images/schedule/TitleIcon';
import AppBar from '@components/AppBar';
import Caption1 from '@components/Caption1';
import Caption2 from '@components/Caption2';
import IconText from '@components/IconText';
import ScrollView from '@components/ScrollView';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GroupInfoByGroupIdResponseData } from 'types/group';

const ClubGroupDetailPage = () => {
  const { state } = useLocation();
  const group: GroupInfoByGroupIdResponseData = state.group;
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleInfoClick = () => {
    setIsInfoOpen(true);
    setTimeout(() => {
      setIsInfoOpen(false);
    }, 1500);
  };

  return (
    <div className="relative h-full pb-[70px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar goBackCallback={() => navigate(-1)} />
      </div>

      <ScrollView
        fadeTop
        fadeBottom
        className="flex h-full flex-col gap-[20px] px-[20px]"
        style={{ paddingTop: '40px' }}
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="모임 정보" className="text-darkGray" />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
              <IconText icon={<TitleIcon />} text={group.groupName} />
              <IconText icon={<TextInfoIcon />} text={group.groupDescription} />
              <IconText icon={<MoneyIcon />} text={`${group.groupAmount.toLocaleString()}원`} />
              <IconText
                icon={<PersonGrayIcon />}
                text={`${group.groupMemberCount}명 참여 / ${group.groupMemberLimit}명 모집`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            {group.groupAmount === 0 ? (
              <>
                <Caption2 text="모임 채팅방 링크" className="text-darkGray" />
                <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
                  <IconText
                    icon={<ChatIcon />}
                    text={group.groupChatLink}
                    onClick={() => window.open(group.groupChatLink, '모임 가입 링크', 'noopener')}
                  />
                  <IconText icon={<PasswordIcon />} text={group.groupChatPassword} />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-[4px]">
                  <Caption2 text="모임 결제 링크" className="text-darkGray" />
                  <button type="button" onClick={handleInfoClick} className="relative">
                    <InfoIcon />
                    {isInfoOpen && (
                      <div className="absolute bottom-[-44px] left-[-72px] z-20 flex w-[250px] items-center justify-center rounded-[12px] bg-[#7f8189cc] px-[12px] py-[8px]">
                        <Caption1 text="모임 결제 링크를 누르면 결제 페이지로 이동해요" className="text-white" />
                      </div>
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
                  <IconText
                    icon={<LinkIcon />}
                    text={group.groupJoinLink}
                    onClick={() => window.open(group.groupJoinLink, '모임 결제 링크', 'noopener')}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </ScrollView>
    </div>
  );
};

export default ClubGroupDetailPage;
