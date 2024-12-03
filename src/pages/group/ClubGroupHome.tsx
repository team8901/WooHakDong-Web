import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetGroupsByClubId from '@hooks/group/useGetGroupsByClubId';
import ListItem from '@pages/group/components/ListItem';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const ClubGroupHomePage = () => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const {
    data: clubId,
    isError: isClubIdError,
    isLoading: isClubIdLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName ?? '' });
  const {
    data: groupsResult,
    refetch: refretchGroups,
    isError: isGroupsError,
    isLoading: isGroupsLoading,
  } = useGetGroupsByClubId({ clubId: clubId ?? 0 });
  const { setToastMessage } = useToast();

  const handleRefresh = async () => {
    await refretchGroups();
    setToastMessage('모임 정보를 갱신했어요');
  };

  useEffect(() => {
    if (isGroupsError || isClubIdError) {
      setToastMessage('모임 정보를 불러오는 중 오류가 발생했어요');
    }
  }, [isGroupsError, isClubIdError]);

  const isLoading = isClubIdLoading || isGroupsLoading;

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-[20px] px-[20px]">
          <Skeleton height={72} count={5} borderRadius={14} className="mt-[20px]" />
        </div>
      ) : (
        <CustomPullToRefresh onRefresh={handleRefresh}>
          {groupsResult?.result.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyText text="아직 등록된 모임이 없어요" />
            </div>
          ) : (
            <div className="flex flex-col gap-[20px] py-[20px]">
              {groupsResult?.result.map((group, index) => (
                <div key={group.groupId} className="flex flex-col gap-[20px] px-[20px]">
                  {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                  <ListItem group={group} />
                </div>
              ))}
            </div>
          )}
        </CustomPullToRefresh>
      )}
    </div>
  );
};

export default ClubGroupHomePage;
