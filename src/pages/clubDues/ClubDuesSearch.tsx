import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import ScrollView from '@components/ScrollView';
import { useSearch } from '@contexts/SearchContext';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubDues from '@hooks/dues/useGetClubDues';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import ListItem from '@pages/clubDues/components/ListItem';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

const ClubDuesSearchPage = () => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { searchQuery, setSearchQuery } = useSearch();
  const customNavigate = useCustomNavigate();
  const { setToastMessage } = useToast();
  const {
    data: clubId,
    isError: isClubIdError,
    isLoading: isClubIdLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName ?? '' });
  const {
    data: clubDues,
    isError: isClubDuesError,
    isLoading: isClubDuesLoading,
  } = useGetClubDues({ clubId: clubId ?? 0, keyword: searchQuery });

  const handleGoBack = () => {
    setSearchQuery('');
    customNavigate(ROUTE.DUES);
  };

  useEffect(() => {
    if (isClubIdError || isClubDuesError) {
      setToastMessage(`회비 정보를 불러오는 중 오류가 발생했어요`);
    }
  }, [isClubIdError, isClubDuesError]);

  const isLoading = isClubIdLoading || isClubDuesLoading;

  return (
    <div className="relative h-full pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar goBackCallback={handleGoBack} hasSearch showSearchInput />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-[20px] px-[20px]">
          <Skeleton height={44} count={5} borderRadius={14} className="mt-[20px]" />
        </div>
      ) : (
        <ScrollView fadeTop className="flex h-full flex-col gap-[20px] px-[20px]">
          {clubDues?.result.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyText text="아직 등록된 물품이 없어요" />
            </div>
          ) : (
            <div className="flex flex-col gap-[20px] pb-[80px]">
              {clubDues?.result.map((dues, index) => (
                <div key={dues.clubAccountHistoryId} className="flex flex-col gap-[20px]">
                  {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                  <ListItem dues={dues} />
                </div>
              ))}
            </div>
          )}
        </ScrollView>
      )}
    </div>
  );
};

export default ClubDuesSearchPage;
