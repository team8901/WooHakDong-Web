import ChevronRightGrayIcon from '@assets/images/chevrons/ChevronRightGrayIcon';
import Body2 from '@components/Body2';
import Caption2 from '@components/Caption2';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { CLUB_MEMBER_ROLE } from '@libs/constant/clubMember';
import ROUTE from '@libs/constant/path';
import { ClubMemberListProps } from 'types/clubMember';

const ListItem = ({ member }: Readonly<ClubMemberListProps>) => {
  const navigate = useCustomNavigate();

  const handleMemberClick = () => {
    navigate(`${ROUTE.MEMBER}/${member.memberId}`, { state: { member } });
  };

  return (
    <button className="flex items-center justify-between" onClick={() => handleMemberClick()}>
      <div className="flex flex-col items-start gap-[2px]">
        <div className="flex items-center gap-[4px]">
          <Body2 text={member.memberName} className="line-clamp-1 text-start" />
          {member.clubMemberRole !== 'MEMBER' && (
            <div className="flex h-[18px] items-center justify-center rounded-[7px] bg-lightPrimary px-[6px] text-primary">
              <Caption2 text={CLUB_MEMBER_ROLE[member.clubMemberRole]} />
            </div>
          )}
          {member.memberId === 4 && (
            <div className="flex h-[18px] items-center justify-center rounded-[7px] bg-gray px-[6px] text-white">
              <Caption2 text={'나'} />
            </div>
          )}
        </div>
        <Body2 text={member.memberMajor} className="text-darkGray" />
      </div>
      <ChevronRightGrayIcon />
    </button>
  );
};

export default ListItem;
