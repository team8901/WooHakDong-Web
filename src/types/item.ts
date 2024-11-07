type ClubItemProps = {
  clubId: number;
  keyword?: string;
  category?: ClubItemCategory;
};

type ClubItemCategory = 'DIGITAL' | 'SPORT' | 'BOOK' | 'CLOTHES' | 'STATIONERY' | 'ETC';

type ClubItem = {
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
  item: ClubItem;
};

type ItemResponseData = {
  result: ClubItem[];
};

type ClubItemBorrowProps = {
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
  ClubItem,
  ClubItemProps,
  ItemResponseData,
  ClubItemBorrowProps,
  ClubItemListProps,
  ClubItemBorrowResponseData,
};
