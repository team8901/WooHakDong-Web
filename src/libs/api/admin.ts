import axiosInstance from '@libs/api/axiosInstance';
import axios from 'axios';
import {
  AdminClubsResultResponseData,
  AdminLoginRequestData,
  AdminSchoolStatsRequestData,
  AssignedTermResquestData,
  CountResponseData,
  SchoolsResultResponseData,
} from 'types/admin';
import { LoginResponseData } from 'types/auth';

const fetchLoginData = async ({ memberLoginId, memberPassword }: Readonly<AdminLoginRequestData>) => {
  const res = await axios.post<LoginResponseData>(`${import.meta.env.VITE_API_URL}/v1/admin/auth/login`, {
    memberLoginId,
    memberPassword,
  });

  return res.data;
};

const getClubCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/clubs/count?assignedTerm=${assignedTerm}`);

  return res.data;
};

const getSchoolCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/schools/count?assignedTerm=${assignedTerm}`);

  return res.data;
};

const getMemberCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/members/count?assignedTerm=${assignedTerm}`);

  return res.data;
};

const getSchools = async () => {
  const res = await axiosInstance.get<SchoolsResultResponseData>(`/v1/admin/schools`);

  return res.data;
};

const getClubs = async () => {
  const res = await axiosInstance.get<AdminClubsResultResponseData>(`/v1/admin/clubs`);

  return res.data;
};

// admin-school-controller
const getSchoolClubCount = async ({ schoolId }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/schools/${schoolId}/clubs/count`);

  return res.data;
};

const getSchoolMemberCount = async ({ schoolId }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/schools/${schoolId}/members/count`);

  return res.data;
};

const getSchoolItemCount = async ({ schoolId }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/schools/${schoolId}/items/count`);

  return res.data;
};

const getSchoolClubs = async ({ schoolId }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<AdminClubsResultResponseData>(`/v1/admin/schools/${schoolId}/clubs`);

  return res.data;
};

export {
  fetchLoginData,
  getClubCount,
  getSchoolCount,
  getMemberCount,
  getSchools,
  getClubs,
  getSchoolClubCount,
  getSchoolMemberCount,
  getSchoolItemCount,
  getSchoolClubs,
};
