import PersonIcon from '@assets/images/group/PersonIcon';
import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Caption2 from '@components/Caption2';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import { GroupInfoByGroupIdResponseData } from 'types/group';

const ListItem = ({ group }: { group: GroupInfoByGroupIdResponseData }) => {
  const navigate = useCustomNavigate();

  return (
    <button
      type="button"
      className="flex flex-col text-start"
      onClick={() => navigate(`${ROUTE.GROUP_DETAIL}/${group.groupId}`, { state: { group } })}
    >
      <div className="flex flex-col gap-[2px]">
        <div className="flex items-center gap-[4px]">
          <Body2 text={group.groupName ?? ''} />
          {!group.groupIsActivated ||
            (group.groupMemberLimit === group.groupMemberCount && (
              <div className="flex items-center gap-[2px] rounded-[8px] bg-lightGray px-[6px] py-[1px]">
                <span className="text-[1.2rem] text-darkGray">마감된 모임</span>
              </div>
            ))}
        </div>
        <Body1 text={`${group.groupAmount.toLocaleString()}원`} />
      </div>
      <div className="flex items-center gap-[2px] self-end">
        <PersonIcon />
        <Caption2 text={`${group.groupMemberCount} / ${group.groupMemberLimit}`} className="text-darkGray" />
      </div>
    </button>
  );
};

export default ListItem;
