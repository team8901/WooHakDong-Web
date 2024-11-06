import ChevronBottomGrayIcon from '@assets/images/chevrons/ChevronBottomGrayIcon';
import AppBar from '@components/AppBar';
import Body4 from '@components/Body4';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import Title1 from '@components/Title1';
import useBottomSheet from '@hooks/useBottomSheet';
import { getClubInfo } from '@libs/api/club';
import { getClubDues } from '@libs/api/dues';
import { CLUB_DUES_SORT_OPTIONS } from '@libs/constant/dues';
import BottomSheet from '@pages/clubDues/components/BottomSheet';
// import { CLUB_DUES_DATA } from '@libs/constant/dues';
import ListItem from '@pages/clubDues/components/ListItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubDuesResponseData } from 'types/dues';

const ClubDuesHomePage = () => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [duesList, setDuesList] = useState<ClubDuesResponseData[]>([]);
  const [filteredDuesList, setFilteredDuesList] = useState<ClubDuesResponseData[]>([]);

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

  useEffect(() => {
    (async () => {
      if (!clubEnglishName) return;

      const { clubId } = await getClubInfo({
        clubEnglishName,
      });

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      const { result } = await getClubDues({ clubId, year, month });

      setDuesList(result);
      setFilteredDuesList(result);
    })();
    // setDuesList(CLUB_DUES_DATA);
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
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Body4 text={CLUB_DUES_SORT_OPTIONS[selectedOption].label} className="text-darkGray" />
        <ChevronBottomGrayIcon className={`transform transition-all ${isOpen && '-rotate-180'}`} />
      </button>

      <ScrollView fadeTop className="flex h-full flex-col gap-[16px] px-[20px] py-[16px]">
        {filteredDuesList.map((dues) => (
          <ListItem key={dues.clubAccountHistoryId} dues={dues} />
        ))}
      </ScrollView>

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
