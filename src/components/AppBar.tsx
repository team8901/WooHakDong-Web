import HomeIcon from '@assets/images/appBar/HomeIcon';
import MenuIcon from '@assets/images/appBar/MenuIcon';
import SearchIcon from '@assets/images/appBar/SearchIcon';
import ChevronLeftBlackIcon from '@assets/images/chevrons/ChevronLeftBlackIcon';
import Title3 from '@components/Title3';
import { useDrawer } from '@contexts/DrawerContext';
import { useSearch } from '@contexts/SearchContext';
import useGetClubName from '@hooks/club/useGetClubName';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type AppBarProps = {
  hasMenu?: boolean;
  hasSearch?: boolean;
  showSearchInput?: boolean;
  goBackCallback?: () => void;
  title?: string;
};

const AppBar = ({
  hasMenu = false,
  hasSearch,
  showSearchInput = false,
  goBackCallback,
  title,
}: Readonly<AppBarProps>) => {
  const navigate = useNavigate();
  const customNavigate = useCustomNavigate();
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { toggleDrawer } = useDrawer();
  const { setSearchQuery } = useSearch();
  const [isSearchVisible, setIsSearchVisible] = useState(showSearchInput);
  const [searchInput, setSearchInput] = useState('');
  const { data: clubName } = useGetClubName({ clubEnglishName: clubEnglishName ?? '' });

  const handleSearchSubmit = () => {
    if (!searchInput) {
      setIsSearchVisible(false);
      return;
    }

    setSearchQuery(searchInput);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="flex h-[56px] w-full items-center gap-[20px] px-[20px]">
      {hasMenu ? (
        <div className="flex flex-shrink-0 items-center gap-[16px]">
          <button type="button" onClick={toggleDrawer}>
            <MenuIcon />
          </button>
          <Title3 text={clubName ?? ''} />
        </div>
      ) : (
        <button type="button" onClick={goBackCallback ? () => goBackCallback() : () => navigate(-1)}>
          <ChevronLeftBlackIcon />
        </button>
      )}
      {title && <Title3 text={title} className="ml-[-4px] flex-shrink-0" />}
      {!goBackCallback && (
        <button type="button" onClick={() => customNavigate(ROUTE.ROOT.slice(1))} className="ml-[-12px] flex-shrink-0">
          <HomeIcon />
        </button>
      )}
      <div className="relative flex w-full items-center">
        {hasSearch && (
          <>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="검색어를 입력하세요"
              className={`transition-width h-[40px] rounded-[14px] bg-lightGray duration-300 ease-in-out ${
                isSearchVisible ? 'w-full px-[16px]' : 'w-0 px-0'
              }`}
            />
            <button
              type="button"
              className="absolute right-[16px] top-1/2 -translate-y-1/2"
              onClick={isSearchVisible ? handleSearchSubmit : () => setIsSearchVisible(true)}
            >
              <SearchIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppBar;
