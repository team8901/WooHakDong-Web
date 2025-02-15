import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import ScrollView from '@components/ScrollView';
import { useSearch } from '@contexts/SearchContext';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { getClubInfo } from '@libs/api/club';
import { getClubItems } from '@libs/api/item';
import ROUTE from '@libs/constant/path';
import SearchListItem from '@pages/clubItem/components/SearchListItem';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { ClubItemResponseData } from 'types/item';

const ClubItemSearchPage = () => {
  const [itemList, setItemList] = useState<ClubItemResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { searchQuery, setSearchQuery } = useSearch();
  const customNavigate = useCustomNavigate();
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();

  useEffect(() => {
    (async () => {
      if (!clubEnglishName) return;

      setIsLoading(true);
      try {
        const { clubId } = await getClubInfo({
          clubEnglishName,
        });

        const { result } = await getClubItems({ clubId, keyword: searchQuery });
        setItemList(result);
      } catch (error) {
        console.error(error);
        setToastMessage(`물품을 검색하는 중 오류가 발생했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchQuery]);

  const handleGoBack = () => {
    setSearchQuery('');
    customNavigate(ROUTE.ITEM);
  };

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
          {itemList.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyText text="아직 등록된 물품이 없어요" />
            </div>
          ) : (
            <div className="flex flex-col gap-[20px] pb-[80px]">
              {itemList.map((item, index) => (
                <div key={item.itemId} className="flex flex-col gap-[20px]">
                  {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                  <SearchListItem item={item} />
                </div>
              ))}
            </div>
          )}
        </ScrollView>
      )}
    </div>
  );
};

export default ClubItemSearchPage;
