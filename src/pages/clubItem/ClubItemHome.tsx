import ChevronBottomBlackIcon from '@assets/images/chevrons/ChevronBottomBlackIcon';
import AppBar from '@components/AppBar';
import Caption1 from '@components/Caption1';
import Caption2 from '@components/Caption2';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import { useSearch } from '@contexts/SearchContext';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubItems from '@hooks/item/useGetClubItems';
import useGetClubItemsMy from '@hooks/item/useGetClubItemsMy';
import useBottomSheet from '@hooks/useBottomSheet';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useTabNav from '@hooks/useTabNav';
import { CLUB_ITEM_CATEGORY, CLUB_ITEM_SORT_OPTIONS } from '@libs/constant/item';
import ROUTE from '@libs/constant/path';
import BottomSheet from '@pages/clubItem/components/BottomSheet';
import ListItem from '@pages/clubItem/components/ListItem';
import TabNav from '@pages/clubItem/components/TabNav';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { ClubItemResponseData, ClubItemsMyResponseData } from 'types/item';

const ClubItemHomePage = () => {
  const [itemList, setItemList] = useState<ClubItemResponseData[]>([]);
  const [filteredItemList, setFilteredItemList] = useState<ClubItemResponseData[]>([]);
  const [myBorrowedItemList, setMyBorrowedItemList] = useState<ClubItemsMyResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { searchQuery } = useSearch();
  const navigate = useCustomNavigate();
  const { activeTab, handleTabChange } = useTabNav({ onClickTab: () => filterData(itemList) });
  const { isOpen, selectedOption, bottomSheetRef, setIsOpen, setSelectedOption } = useBottomSheet({
    onSelectOption: () => filterData(itemList),
    multiple: true,
  });
  const { setToastMessage } = useToast();
  const {
    data: clubId,
    isError: isClubInfoError,
    isLoading: isClubInfoLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName || '' });
  const {
    data: clubItemsData,
    refetch: refetchClubItems,
    isError: isClubItemsError,
    isLoading: isClubItemsLoading,
  } = useGetClubItems({ clubId: clubId || 0 });
  const {
    data: clubItemsMyData,
    isError: isClubItemsMyError,
    isLoading: isClubItemsMyLoading,
  } = useGetClubItemsMy({ clubId: clubId || 0 });

  const getItemStatus = (item: ClubItemResponseData) => {
    if (!item.itemAvailable) return '대여 불가';
    if (item.itemUsing) return '대여 중';
    return '대여 가능';
  };

  const filterData = (itemList: ClubItemResponseData[]) => {
    if (!clubItemsData) return;

    const tabData = activeTab === 'ALL' ? itemList : itemList.filter((item) => item.itemCategory === activeTab);

    const selectedLabels = (selectedOption as number[]).map((option) => CLUB_ITEM_SORT_OPTIONS[option].label);
    const isSelectAll = selectedLabels.length === 0 || selectedLabels.length === CLUB_ITEM_SORT_OPTIONS.length;

    if (isSelectAll) {
      setFilteredItemList(tabData);
      return;
    }

    const filteredResult = tabData.filter((item) => selectedLabels.includes(getItemStatus(item)));
    setFilteredItemList(filteredResult);
  };

  const isMyBorrowedItem = (itemId: number) => myBorrowedItemList.some((item) => item.itemId === itemId);

  const getBorrowedReturnDate = (itemId: number) => {
    const item = myBorrowedItemList.find((item) => item.itemId === itemId);
    return item?.itemBorrowedReturnDate;
  };

  const handleRefresh = async () => {
    const { data } = await refetchClubItems();
    if (!data) return;

    const { result } = data;
    setItemList(result);
    filterData(result);

    if (activeTab === 'ALL') {
      setToastMessage('물품 정보를 갱신했어요');
    } else {
      setToastMessage(`${CLUB_ITEM_CATEGORY[activeTab]} 카테고리의 물품 정보를 갱신했어요`);
    }
  };

  useEffect(() => {
    if (!clubItemsData) return;

    const { result } = clubItemsData;

    setItemList(result);
    setFilteredItemList(result);
  }, [clubItemsData]);

  useEffect(() => {
    if (!clubItemsMyData) return;

    const { result } = clubItemsMyData;

    setMyBorrowedItemList(result);
  }, [clubItemsMyData]);

  useEffect(() => {
    if (!searchQuery) return;

    navigate(ROUTE.ITEM_SEARCH);
  }, [searchQuery]);

  useEffect(() => {
    if (isClubInfoError || isClubItemsError || isClubItemsMyError) {
      setToastMessage('물품 정보를 불러오는 중 오류가 발생했어요');
    }
  }, [isClubInfoError, isClubItemsError, isClubItemsMyError]);

  const isLoading = isClubInfoLoading || isClubItemsLoading || isClubItemsMyLoading;

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu hasSearch />
      </div>

      <TabNav activeTab={activeTab} handleTabChange={handleTabChange} />

      <div className="flex px-[20px] pb-[10px] pt-[20px]">
        {(selectedOption as number[]).length === 0 ? (
          <button
            type="button"
            className="flex h-[32px] items-center gap-[4px] rounded-[20px] border border-lightGray pl-[12px] pr-[6px]"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Caption2 text="대여 상태" />
            <ChevronBottomBlackIcon className={`transform transition-all ${isOpen && '-rotate-180'}`} />
          </button>
        ) : (
          <div className="flex items-center gap-[8px]">
            {(selectedOption as number[]).map((option) => (
              <button
                key={CLUB_ITEM_SORT_OPTIONS[option].label}
                type="button"
                className="flex h-[32px] items-center gap-[4px] rounded-[20px] bg-lightPrimary px-[12px]"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <Caption1 text={CLUB_ITEM_SORT_OPTIONS[option].label} className="text-primary" />
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-[20px] px-[20px]">
          <Skeleton height={72} count={5} borderRadius={14} className="mt-[20px]" />
        </div>
      ) : (
        <div className="flex h-full flex-col gap-[20px] px-[20px]">
          <CustomPullToRefresh onRefresh={handleRefresh}>
            {filteredItemList.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <EmptyText
                  text={`${activeTab === 'ALL' ? '아직' : `${CLUB_ITEM_CATEGORY[activeTab]} 카테고리에`} 등록된 물품이 없어요`}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-[20px] pb-[80px] pt-[10px]">
                {filteredItemList.map((item, index) => (
                  <div key={item.itemId} className="flex flex-col gap-[20px]">
                    {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                    <ListItem
                      item={item}
                      borrowedReturnDate={
                        isMyBorrowedItem(item.itemId) ? getBorrowedReturnDate(item.itemId) : undefined
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </CustomPullToRefresh>
        </div>
      )}

      <BottomSheet
        isOpen={isOpen}
        selectedOption={selectedOption}
        bottomSheetRef={bottomSheetRef}
        setSelectedOption={setSelectedOption}
        multiple
      />
    </div>
  );
};

export default ClubItemHomePage;
