import { useEffect, useState } from 'react';
import { ClubItemCategory } from 'types/item';

type TabNavProps<T extends { itemCategory: string }> = {
  itemList: T[];
  setFilteredItemList: React.Dispatch<React.SetStateAction<T[]>>;
};

const useTabNav = <T extends { itemCategory: string }>({ itemList, setFilteredItemList }: Readonly<TabNavProps<T>>) => {
  const [activeTab, setActiveTab] = useState<ClubItemCategory | 'ALL'>('ALL');

  const handleTabChange = (categoryName: ClubItemCategory | 'ALL') => {
    setActiveTab(categoryName);
  };

  useEffect(() => {
    if (activeTab === 'ALL') {
      setFilteredItemList(itemList);
    } else {
      const filteredItem = itemList.filter((item) => item.itemCategory === activeTab);
      setFilteredItemList(filteredItem);
    }
  }, [activeTab]);

  return { activeTab, handleTabChange };
};

export default useTabNav;
