import { useEffect, useState } from 'react';
import { ClubItemCategory } from 'types/item';

type TabNavProps = {
  onClickTab: () => void;
};

const useTabNav = ({ onClickTab }: Readonly<TabNavProps>) => {
  const [activeTab, setActiveTab] = useState<ClubItemCategory | 'ALL'>('ALL');

  const handleTabChange = (categoryName: ClubItemCategory | 'ALL') => {
    setActiveTab(categoryName);
  };

  useEffect(() => {
    onClickTab();
  }, [activeTab]);

  return { activeTab, handleTabChange };
};

export default useTabNav;
