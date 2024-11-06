import AppBar from '@components/AppBar';
import Body4 from '@components/Body4';
import ScrollView from '@components/ScrollView';
import { getClubInfo } from '@libs/api/club';
import { getClubMemberList } from '@libs/api/clubMember';
// import { CLUB_MEMBER_DATA } from '@libs/constant/clubMember';
import ListItem from '@pages/clubMember/components/ListItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubMemberResponseData } from 'types/clubMember';

const ClubMemberHomePage = () => {
  const [officeMemberList, setOfficeMemberList] = useState<ClubMemberResponseData[]>([]);
  const [memberList, setMemberList] = useState<ClubMemberResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  useEffect(() => {
    (async () => {
      if (!clubEnglishName) return;

      const { clubId } = await getClubInfo({
        clubEnglishName,
      });

      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0]; // Format as YYYY-MM-DD

      const { result } = await getClubMemberList({ clubId, clubMemberAssignedTerm: formattedDate });

      const officeMember = result.filter((member) => member.clubMemberRole !== 'MEMBER');
      const member = result.filter((member) => member.clubMemberRole === 'MEMBER');
      // const officeMember = CLUB_MEMBER_DATA.filter((member) => member.clubMemberRole !== 'MEMBER');
      // const member = CLUB_MEMBER_DATA.filter((member) => member.clubMemberRole === 'MEMBER');

      setOfficeMemberList(officeMember);
      setMemberList(member);
    })();
  }, []);

  return (
    <div className="relative h-full pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <ScrollView fadeTop className="flex h-full flex-col gap-[20px]">
        <div className="flex flex-col gap-[20px] px-[20px] pt-[20px]">
          <Body4 text="임원진" className="text-darkGray" />
          {officeMemberList.length === 0 ? (
            <div className="flex h-full items-center justify-center">아직 가입한 회원이 없어요.</div>
          ) : (
            <div className="flex flex-col gap-[20px]">
              <ListItem member={officeMemberList[0]} />
              {officeMemberList.slice(1).map((member) => (
                <div key={member.memberId} className="flex flex-col gap-[20px]">
                  <div className="h-[0.6px] bg-lightGray" />
                  <ListItem member={member} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-[10px] flex-shrink-0 bg-lightGray" />

        <div className="flex flex-col gap-[20px] px-[20px]">
          <Body4 text="일반 회원" className="text-darkGray" />
          {memberList.length === 0 ? (
            <div className="flex h-full items-center justify-center">아직 가입한 회원이 없어요.</div>
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
