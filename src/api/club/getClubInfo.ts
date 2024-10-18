import axiosInstance from "@api/axiosInstance";
import { ClubInfoResponseData } from "@api/club/getClubsInfo";

type ClubInfoProps = {
  clubEnglishName: string;
};

export const getClubInfo = async ({
  clubEnglishName,
}: Readonly<ClubInfoProps>) => {
  const res = await axiosInstance.get<ClubInfoResponseData>(
    `/v1/clubs/search?clubEnglishName=${clubEnglishName}`
  );
  return res.data;
};
