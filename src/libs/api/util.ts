import axiosInstance from '@libs/api/axiosInstance';
import axios from 'axios';
import { PutS3ImageUrlRequestData, S3ImageUrlRequestData, S3ImageUrlResultResponseData } from 'types/util';

const getS3ImageUrl = async ({ imageCount }: Readonly<S3ImageUrlRequestData>) => {
  const res = await axiosInstance.get<S3ImageUrlResultResponseData>(`/v1/utils/images/urls?imageCount=${imageCount}`);

  return res.data;
};

const putImageToS3 = async ({ s3ImageUrl, fileBytes }: Readonly<PutS3ImageUrlRequestData>) => {
  await axios.put(`${s3ImageUrl}`, fileBytes, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export { getS3ImageUrl, putImageToS3 };
