import PersonIcon from '@assets/images/group/PersonIcon';
import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Caption2 from '@components/Caption2';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetGroupsByClubId from '@hooks/group/useGetGroupsByClubId';
import { useParams } from 'react-router-dom';

const ClubGroupHomePage = () => {
  // const [groupList, setGroupList] = useState<GroupInfoByGroupIdResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { data: clubId } = useGetClubId({ clubEnglishName: clubEnglishName ?? '' });
  const { data: groupsResult } = useGetGroupsByClubId({ clubId: clubId ?? 0 });

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <div className="flex flex-col gap-[20px] py-[20px]">
        {groupsResult?.result.map((group, index) => (
          <div key={group.groupId} className="flex flex-col gap-[20px] px-[20px]">
            {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
            <div className="flex flex-col">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubGroupHomePage;
