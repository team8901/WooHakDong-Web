import axiosInstance from '@libs/api/axiosInstance';
import axios from 'axios';
import {
  AdminClubsResultResponseData,
  AdminLoginRequestData,
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

const getClubCount = async () => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/clubs/count`);

  return res.data;
};

const getSchoolCount = async () => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/schools/count`);

  return res.data;
};

const getMemberCount = async () => {
  const res = await axiosInstance.get<CountResponseData>(`/v1/admin/members/count`);

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

export { fetchLoginData, getClubCount, getSchoolCount, getMemberCount, getSchools, getClubs };
