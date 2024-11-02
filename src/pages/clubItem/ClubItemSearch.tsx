import AppBar from '@components/AppBar';
import { useSearch } from '@contexts/SearchContext';
import { getClubInfo } from '@libs/api/club';
import { getClubItems } from '@libs/api/item';
import SearchListItem from '@pages/clubItem/components/SearchListItem';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClubItem } from 'types/item';

const ClubItemSearchPage = () => {
  const [itemList, setItemList] = useState<ClubItem[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchData = async () => {
      if (!clubEnglishName) return;

      const { clubId } = await getClubInfo({
        clubEnglishName,
      });

      const { result } = await getClubItems({ clubId, keyword: searchQuery });
      setItemList(result);
    };

    getSearchData();
  }, [searchQuery]);

  const handleGoBack = () => {
    setSearchQuery('');
    navigate(-1);
  };

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar goBackCallback={handleGoBack} hasSearch showSearchInput />
      </div>

      <div className="masked-overflow flex h-full flex-col gap-[20px] p-[20px] scrollbar-hide">
        {itemList.length === 0 ? (
          <div className="flex h-full items-center justify-center">아직 등록된 물품이 없습니다.</div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            <SearchListItem item={itemList[0]} />
            {itemList.slice(1).map((item) => (
              <div key={item.itemId} className="flex flex-col gap-[20px]">
                <div className="h-[0.6px] bg-lightGray" />
                <SearchListItem item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubItemSearchPage;
