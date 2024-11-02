import { DrawerProvider } from '@contexts/DrawerContext';
import { SearchProvider } from '@contexts/SearchContext';
import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { getClubsInfo } from '@libs/api/club';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ClubLayout = () => {
  const navigate = usePrefixedNavigate();
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [isClubJoin, setIsClubJoin] = useState(false);

  useEffect(() => {
    const checkClubs = async () => {
      const { result } = await getClubsInfo();

      if (result.length === 0 || !result.find((club) => club.clubEnglishName === clubEnglishName)) {
        navigate(ROUTE.CLUB_REGISTER);
        return;
      }

      setIsClubJoin(true);
    };

    checkClubs();
  }, []);

  return (
    isClubJoin && (
      <DrawerProvider>
        <SearchProvider>
          <Outlet />
        </SearchProvider>
      </DrawerProvider>
    )
  );
};

export default ClubLayout;
