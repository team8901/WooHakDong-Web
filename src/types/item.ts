type ItemCategory = 'DIGITAL' | 'SPORT' | 'BOOK' | 'CLOTHES' | 'STATIONERY' | 'ETC';

type Item = {
  itemId: number;
  itemName: string;
  itemPhoto: string;
  itemDescription: string;
  itemLocation: string;
  itemCategory: ItemCategory;
  itemRentalMaxDay: number;
  itemAvailable: boolean;
  itemUsing: boolean;
  itemRentalDate: string;
  itemRentalTime: number;
};

export type { ItemCategory, Item };
