import ChevronBottomBlackIcon from '@assets/images/chevrons/ChevronBottomBlackIcon';
import ChevronBottomGrayIcon from '@assets/images/chevrons/ChevronBottomGrayIcon';
import InfoIcon from '@assets/images/dues/InfoIcon';
import AppBar from '@components/AppBar';
import Body4 from '@components/Body4';
import Caption1 from '@components/Caption1';
import Caption2 from '@components/Caption2';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import Title1 from '@components/Title1';
import { useSearch } from '@contexts/SearchContext';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubAccount from '@hooks/dues/useGetClubAccount';
import useGetClubDues from '@hooks/dues/useGetClubDues';
import useBottomSheet from '@hooks/useBottomSheet';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { CLUB_DUES_SORT_OPTIONS } from '@libs/constant/dues';
import ROUTE from '@libs/constant/path';
import { formatDate } from '@libs/util/formatDate';
import formatMoney from '@libs/util/formatMoney';
import BottomSheet from '@pages/clubDues/components/BottomSheet';
import ListItem from '@pages/clubDues/components/ListItem';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { ClubDuesResponseData } from 'types/dues';
import { ko } from 'date-fns/locale';
import convertDate from '@libs/util/convertDate';

const ClubDuesHomePage = () => {
  const navigate = useCustomNavigate();
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  // const [duesList, setDuesList] = useState<ClubDuesResponseData[]>([]);
  const [filteredDuesList, setFilteredDuesList] = useState<ClubDuesResponseData[]>([]);
  const { setToastMessage } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    data: clubId,
    isError: isClubIdError,
    isLoading: isClubIdLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName || '' });
  const {
    data: clubDuesData,
    isError: isClubDuesError,
    isLoading: isClubDuesLoading,
    refetch: refetchClubDues,
  } = useGetClubDues({
    clubId: clubId || 0,
    date: convertDate(selectedDate),
  });
  const { data: clubAccountData } = useGetClubAccount({ clubId: clubId || 0 });
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { searchQuery } = useSearch();

  const filterData = (duesList: ClubDuesResponseData[]) => {
    if (!clubDuesData) return;

    const filterValue = CLUB_DUES_SORT_OPTIONS[selectedOption].value;
    const categorizedData =
      filterValue === 'ALL' ? duesList : duesList.filter((dues) => dues.clubAccountHistoryInOutType === filterValue);

    const filteredData = categorizedData.filter((dues) => {
      const tranDate = new Date(dues.clubAccountHistoryTranDate);
      return tranDate.getFullYear() === selectedDate.getFullYear() && tranDate.getMonth() === selectedDate.getMonth();
    });
    setFilteredDuesList(filteredData);
  };

  const { isOpen, selectedOption, bottomSheetRef, setIsOpen, setSelectedOption } = useBottomSheet({
    onSelectOption: () => filterData(clubDuesData?.result ?? []),
  });

  const handleInfoClick = () => {
    setIsInfoOpen(true);
    setTimeout(() => {
      setIsInfoOpen(false);
    }, 1500);
  };

  const handleRefresh = async () => {
    const { data } = await refetchClubDues();
    if (!data) return;

    const { result } = data;
    // setDuesList(result);
    filterData(result);

    setToastMessage('회비 내역을 갱신했어요');
  };

  useEffect(() => {
    if (!clubDuesData) return;

    const { result } = clubDuesData;

    // setDuesList(result);
    filterData(result);
  }, [clubDuesData]);

  useEffect(() => {
    if (isClubIdError || isClubDuesError) {
      setToastMessage(`회비 정보를 불러오는 중 오류가 발생했어요`);
    }
  }, [isClubIdError, isClubDuesError]);

  // useEffect(() => {
  //   filterData(clubDuesData?.result ?? []);
  // }, [selectedDate]);

  useEffect(() => {
    if (!searchQuery) return;

    navigate(ROUTE.DUES_SEARCH);
  }, [searchQuery]);

  const isLoading = isClubIdLoading || isClubDuesLoading;

  return (
    <div className="relative h-full pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu hasSearch />
      </div>

      <div className="flex flex-col items-end gap-[4px] px-[20px] py-[20px] pb-[40px]">
        <Caption2 text={`${clubAccountData?.clubAccountBankName} ${clubAccountData?.clubAccountNumber}`} />
        <Title1 text={formatMoney(clubAccountData?.clubAccountBalance ?? 0)} className="text-[2.8rem] font-extrabold" />
      </div>

      <div className="flex flex-col gap-[8px] px-[20px]">
        <div className="flex items-center gap-[4px] self-end">
          <Body4
            text={`${new Date(clubAccountData?.clubAccountLastUpdateDate ?? '').getFullYear()}년 ${formatDate(clubAccountData?.clubAccountLastUpdateDate ?? '')} 기준`}
            className="text-darkGray"
          />
          <button type="button" onClick={handleInfoClick} className="relative">
            <InfoIcon />
            {isInfoOpen && (
              <div className="absolute bottom-[-44px] left-[-144px] z-20 flex items-center justify-center rounded-[12px] bg-[#7f8189cc] px-[12px] py-[8px]">
                <Caption1 text="임원이 최근 갱신한 날짜에요" className="text-white" />
              </div>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between gap-[8px]">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date!)}
            dateFormat="yyyy년 MM월"
            showMonthYearPicker
            customInput={
              <div className="flex items-center gap-[4px]">
                <Body4 text={`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월`} />{' '}
                <ChevronBottomBlackIcon />
              </div>
            }
            className="cursor-pointer"
            popperPlacement="bottom"
            locale={ko}
          />
          <button type="button" className="flex items-center gap-[4px]" onClick={() => setIsOpen((prev) => !prev)}>
            <Body4 text={CLUB_DUES_SORT_OPTIONS[selectedOption].label} className="text-darkGray" />
            <ChevronBottomGrayIcon className={`transform transition-all ${isOpen && '-rotate-180'}`} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-[20px] p-[20px]">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index}>
              <Skeleton width={200} height={20} count={2} borderRadius={14} className="mt-[4px]" />
              <div className="flex flex-col items-end">
                <Skeleton width={100} height={20} count={2} borderRadius={14} className="mt-[4px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full flex-col gap-[20px] px-[20px]">
          <CustomPullToRefresh onRefresh={handleRefresh}>
            {filteredDuesList.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <EmptyText text="아직 사용한 회비가 없어요" />
              </div>
            ) : (
              <div className="flex flex-col gap-[20px] pb-[80px] pt-[20px]">
                {filteredDuesList.map((dues, index) => (
                  <div key={dues.clubAccountHistoryTranDate} className="flex flex-col gap-[20px]">
                    {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                    <ListItem key={dues.clubAccountHistoryId} dues={dues} />
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
      />
    </div>
  );
};

export default ClubDuesHomePage;
