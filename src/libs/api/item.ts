import axiosInstance from '@libs/api/axiosInstance';
import {
  ClubItemBorrowRequestData,
  ClubItemBorrowResponseData,
  ClubItemRequestData,
  ClubItemResultResponseData,
  ClubItemReturnRequestData,
  ClubItemReturnResponseData,
  ClubItemsMyHistoryResultResponseData,
  ClubItemsMyRequestData,
  ClubItemsMyResultResponseData,
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

const getClubItemsMy = async ({ clubId }: Readonly<ClubItemsMyRequestData>) => {
  const res = await axiosInstance.get<ClubItemsMyResultResponseData>(`/v1/clubs/${clubId}/items/borrowed`);
  return res.data;
};

const postClubItemReturn = async ({ clubId, itemId, itemReturnImage }: Readonly<ClubItemReturnRequestData>) => {
  const res = await axiosInstance.post<ClubItemReturnResponseData>(`/v1/clubs/${clubId}/items/${itemId}/return`, {
    itemReturnImage,
  });
  return res.data;
};

const getClubItemsMyHistory = async ({ clubId }: Readonly<ClubItemsMyRequestData>) => {
  const res = await axiosInstance.get<ClubItemsMyHistoryResultResponseData>(`/v1/clubs/${clubId}/items/history/my`);
  return res.data;
};

export { getClubItems, postClubItemBorrow, getClubItemsMy, postClubItemReturn, getClubItemsMyHistory };
