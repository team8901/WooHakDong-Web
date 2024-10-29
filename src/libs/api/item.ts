import axiosInstance from '@libs/api/axiosInstance';
import { ClubItemBorrowProps, ClubItemBorrowResponseData, ClubItemProps, ItemResponseData } from 'types/item';

const getClubItems = async ({ clubId, keyword = '', category }: Readonly<ClubItemProps>) => {
  const res = await axiosInstance.get<ItemResponseData>(
    `/v1/clubs/${clubId}/items?keyword=${keyword}&category=${category || ''}`,
  );
  return res.data;
};

const postClubItemBorrow = async ({ clubId, itemId }: Readonly<ClubItemBorrowProps>) => {
  const res = await axiosInstance.post<ClubItemBorrowResponseData>(`/v1/clubs/${clubId}/items/${itemId}/borrow`);
  return res.data;
};

export { getClubItems, postClubItemBorrow };
