type ClubItemCategory = 'DIGITAL' | 'SPORT' | 'BOOK' | 'CLOTHES' | 'STATIONERY' | 'ETC';

type ClubItemRequestData = {
  clubId: number;
  keyword?: string;
  category?: ClubItemCategory;
};

interface ClubItemResponseData {
  itemId: number;
  itemName: string;
  itemPhoto: string;
  itemDescription: string;
  itemLocation: string;
  itemCategory: ClubItemCategory;
  itemRentalMaxDay: number;
  itemAvailable: boolean;
  itemUsing: boolean;
  itemRentalDate: string | null;
  itemRentalTime: number;
}

type ClubItemListProps = {
  item: ClubItemResponseData;
  borrowedReturnDate: string | null | undefined;
  myPage?: boolean;
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
  itemRentalDate: string | null;
  itemDueDate: string;
};

type ClubItemsMyRequestData = {
  clubId: number;
};

interface ClubItemsMyResponseData extends ClubItemResponseData {
  itemBorrowedReturnDate: string | null;
}

type ClubItemsMyResultResponseData = {
  result: ClubItemsMyResponseData[];
};

export type {
  ClubItemCategory,
  ClubItemResponseData,
  ClubItemRequestData,
  ClubItemResultResponseData,
  ClubItemBorrowRequestData,
  ClubItemListProps,
  ClubItemBorrowResponseData,
  ClubItemsMyRequestData,
  ClubItemsMyResponseData,
  ClubItemsMyResultResponseData,
};
