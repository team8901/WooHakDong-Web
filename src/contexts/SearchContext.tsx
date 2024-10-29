import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type SearchContextProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const contextValue = useMemo(() => ({ searchQuery, setSearchQuery }), [searchQuery]);

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
