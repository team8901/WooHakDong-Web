type AdminLoginRequestData = {
  memberLoginId: string;
  memberPassword: string;
};

type SchoolsResponseData = {
  schoolId: number;
  schoolName: string;
  schoolDomain: string;
};

type SchoolsResultResponseData = {
  result: SchoolsResponseData[];
};

type CountResponseData = {
  count: number;
};

type AdminClubsResponseData = {
  clubId: number;
  clubName: string;
  clubEnglishName: string;
  clubDescription: string;
  clubImage: string;
  clubRoom: string;
  clubGeneration: string;
  clubGroupChatLink: string;
  clubGroupChatPassword: string;
  clubDues: number;
  schoolName: string;
};

type AdminClubsResultResponseData = {
  result: AdminClubsResponseData[];
};

type AdminSchoolStatsRequestData = {
  schoolId: number;
};

export type {
  AdminLoginRequestData,
  SchoolsResponseData,
  SchoolsResultResponseData,
  CountResponseData,
  AdminClubsResponseData,
  AdminClubsResultResponseData,
  AdminSchoolStatsRequestData,
};
