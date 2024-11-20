type S3ImageUrlRequestData = {
  imageCount: number;
};

type S3ImageUrlResponseData = {
  imageUrl: string;
};

type S3ImageUrlResultResponseData = {
  result: S3ImageUrlResponseData[];
};

type PutS3ImageUrlRequestData = { s3ImageUrl: string; fileBytes: ArrayBuffer };

export type { S3ImageUrlRequestData, S3ImageUrlResponseData, S3ImageUrlResultResponseData, PutS3ImageUrlRequestData };
