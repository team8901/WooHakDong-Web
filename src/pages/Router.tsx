import { Route, Routes } from 'react-router-dom';

import ClubJoinNoticePage from '@pages/club/ClubJoinNotice';
import ClubMemberHomePage from '@pages/clubMember/ClubMemberHome';
import ClubRegisterPage from '@pages/club/ClubRegister';
import MemberRegisterPage from '@pages/member/MemberRegister';
import MemberInfoWritePage from '@pages/member/MemberInfoWrite';
import MemberInfoConfirmPage from '@pages/member/MemberInfoConfirm';
import PaymentPage from '@pages/payment';
import ClubListPage from '@pages/club/ClubList';
// import LandingPage from '@pages/landing';
import NotAuthLayout from '@layouts/NotAuthLayout';
import AuthLayout from '@layouts/AuthLayout';
import ClubLayout from '@layouts/ClubLayout';
import LoginRegisterPage from '@pages/login/LoginRegister';
import ROUTE from '@libs/constant/path';
import MemberLayout from '@layouts/MemberLayout';
import NotMemberLayout from '@layouts/NotMemberLayout';
import NotClubLayout from '@layouts/NotClubLayout';
import PaymentRedirectPage from '@pages/payment/PaymentRedirect';
import ClubItemHomePage from '@pages/clubItem/ClubItemHome';
import ClubItemSearchPage from '@pages/clubItem/ClubItemSearch';
import ClubItemDetailPage from '@pages/clubItem/ClubItemDetail';
import ClubDuesHomePage from '@pages/clubDues/ClubDuesHome';
import ClubMemberDetailPage from '@pages/clubMember/ClubMemberDetail';
import ClubScheduleHomePage from '@pages/clubSchedule/ClubScheduleHome';
import ClubScheduleDetailPage from '@pages/clubSchedule/ClubScheduleDetail';
import ClubItemMyPage from '@pages/clubItem/ClubItemMy';
import AdminLoginPage from '@pages/admin/AdminLogin';
import StatsHomePage from '@pages/admin/StatsHome';
import AdminLayout from '@layouts/AdminLayout';
import StatsSchoolPage from '@pages/admin/StatsSchool';

export const Router = () => {
  return (
    <Routes>
      {/* <Route path={ROUTE.ROOT} element={<LandingPage />} /> */}
      <Route path={ROUTE.ADMIN} element={<AdminLoginPage />} />
      <Route path={ROUTE.ADMIN_LOGIN} element={<AdminLoginPage />} />
      {/* 관리자가 아닌 사용자가 접근할 수 없는 페이지 */}
      <Route element={<AdminLayout />}>
        <Route path={ROUTE.ADMIN_STATS} element={<StatsHomePage />} />
        <Route path={`${ROUTE.ADMIN_STATS_SCHOOL}/:schoolId`} element={<StatsSchoolPage />} />
      </Route>
      {/* 인증된 사용자가 접근할 수 없는 페이지 */}
      <Route element={<NotAuthLayout />}>
        <Route path={ROUTE.ROOT} element={<LoginRegisterPage />} />
        <Route path={ROUTE.LOGIN_REGISTER} element={<LoginRegisterPage />} />
        <Route path={`${ROUTE.CLUB}/:clubEnglishName${ROUTE.LOGIN_REGISTER}`} element={<LoginRegisterPage />} />
      </Route>
      {/* 인증되지 않은 사용자가 접근할 수 없는 페이지 */}
      <Route element={<AuthLayout />}>
        {/* <Route path={ROUTE.ROOT} element={<ClubListPage />} /> */}
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
              <Route path={ROUTE.PAYMENT_REDIRECT.slice(1)} element={<PaymentRedirectPage />} />
            </Route>
            {/* 해당 동아리에 가입하지 않은 사용자가 접근할 수 없는 페이지 */}
            <Route element={<ClubLayout />}>
              <Route path={ROUTE.ROOT.slice(1)} element={<ClubMemberHomePage />} />
              <Route path={ROUTE.MEMBER.slice(1)} element={<ClubMemberHomePage />} />
              <Route path={`${ROUTE.MEMBER.slice(1)}/:memberId`} element={<ClubMemberDetailPage />} />
              <Route path={ROUTE.ITEM.slice(1)} element={<ClubItemHomePage />} />
              <Route path={ROUTE.ITEM_SEARCH.slice(1)} element={<ClubItemSearchPage />} />
              <Route path={ROUTE.ITEM_MY.slice(1)} element={<ClubItemMyPage />} />
              <Route path={`${ROUTE.ITEM.slice(1)}/:itemId`} element={<ClubItemDetailPage />} />
              <Route path={ROUTE.DUES.slice(1)} element={<ClubDuesHomePage />} />
              <Route path={ROUTE.SCHEDULE.slice(1)} element={<ClubScheduleHomePage />} />
              <Route path={`${ROUTE.SCHEDULE.slice(1)}/:scheduleId`} element={<ClubScheduleDetailPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
