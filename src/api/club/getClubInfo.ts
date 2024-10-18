import axiosInstance from "@api/axiosInstance";
import { ClubInfoResponseData } from "@api/club/getClubsInfo";

type ClubInfoProps = {
  clubName: string;
};

export const getClubInfo = async ({ clubName }: Readonly<ClubInfoProps>) => {
  try {
    const res = await axiosInstance.get<ClubInfoResponseData>(
      `/v1/clubs/search?clubName=${clubName}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw Error(`동아리 정보를 검색하는 데 실패하였습니다.`);
  }
};
