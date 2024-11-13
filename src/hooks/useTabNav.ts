import { useEffect, useState } from 'react';

type TabNavProps<T extends { itemCategory: string }> = {
  itemList: T[];
  setFilteredItemList: React.Dispatch<React.SetStateAction<T[]>>;
};

const useTabNav = <T extends { itemCategory: string }>({ itemList, setFilteredItemList }: Readonly<TabNavProps<T>>) => {
  const [activeTab, setActiveTab] = useState('ALL');

  const handleTabChange = (categoryName: string) => {
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
