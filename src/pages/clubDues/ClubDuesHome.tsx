import ChevronBottomGrayIcon from '@assets/images/chevrons/ChevronBottomGrayIcon';
import CheckCircleIcon from '@assets/images/club/CheckCircleIcon';
import AppBar from '@components/AppBar';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import { getClubInfo } from '@libs/api/club';
import { getClubDues } from '@libs/api/dues';
import { CLUB_DUES_SORT_OPTIONS } from '@libs/constant/dues';
// import { CLUB_DUES_DATA } from '@libs/constant/dues';
import ListItem from '@pages/clubDues/components/ListItem';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubDuesResponseData } from 'types/dues';

const ClubDuesHomePage = () => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [duesList, setDuesList] = useState<ClubDuesResponseData[]>([]);

  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(0);
  const sortIdx = useRef(-1);
  const sortBottomSheetRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    if (!clubEnglishName) return;

    const { clubId } = await getClubInfo({
      clubEnglishName,
    });

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    const { result } = await getClubDues({ clubId, year, month });

    if (CLUB_DUES_SORT_OPTIONS[selectedSort].value === 'ALL') {
      setDuesList(result);
      return;
    }

    const filteredResult = result.filter(
      (dues) => dues.clubAccountHistoryInOutType === CLUB_DUES_SORT_OPTIONS[selectedSort].value,
    );
    setDuesList(filteredResult);
  };

  useEffect(() => {
    if (sortOpen) return;

    const isSortOn = selectedSort !== sortIdx.current;

    if (isSortOn) {
      getData();
      sortIdx.current = selectedSort;
    }
  }, [sortOpen]);

  useEffect(() => {
    getData();
    // setDuesList(CLUB_DUES_DATA);

    if (!sortBottomSheetRef.current) return;

    sortBottomSheetRef.current.addEventListener('click', (e) => {
      if (e.target === sortBottomSheetRef.current) {
        setSortOpen(false);
      }
    });
  }, []);

  return (
    <div className="relative h-full pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <div className="flex flex-col items-end gap-[4px] px-[20px] pb-[16px]">
        <Caption2 text="현재 남은 회비" />
        <Title1 text="1,240,000원" />
      </div>

      <div className="h-[5px] bg-lightGray" />

      <button
        type="button"
        className="flex items-center gap-[4px] px-[20px] pt-[16px]"
        onClick={() => setSortOpen((prev) => !prev)}
      >
        <Body4 text={CLUB_DUES_SORT_OPTIONS[selectedSort].label} className="text-darkGray" />
        <ChevronBottomGrayIcon className={`transform transition-all ${sortOpen && '-rotate-180'}`} />
      </button>

      <ScrollView fadeTop className="flex h-full flex-col gap-[16px] px-[20px] py-[16px]">
        {duesList.map((dues) => (
          <ListItem key={dues.clubAccountHistoryId} dues={dues} />
        ))}
      </ScrollView>

      <div
        ref={sortBottomSheetRef}
        className={`absolute left-0 top-0 z-20 h-full w-full bg-black/30 ${sortOpen || 'hidden'}`}
      >
        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex flex-col gap-[20px] rounded-t-[14px] bg-white pb-[30px] pt-[20px]">
            <div className="h-[5px] w-[50px] self-center rounded-[14px] bg-lightGray" />
            <div className="flex flex-col gap-[20px] px-[20px]">
              <Title3 text="회비 내역 유형 선택" />
              <div className="flex flex-col gap-[20px]">
                {CLUB_DUES_SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedSort(option.id)}
                    className="flex items-center justify-between"
                  >
                    <Body2 text={option.label} />
                    {selectedSort === option.id && <CheckCircleIcon />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDuesHomePage;
