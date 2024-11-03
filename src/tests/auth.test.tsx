import { describe, expect, vi, beforeEach, Mock, test } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ROUTE from '@libs/constant/path';
import { getClubInfo, getClubsInfo } from '@libs/api/club';
import { Router } from '@pages/Router';
import { getMemberInfo } from '@libs/api/member';
// import { renderHook } from "@testing-library/react-hooks";

const mockNavigate = vi.fn();

vi.mock('@hooks/useCustomNavigate', () => ({
  default: () => mockNavigate,
}));

vi.mock('@libs/api/member', () => ({
  getMemberInfo: vi.fn(),
}));

vi.mock('@libs/api/club', () => ({
  getClubsInfo: vi.fn(),
  getClubInfo: vi.fn(),
}));

vi.mock('@libs/api/payment', () => ({
  postPortOne: vi.fn(),
}));

const ROUTES_TO_TEST = [
  `${ROUTE.CLUB}/doit`,
  `${ROUTE.CLUB}/doit${ROUTE.LOGIN_REGISTER}`,
  `${ROUTE.CLUB}/doit${ROUTE.MEMBER_REGISTER}`,
  `${ROUTE.CLUB}/doit${ROUTE.CLUB_JOIN_NOTICE}`,
  `${ROUTE.CLUB}/doit${ROUTE.CLUB_REGISTER}`,
  `${ROUTE.CLUB}/doit${ROUTE.MEMBER_INFO_WRITE}`,
  `${ROUTE.CLUB}/doit${ROUTE.MEMBER_INFO_CONFIRM}`,
  `${ROUTE.CLUB}/doit${ROUTE.PAYMENT}`,
  `${ROUTE.CLUB}/doit${ROUTE.PAYMENT_REDIRECT}`,
  `${ROUTE.CLUB}/doit${ROUTE.ITEM}`,
  `${ROUTE.CLUB}/doit${ROUTE.ITEM_SEARCH}`,
  `${ROUTE.CLUB}/doit${ROUTE.DUES}`,
];

// US30, 32
// 동아리 회원은 우학동 서비스를 이용하기 위해 학교 이메일로 구글 로그인을 할 수 있다.
describe('우학동 서비스에 가입되지 않았으면 loginRegister 페이지로 이동한다.', async () => {
  beforeEach(() => {
    localStorage.removeItem('accessToken');
  });

  test.each(ROUTES_TO_TEST)('%s 로 접속했을 때 loginRegister 페이지로 이동', async (route) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Router />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.LOGIN_REGISTER);
    });
  });
});

describe('우학동 서비스에 가입되었지만 인적사항을 등록하지 않았으면 memberRegister 페이지로 이동한다.', async () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', '123');
    (getMemberInfo as Mock).mockResolvedValue({ memberPhoneNumber: null });
    (getClubsInfo as Mock).mockResolvedValue({ result: [] });
  });

  test.each(ROUTES_TO_TEST)('%s 로 접속했을 때 memberRegister 페이지로 이동', async (route) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Router />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.MEMBER_REGISTER);
    });
  });
});

describe('우학동 서비스에 가입되었고 인적사항을 등록했지만 동아리 가입을 하지 않았으면 clubRegister 페이지로 이동한다.', async () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', '123');
    (getMemberInfo as Mock).mockResolvedValue({ memberPhoneNumber: '01012345678' });
    (getClubsInfo as Mock).mockResolvedValue({ result: [] });
    (getClubInfo as Mock).mockResolvedValue({ clubName: '두잇' });
  });

  test.each(ROUTES_TO_TEST)('%s 로 접속했을 때 clubRegister 페이지로 이동', async (route) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Router />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.CLUB_REGISTER);
    });
  });
});

describe('우학동 서비스에 가입되었고 인적사항을 등록했고 동아리 가입도 했으면 동아리 전용 페이지로 이동한다.', () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', '123');
    (getMemberInfo as Mock).mockResolvedValue({ memberPhoneNumber: '01012345678' });

    const result = [
      {
        clubId: 1,
        clubName: '두잇',
        clubEnglishName: 'doit',
        clubImage: '',
        clubDescription: '두잇입니다',
        clubRoom: '구학생회관 234호',
        clubGeneration: '1기',
        clubDues: '10000',
      },
    ];
    (getClubsInfo as Mock).mockResolvedValue({ result });
  });

  test.each(ROUTES_TO_TEST)('%s 로 접속했을 때 동아리 전용 페이지로 이동', async (route) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Router />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTE.ROOT);
    });
  });
});
