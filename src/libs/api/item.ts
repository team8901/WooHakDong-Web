import axiosInstance from '@libs/api/axiosInstance';
import {
  ClubItemBorrowRequestData,
  ClubItemBorrowResponseData,
  ClubItemRequestData,
  ClubItemResultResponseData,
} from 'types/item';

const getClubItems = async ({ clubId, keyword = '', category }: Readonly<ClubItemRequestData>) => {
  const res = await axiosInstance.get<ClubItemResultResponseData>(
    `/v1/clubs/${clubId}/items?keyword=${keyword}&category=${category ?? ''}`,
  );
  return res.data;
};

const postClubItemBorrow = async ({ clubId, itemId }: Readonly<ClubItemBorrowRequestData>) => {
  const res = await axiosInstance.post<ClubItemBorrowResponseData>(`/v1/clubs/${clubId}/items/${itemId}/borrow`);
  return res.data;
};

export { getClubItems, postClubItemBorrow };
