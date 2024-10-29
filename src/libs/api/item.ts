import axiosInstance from '@libs/api/axiosInstance';
import { ItemProps, ItemResponseData } from 'types/item';

const getClubItems = async ({ clubId, keyword = '', category }: Readonly<ItemProps>) => {
  const res = await axiosInstance.get<ItemResponseData>(
    `/v1/clubs/${clubId}/items?keyword=${keyword}&category=${category || ''}`,
  );
  return res.data;
};

export { getClubItems };
