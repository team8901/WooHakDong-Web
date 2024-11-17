import ChevronBottomGrayIcon from '@assets/images/chevrons/ChevronBottomGrayIcon';
import RefreshIcon from '@assets/images/dues/RefreshIcon';
import AppBar from '@components/AppBar';
import Body4 from '@components/Body4';
import Caption2 from '@components/Caption2';
import EmptyText from '@components/EmptyText';
import Title1 from '@components/Title1';
import { useToast } from '@contexts/ToastContext';
import useBottomSheet from '@hooks/useBottomSheet';
import useLoading from '@hooks/useLoading';
import { getClubInfo } from '@libs/api/club';
import { getClubAccount, getClubDues } from '@libs/api/dues';
import { CLUB_DUES_SORT_OPTIONS } from '@libs/constant/dues';
import { formatDate } from '@libs/util/formatDate';
import formatMoney from '@libs/util/formatMoney';
import BottomSheet from '@pages/clubDues/components/BottomSheet';
// import { CLUB_DUES_DATA } from '@libs/constant/dues';
import ListItem from '@pages/clubDues/components/ListItem';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { ClubDuesResponseData } from 'types/dues';
import CustomPullToRefresh from '@components/PullToRefresh';

const ClubDuesHomePage = () => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [duesList, setDuesList] = useState<ClubDuesResponseData[]>([]);
  const [filteredDuesList, setFilteredDuesList] = useState<ClubDuesResponseData[]>([]);
  const [accountInfo, setAccountInfo] = useState({
    clubAccountBankName: '',
    clubAccountNumber: '',
    clubAccountLastUpdateDate: '',
    clubAccountBalance: 0,
  });
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const [clubId, setClubId] = useState(0);

  const filterData = () => {
    if (CLUB_DUES_SORT_OPTIONS[selectedOption].value === 'ALL') {
      setFilteredDuesList(duesList);
      return;
    }

    const filteredResult = duesList.filter(
      (dues) => dues.clubAccountHistoryInOutType === CLUB_DUES_SORT_OPTIONS[selectedOption].value,
    );

    setFilteredDuesList(filteredResult);
  };

  const { isOpen, selectedOption, bottomSheetRef, setIsOpen, setSelectedOption } = useBottomSheet(filterData);

  const getDuesList = async ({ clubId }: { clubId: number }) => {
    if (!clubId) return;

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    const { result } = await getClubDues({ clubId, year, month });

    setDuesList(result);

    if (CLUB_DUES_SORT_OPTIONS[selectedOption].value === 'ALL') {
      setFilteredDuesList(result);
    } else {
      const filteredResult = duesList.filter(
        (dues) => dues.clubAccountHistoryInOutType === CLUB_DUES_SORT_OPTIONS[selectedOption].value,
      );

      setFilteredDuesList(filteredResult);
    }

    const { clubAccountBankName, clubAccountNumber, clubAccountLastUpdateDate, clubAccountBalance } =
      await getClubAccount({ clubId });
    setAccountInfo({ clubAccountBankName, clubAccountNumber, clubAccountLastUpdateDate, clubAccountBalance });
  };

  useEffect(() => {
    (async () => {
      if (!clubEnglishName) return;

      setIsLoading(true);
      try {
        const { clubId } = await getClubInfo({
          clubEnglishName,
        });
        setClubId(clubId);

        await getDuesList({ clubId });
      } catch (error) {
        console.error(error);
        setToastMessage(`회비 정보를 불러오는 중 오류가 발생했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
    // setDuesList(CLUB_DUES_DATA);
    // setFilteredDuesList(CLUB_DUES_DATA);
  }, []);

  const handleRefresh = async () => {
    await getDuesList({ clubId });

    setToastMessage('회비 내역을 갱신했어요');
  };

  return (
    <div className="relative h-full pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <div className="flex flex-col items-end gap-[4px] px-[20px] py-[20px] pb-[40px]">
        <Caption2 text={`${accountInfo.clubAccountBankName} ${accountInfo.clubAccountNumber}`} />
        <Title1 text={formatMoney(accountInfo.clubAccountBalance)} className="text-[2.8rem] font-extrabold" />
      </div>

      <div className="flex items-center justify-between px-[20px]">
        <button type="button" className="flex items-center gap-[4px]" onClick={() => setIsOpen((prev) => !prev)}>
          <Body4 text={CLUB_DUES_SORT_OPTIONS[selectedOption].label} className="text-darkGray" />
          <ChevronBottomGrayIcon className={`transform transition-all ${isOpen && '-rotate-180'}`} />
        </button>
        <div className="flex items-center gap-[4px]">
          <Body4
            text={`${new Date(accountInfo.clubAccountLastUpdateDate).getFullYear()}년 ${formatDate(accountInfo.clubAccountLastUpdateDate)} 기준`}
            className="text-darkGray"
          />
          <button type="button" onClick={handleRefresh}>
            <RefreshIcon />
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
        <div className="h-full flex-col gap-[20px] px-[20px] py-[20px]">
          <CustomPullToRefresh onRefresh={handleRefresh}>
            {filteredDuesList.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <EmptyText text="아직 사용한 회비가 없어요" />
              </div>
            ) : (
              <div className="flex flex-col gap-[20px] pb-[50px]">
                <ListItem dues={filteredDuesList[0]} />
                {filteredDuesList.slice(1).map((dues) => (
                  <div key={dues.clubAccountHistoryTranDate} className="flex flex-col gap-[20px]">
                    <div className="h-[0.6px] bg-lightGray" />
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
