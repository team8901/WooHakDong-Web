import AppBar from '@components/AppBar';
import Body4 from '@components/Body4';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubMembers from '@hooks/clubMember/useGetClubMembers';
import useGetClubMembersMy from '@hooks/clubMember/useGetClubMembersMy';
import calculateClubAssignedTerm from '@libs/util/calculateClubAssignedTerm';
import ListItem from '@pages/clubMember/components/ListItem';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { ClubMemberResponseData } from 'types/clubMember';

const ClubMemberHomePage = () => {
  const [officeMemberList, setOfficeMemberList] = useState<ClubMemberResponseData[]>([]);
  const [memberList, setMemberList] = useState<ClubMemberResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [myInfo, setMyInfo] = useState<ClubMemberResponseData>({} as ClubMemberResponseData);
  const { setToastMessage } = useToast();
  const {
    data: clubId,
    isError: isClubIdError,
    isLoading: isClubIdLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName ?? '' });
  const {
    data: clubMembers,
    isError: isClubMembersError,
    isLoading: isClubMembersLoading,
    refetch: refetchClubMembers,
  } = useGetClubMembers({
    clubId: clubId ?? 0,
    clubMemberAssignedTerm: calculateClubAssignedTerm(),
  });
  const {
    data: clubMembersMy,
    isError: isClubMembersMyError,
    isLoading: isClubMembersMyLoading,
  } = useGetClubMembersMy({ clubId: clubId ?? 0 });

  const processCanClick = (member: ClubMemberResponseData) => {
    return member.clubMemberRole !== 'MEMBER' || myInfo.clubMemberRole !== 'MEMBER';
  };

  const handleRefresh = async () => {
    const { data } = await refetchClubMembers();
    if (!data) return;

    const { result } = data;
    const officeMember = result.filter((member) => member.clubMemberRole !== 'MEMBER');
    const member = result.filter((member) => member.clubMemberRole === 'MEMBER');

    setOfficeMemberList(officeMember);
    setMemberList(member);

    setToastMessage('회원 목록을 갱신했어요');
  };

  useEffect(() => {
    if (!clubMembers) return;

    const { result } = clubMembers;
    const officeMember = result.filter((member) => member.clubMemberRole !== 'MEMBER');
    const member = result.filter((member) => member.clubMemberRole === 'MEMBER');

    setOfficeMemberList(officeMember);
    setMemberList(member);
  }, [clubMembers]);

  useEffect(() => {
    if (!clubMembersMy) return;

    setMyInfo(clubMembersMy);
  }, [clubMembersMy]);

  useEffect(() => {
    if (isClubIdError || isClubMembersError || isClubMembersMyError) {
      setToastMessage(`회원 정보를 불러오는 중 오류가 발생했어요`);
    }
  }, [isClubIdError, isClubMembersError, isClubMembersMyError]);

  const isLoading = isClubIdLoading || isClubMembersLoading || isClubMembersMyLoading;

  return (
    <div className="relative h-full pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-[20px] px-[20px] pt-[40px]">
          <Skeleton width={100} height={20} count={1} borderRadius={14} />
          <Skeleton height={47} count={2} borderRadius={14} className="mt-[10px]" />
          <Skeleton width={100} height={20} count={1} borderRadius={14} className="mt-[20px]" />
          <Skeleton height={47} count={3} borderRadius={14} className="mt-[10px]" />
        </div>
      ) : (
        <div className="flex h-full flex-col gap-[20px]">
          <CustomPullToRefresh onRefresh={handleRefresh}>
            <div className="flex flex-col gap-[20px] pb-[50px]">
              <div className="flex flex-col gap-[20px] px-[20px] pt-[20px]">
                <Body4 text="임원진" className="text-darkGray" />
                {officeMemberList.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <EmptyText text="아직 가입한 회원이 없어요" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-[20px]">
                    {officeMemberList.map((member, index) => (
                      <div key={member.memberId} className="flex flex-col gap-[20px]">
                        {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                        <ListItem member={member} canClick={processCanClick(member)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-[3px] flex-shrink-0 bg-lightGray" />

              <div className="flex flex-col gap-[20px] px-[20px]">
                <Body4 text="일반 회원" className="text-darkGray" />
                {memberList.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <EmptyText text="아직 가입한 회원이 없어요" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-[20px]">
                    {memberList.map((member, index) => (
                      <div key={member.memberId} className="flex flex-col gap-[20px]">
                        {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                        <ListItem member={member} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CustomPullToRefresh>
        </div>
      )}
    </div>
  );
};

export default ClubMemberHomePage;
