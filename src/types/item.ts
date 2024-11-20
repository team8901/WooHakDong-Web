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

type ClubItemResultResponseData = {
  result: ClubItemResponseData[];
};

interface ClubItemBorrowRequestData {
  clubId: number;
  itemId: number;
}

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

interface ClubItemReturnRequestData extends ClubItemBorrowRequestData {
  itemReturnImage: string;
}

type ClubItemReturnResponseData = {
  itemId: number;
  itemHistoryId: number;
  itemReturnDate: string;
};

type ClubItemsMyHistoryResponseData = {
  itemHistoryId: number;
  clubMemberId: number;
  memberName: string;
  itemRentalDate: string;
  itemDueDate: string;
  itemReturnDate: string;
  itemReturnImage: string;
  itemName: string;
  itemOverdue: boolean;
  itemId: number;
};

type ClubItemsMyHistoryResultResponseData = {
  result: ClubItemsMyHistoryResponseData[];
};

export type {
  ClubItemCategory,
  ClubItemResponseData,
  ClubItemRequestData,
  ClubItemResultResponseData,
  ClubItemBorrowRequestData,
  ClubItemBorrowResponseData,
  ClubItemsMyRequestData,
  ClubItemsMyResponseData,
  ClubItemsMyResultResponseData,
  ClubItemReturnRequestData,
  ClubItemReturnResponseData,
  ClubItemsMyHistoryResponseData,
  ClubItemsMyHistoryResultResponseData,
};
