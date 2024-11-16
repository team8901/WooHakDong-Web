import AppBar from '@components/AppBar';
import Body4 from '@components/Body4';
import EmptyText from '@components/EmptyText';
import ScrollView from '@components/ScrollView';
import { useToast } from '@contexts/ToastContext';
import useLoading from '@hooks/useLoading';
import { getClubInfo } from '@libs/api/club';
import { getClubMemberList, getClubMyInfo } from '@libs/api/clubMember';
// import { CLUB_MEMBER_DATA } from '@libs/constant/clubMember';
import ListItem from '@pages/clubMember/components/ListItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubMemberResponseData } from 'types/clubMember';

const ClubMemberHomePage = () => {
  const [officeMemberList, setOfficeMemberList] = useState<ClubMemberResponseData[]>([]);
  const [memberList, setMemberList] = useState<ClubMemberResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [myInfo, setMyInfo] = useState<ClubMemberResponseData>({} as ClubMemberResponseData);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();

  const calculateClubAssignedTerm = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (month >= 7) {
      return `${year}-07-01`;
    } else {
      return `${year}-03-01`;
    }
  };

  useEffect(() => {
    (async () => {
      if (!clubEnglishName) return;

      setIsLoading(true);
      try {
        const { clubId } = await getClubInfo({
          clubEnglishName,
        });

        const { result } = await getClubMemberList({ clubId, clubMemberAssignedTerm: calculateClubAssignedTerm() });

        const officeMember = result.filter((member) => member.clubMemberRole !== 'MEMBER');
        const member = result.filter((member) => member.clubMemberRole === 'MEMBER');
        // const officeMember = CLUB_MEMBER_DATA.filter((member) => member.clubMemberRole !== 'MEMBER');
        // const member = CLUB_MEMBER_DATA.filter((member) => member.clubMemberRole === 'MEMBER');

        setOfficeMemberList(officeMember);
        setMemberList(member);

        const myInfo = await getClubMyInfo({ clubId });
        setMyInfo(myInfo);
      } catch (error) {
        console.error(error);
        setToastMessage(`회원 정보를 불러오는 중 오류가 발생했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const processCanClick = (member: ClubMemberResponseData) => {
    return member.clubMemberRole !== 'MEMBER' || myInfo.clubMemberRole !== 'MEMBER';
  };

  if (isLoading) return <div>로딩 중...</div>;
  return (
    <div className="relative h-full pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <ScrollView fadeTop className="flex h-full flex-col gap-[20px]">
        <div className="flex flex-col gap-[20px] px-[20px] pt-[20px]">
          <Body4 text="임원진" className="text-darkGray" />
          {officeMemberList.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyText text="아직 가입한 회원이 없어요" />
            </div>
          ) : (
            <div className="flex flex-col gap-[20px]">
              <ListItem member={officeMemberList[0]} canClick={processCanClick(officeMemberList[0])} />
              {officeMemberList.slice(1).map((member) => (
                <div key={member.memberId} className="flex flex-col gap-[20px]">
                  <div className="h-[0.6px] bg-lightGray" />
                  <ListItem member={member} canClick={processCanClick(member)} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-[10px] flex-shrink-0 bg-lightGray" />

        <div className="flex flex-col gap-[20px] px-[20px]">
          <Body4 text="일반 회원" className="text-darkGray" />
          {memberList.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyText text="아직 가입한 회원이 없어요" />
            </div>
          ) : (
            <div className="flex flex-col gap-[20px]">
              <ListItem member={memberList[0]} />
              {memberList.slice(1).map((member) => (
                <div key={member.memberId} className="flex flex-col gap-[20px]">
                  <div className="h-[0.6px] bg-lightGray" />
                  <ListItem member={member} />
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollView>
    </div>
  );
};

export default ClubMemberHomePage;
