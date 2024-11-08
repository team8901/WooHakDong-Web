type ClubItemCategory = 'DIGITAL' | 'SPORT' | 'BOOK' | 'CLOTHES' | 'STATIONERY' | 'ETC';

type ClubItemRequestData = {
  clubId: number;
  keyword?: string;
  category?: ClubItemCategory;
};

type ClubItemResponseData = {
  itemId: number;
  itemName: string;
  itemPhoto: string;
  itemDescription: string;
  itemLocation: string;
  itemCategory: ClubItemCategory;
  itemRentalMaxDay: number;
  itemAvailable: boolean;
  itemUsing: boolean;
  itemRentalDate: string;
  itemRentalTime: number;
};

type ClubItemListProps = {
  item: ClubItemResponseData;
};

type ClubItemResultResponseData = {
  result: ClubItemResponseData[];
};

type ClubItemBorrowRequestData = {
  clubId: number;
  itemId: number;
};

type ClubItemBorrowResponseData = {
  itemId: number;
  itemHistoryId: number;
  itemRentalDate: string;
  itemDueDate: string;
};

export type {
  ClubItemCategory,
  ClubItemResponseData,
  ClubItemRequestData,
  ClubItemResultResponseData,
  ClubItemBorrowRequestData,
  ClubItemListProps,
  ClubItemBorrowResponseData,
};
