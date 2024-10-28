import { Route, Routes } from 'react-router-dom';

import ClubJoinNoticePage from '@pages/club/ClubJoinNotice';
import ClubMemberHomePage from '@pages/club/ClubMemberHome';
import ClubRegisterPage from '@pages/club/ClubRegister';
import MemberRegisterPage from '@pages/member/MemberRegister';
import MemberInfoWritePage from '@pages/member/MemberInfoWrite';
import MemberInfoConfirmPage from '@pages/member/MemberInfoConfirm';
import PaymentPage from '@pages/payment';
import ClubListPage from '@pages/club/ClubList';
import LandingPage from '@pages/landing';
import NotAuthLayout from '@layouts/NotAuthLayout';
import AuthLayout from '@layouts/AuthLayout';
import ClubLayout from '@layouts/ClubLayout';
import LoginRegisterPage from '@pages/login/LoginRegister';
import ROUTE from '@libs/constant/path';
import MemberLayout from '@layouts/MemberLayout';
import NotMemberLayout from '@layouts/NotMemberLayout';
import NotClubLayout from '@layouts/NotClubLayout';

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE.ROOT} element={<LandingPage />} />
      {/* 인증된 사용자가 접근할 수 없는 페이지 */}
      <Route element={<NotAuthLayout />}>
        <Route path={ROUTE.LOGIN_REGISTER} element={<LoginRegisterPage />} />
        <Route path={`${ROUTE.CLUB}/:clubEnglishName${ROUTE.LOGIN_REGISTER}`} element={<LoginRegisterPage />} />
      </Route>
      {/* 인증되지 않은 사용자가 접근할 수 없는 페이지 */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTE.CLUB_LIST} element={<ClubListPage />} />
        <Route path={`${ROUTE.CLUB}/:clubEnglishName`}>
          {/* 인적사항 등록한 사용자가 접근할 수 없는 페이지 */}
          <Route element={<NotMemberLayout />}>
            <Route path={ROUTE.MEMBER_REGISTER.slice(1)} element={<MemberRegisterPage />} />
            <Route path={ROUTE.CLUB_JOIN_NOTICE.slice(1)} element={<ClubJoinNoticePage />} />
            <Route path={ROUTE.MEMBER_INFO_WRITE.slice(1)} element={<MemberInfoWritePage />} />
            <Route path={ROUTE.MEMBER_INFO_CONFIRM.slice(1)} element={<MemberInfoConfirmPage />} />
          </Route>
          {/* 인적사항 등록하지 않은 사용자가 접근할 수 없는 페이지 */}
          <Route element={<MemberLayout />}>
            {/* 해당 동아리에 가입한 사용자가 접근할 수 없는 페이지 */}
            <Route element={<NotClubLayout />}>
              <Route path={ROUTE.CLUB_REGISTER.slice(1)} element={<ClubRegisterPage />} />
              <Route path={ROUTE.PAYMENT.slice(1)} element={<PaymentPage />} />
            </Route>
            {/* 해당 동아리에 가입하지 않은 사용자가 접근할 수 없는 페이지 */}
            <Route element={<ClubLayout />}>
              <Route path={ROUTE.ROOT.slice(1)} element={<ClubMemberHomePage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
