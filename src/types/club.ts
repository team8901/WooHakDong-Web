type ClubInfoRequestData = {
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

type ClubInfoResultResponseData = {
  result: ClubInfoResponseData[];
};

export type { ClubInfoRequestData, ClubInfoResponseData, ClubInfoResultResponseData };
