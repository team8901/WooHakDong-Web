type ClubInfoProps = {
  clubEnglishName: string;
};

type ClubInfoResponseData = {
  clubId: number;
  clubName: string;
  clubEnglishName: string;
  clubImage: string;
  clubDescription: string;
  clubRoom: string;
  clubGeneration: string;
  clubDues: number;
};

type ClubsInfoResponseData = {
  result: ClubInfoResponseData[];
};

export type { ClubInfoProps, ClubInfoResponseData, ClubsInfoResponseData };
