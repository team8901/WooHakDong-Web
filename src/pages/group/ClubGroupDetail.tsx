import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import { useLocation, useNavigate } from 'react-router-dom';
import { GroupInfoByGroupIdResponseData } from 'types/group';

const ClubGroupDetailPage = () => {
  const { state } = useLocation();
  const group: GroupInfoByGroupIdResponseData = state.group;
  const navigate = useNavigate();

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
              <Body1 text={group.groupName} />
              <Body1 text={group.groupDescription} />
              <Body1 text={`${group.groupAmount.toLocaleString()}원`} />
              <Body1 text={`${group.groupMemberCount}명 참여 / ${group.groupMemberLimit}명 모집`} />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Caption2
              text={group.groupAmount === 0 ? '모임 채팅방 링크' : '모임 결제 링크'}
              className="text-darkGray"
            />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
              <button
                type="button"
                onClick={() =>
                  window.open(
                    group.groupAmount === 0 ? group.groupChatLink : group.groupJoinLink,
                    '모임 가입 주소',
                    'noopener',
                  )
                }
                className="text-start"
              >
                <Body1 text={group.groupChatLink} />
              </button>
            </div>
          </div>
        </div>
      </ScrollView>
    </div>
  );
};

export default ClubGroupDetailPage;
