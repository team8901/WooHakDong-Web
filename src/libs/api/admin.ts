import axiosInstance from '@libs/api/axiosInstance';
import axios from 'axios';
import {
  AdminClubPaymentResponseData,
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

// Admin overall statistics
const getClubCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/clubs/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

const getSchoolCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/schools/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

const getMemberCount = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/members/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

const getSchools = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<SchoolsResultResponseData>(
    `/v1/admin/schools${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

const getClubs = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<AdminClubsResultResponseData>(
    `/v1/admin/clubs${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

const getClubPayments = async ({ assignedTerm }: Readonly<AssignedTermResquestData>) => {
  const res = await axiosInstance.get<AdminClubPaymentResponseData>(
    `/v1/admin/clubPayments${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

// admin-school-controller
const getSchoolClubCount = async ({ schoolId, assignedTerm }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/schools/${schoolId}/clubs/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

const getSchoolMemberCount = async ({ schoolId, assignedTerm }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/schools/${schoolId}/members/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

const getSchoolItemCount = async ({ schoolId, assignedTerm }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<CountResponseData>(
    `/v1/admin/schools/${schoolId}/items/count${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

const getSchoolClubs = async ({ schoolId, assignedTerm }: Readonly<AdminSchoolStatsRequestData>) => {
  const res = await axiosInstance.get<AdminClubsResultResponseData>(
    `/v1/admin/schools/${schoolId}/clubs${assignedTerm ? `?assignedTerm=${assignedTerm}` : ''}`,
  );

  return res.data;
};

export {
  fetchLoginData,
  getClubCount,
  getSchoolCount,
  getMemberCount,
  getSchools,
  getClubs,
  getClubPayments,
  getSchoolClubCount,
  getSchoolMemberCount,
  getSchoolItemCount,
  getSchoolClubs,
};
