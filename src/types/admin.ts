import { ClubMemberRole } from 'types/clubMember';
import { InquiryCategory } from 'types/inquiry';
import { ClubItemCategory } from 'types/item';
import { Gender } from 'types/member';

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

type AdminClubPaymentResponseData = {
  clubPayment: number;
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

interface AdminSchoolStatsRequestData extends AssignedTermResquestData {
  schoolId: number;
}

type AssignedTermResquestData = {
  assignedTerm?: string | null;
};

// admin-club-controller
interface AdminClubStatsRequestData extends AssignedTermResquestData {
  clubId: number;
}

type AdminClubPeriodResponseData = {
  startDate: string;
};

type AdminClubMembersResponseData = {
  memberId: number;
  memberName: string;
  memberPhoneNumber: string;
  memberEmail: string;
  memberGender: Gender;
  memberMajor: string;
  memberStudentNumber: string;
  clubMemberRole: ClubMemberRole;
  clubMemberId: number;
  clubJoinedDate: string;
  clubMemberAssignedTerm: string;
  createAt: string;
};

type AdminClubItemsHistoryResponseData = {
  itemHistoryId: number;
  memberName: string;
  itemRentalDate: string;
  itemDueDate: string;
  itemReturnDate: string;
  itemReturnImage: string;
  itemName: string;
  itemCategory: ClubItemCategory;
  itemId: number;
  assignedTerm: string;
};

type AdminInquiryRequestData = {
  category?: InquiryCategory | null;
};

type AdminInquiryResponseData = {
  inquiryId: number;
  inquiryContent: string;
  inquiryCategory: InquiryCategory;
  memberEmail: string;
  creatDate: string;
};

export type {
  AdminLoginRequestData,
  SchoolsResponseData,
  SchoolsResultResponseData,
  CountResponseData,
  AdminClubPaymentResponseData,
  AdminClubsResponseData,
  AdminClubsResultResponseData,
  AdminSchoolStatsRequestData,
  AssignedTermResquestData,
  AdminClubStatsRequestData,
  AdminClubPeriodResponseData,
  AdminClubMembersResponseData,
  AdminClubItemsHistoryResponseData,
  AdminInquiryRequestData,
  AdminInquiryResponseData,
};
