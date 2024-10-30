import AppBar from '@components/AppBar';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import Button from '@components/Button';
import Title2 from '@components/Title2';
import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import ROUTE from '@libs/constant/path';

const ClubJoinNoticePage = () => {
  const navigate = usePrefixedNavigate();

  const handleButtonClick = () => {
    navigate(ROUTE.MEMBER_INFO_WRITE);
  };

  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0">
        <AppBar />
      </div>

      <div className="masked-overflow flex h-full flex-col gap-[40px] pt-[20px] scrollbar-hide">
        <div>
          <Title2 text="가입 신청 전에 " />
          <Title2 text="알아야 할 사항" className="text-primary" />
          <Title2 text="이에요" />
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[12px]">
            <Body4 text="&nbsp;1.&nbsp;&nbsp;동아리 회비 납부" />
            <div>
              <Body2
                text="임시 가입 후 2주 이내에 회비를 납부하지 않으면 탈퇴 처리돼요. "
                className="text-justify text-primary"
              />
              <Body2
                text="회비를 납부하면 이메일로 카카오톡 동아리 단체 채팅방 주소를 보내드려요."
                className="text-justify"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <Body4 text="&nbsp;2&nbsp;&nbsp;동아리 물품 대여" />
            <Body2 text="동아리 공용 물품을 쉽게 대여해서 사용할 수 있어요." className="text-justify" />
          </div>
          <div className="flex flex-col gap-[12px]">
            <Body4 text="&nbsp;3.&nbsp;&nbsp;동아리 회비 사용 내역 열람" />
            <Body2
              text="회원님이 납부한 동아리 회비를 언제 어디서 사용했는지 투명하게 볼 수 있어요."
              className="text-justify"
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <Body4 text="&nbsp;4.&nbsp;&nbsp;동아리 일정 관리" />
            <Body2
              text="캘린더를 통해서 동아리 일정을 간단하게 확인하고, 동아리 활동에 많이 참여할 수 있어요."
              className="text-justify"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button text="다 읽었어요" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinNoticePage;
