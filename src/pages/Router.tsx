import { Navigate, Route, Routes } from 'react-router-dom';

import ClubJoinNoticePage from '@pages/club/ClubJoinNotice';
import ClubListPage from '@pages/club/ClubList';
import ClubRegisterPage from '@pages/club/ClubRegister';
import ClubMemberHomePage from '@pages/clubMember/ClubMemberHome';
import MemberInfoConfirmPage from '@pages/member/MemberInfoConfirm';
import MemberInfoWritePage from '@pages/member/MemberInfoWrite';
import MemberRegisterPage from '@pages/member/MemberRegister';
import PaymentPage from '@pages/payment';
import AdminLayout from '@layouts/AdminLayout';
import AuthLayout from '@layouts/AuthLayout';
import ClubLayout from '@layouts/ClubLayout';
import MemberLayout from '@layouts/MemberLayout';
import NotAdminLayout from '@layouts/NotAdminLayout';
import NotAuthLayout from '@layouts/NotAuthLayout';
import NotClubLayout from '@layouts/NotClubLayout';
import NotMemberLayout from '@layouts/NotMemberLayout';
import ROUTE from '@libs/constant/path';
import AdminLoginPage from '@pages/admin/AdminLogin';
import StatsClubPage from '@pages/admin/StatsClub';
import StatsHomePage from '@pages/admin/StatsHome';
import StatsSchoolPage from '@pages/admin/StatsSchool';
import ClubDuesHomePage from '@pages/clubDues/ClubDuesHome';
import ClubItemDetailPage from '@pages/clubItem/ClubItemDetail';
import ClubItemHomePage from '@pages/clubItem/ClubItemHome';
import ClubItemMyPage from '@pages/clubItem/ClubItemMy';
import ClubItemSearchPage from '@pages/clubItem/ClubItemSearch';
import ClubMemberDetailPage from '@pages/clubMember/ClubMemberDetail';
import ClubScheduleDetailPage from '@pages/clubSchedule/ClubScheduleDetail';
import ClubScheduleHomePage from '@pages/clubSchedule/ClubScheduleHome';
import LoginRegisterPage from '@pages/login/LoginRegister';
import PaymentRedirectPage from '@pages/payment/PaymentRedirect';
import SettingPage from '@pages/setting';
import InquiryPage from '@pages/setting/Inquiry';
import ClubHomePage from '@pages/club/ClubHome';
import GroupLayout from '@layouts/GroupLayout';
import GroupRegisterPage from '@pages/group/GroupRegister';
import ClubGroupHomePage from '@pages/group/ClubGroupHome';
import ClubGroupDetailPage from '@pages/group/ClubGroupDetail';

const RootRoute = () => {
  const isAuth = !!localStorage.getItem('accessToken');

  if (!isAuth) {
    return <Navigate to={ROUTE.LOGIN_REGISTER} />;
  }

  if (localStorage.getItem('admin')) {
    localStorage.removeItem('admin');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return <Navigate to={ROUTE.LOGIN_REGISTER} />;
  }

  return <Navigate to={ROUTE.CLUB_LIST} />;
};

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE.ROOT} element={<RootRoute />}>
        <Route path={ROUTE.ROOT} element={<ClubListPage />} />
      </Route>
      {/* 관리자인 사용자가 접근할 수 없는 페이지 */}
      <Route element={<NotAdminLayout />}>
        <Route path={ROUTE.ADMIN} element={<AdminLoginPage />} />
        <Route path={ROUTE.ADMIN_LOGIN} element={<AdminLoginPage />} />
      </Route>
      {/* 관리자가 아닌 사용자가 접근할 수 없는 페이지 */}
      <Route element={<AdminLayout />}>
        <Route path={ROUTE.ADMIN_STATS} element={<StatsHomePage />} />
        <Route path={`${ROUTE.ADMIN_STATS_SCHOOL}/:schoolId`} element={<StatsSchoolPage />} />
        <Route path={`${ROUTE.ADMIN_STATS_CLUB}/:clubId`} element={<StatsClubPage />} />
      </Route>
      {/* 인증된 사용자가 접근할 수 없는 페이지 */}
      <Route element={<NotAuthLayout />}>
        <Route path={ROUTE.LOGIN_REGISTER} element={<LoginRegisterPage />} />
        <Route path={`${ROUTE.CLUB}/:clubEnglishName${ROUTE.LOGIN_REGISTER}`} element={<LoginRegisterPage />} />
      </Route>
      {/* 인증되지 않은 사용자가 접근할 수 없는 페이지 */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTE.CLUB_LIST} element={<ClubListPage />} />
        <Route path={`${ROUTE.CLUB}/:clubEnglishName`}>
          <Route path={ROUTE.MEMBER_INFO_WRITE.slice(1)} element={<MemberInfoWritePage />} />
          <Route path={ROUTE.MEMBER_INFO_CONFIRM.slice(1)} element={<MemberInfoConfirmPage />} />
          {/* 인적사항 등록한 사용자가 접근할 수 없는 페이지 */}
          <Route element={<NotMemberLayout />}>
            <Route path={ROUTE.MEMBER_REGISTER.slice(1)} element={<MemberRegisterPage />} />
            <Route path={ROUTE.CLUB_JOIN_NOTICE.slice(1)} element={<ClubJoinNoticePage />} />
          </Route>
          {/* 인적사항 등록하지 않은 사용자가 접근할 수 없는 페이지 */}
          <Route element={<MemberLayout />}>
            <Route path={ROUTE.SETTING.slice(1)} element={<SettingPage />} />
            <Route path={ROUTE.INQUIRY.slice(1)} element={<InquiryPage />} />
            {/* 해당 동아리에 가입한 사용자가 접근할 수 없는 페이지 */}
            <Route element={<NotClubLayout />}>
              <Route path={ROUTE.CLUB_REGISTER.slice(1)} element={<ClubRegisterPage />} />
              <Route path={ROUTE.PAYMENT.slice(1)} element={<PaymentPage />} />
              <Route path={ROUTE.PAYMENT_REDIRECT.slice(1)} element={<PaymentRedirectPage />} />
            </Route>
            {/* 해당 동아리에 가입하지 않은 사용자가 접근할 수 없는 페이지 */}
            <Route element={<ClubLayout />}>
              <Route path={ROUTE.ROOT.slice(1)} element={<ClubHomePage />} />
              <Route path={ROUTE.MEMBER.slice(1)} element={<ClubMemberHomePage />} />
              <Route path={`${ROUTE.MEMBER.slice(1)}/:memberId`} element={<ClubMemberDetailPage />} />
              <Route path={ROUTE.ITEM.slice(1)} element={<ClubItemHomePage />} />
              <Route path={ROUTE.ITEM_SEARCH.slice(1)} element={<ClubItemSearchPage />} />
              <Route path={ROUTE.ITEM_MY.slice(1)} element={<ClubItemMyPage />} />
              <Route path={`${ROUTE.ITEM.slice(1)}/:itemId`} element={<ClubItemDetailPage />} />
              <Route path={ROUTE.DUES.slice(1)} element={<ClubDuesHomePage />} />
              <Route path={ROUTE.SCHEDULE.slice(1)} element={<ClubScheduleHomePage />} />
              <Route path={`${ROUTE.SCHEDULE.slice(1)}/:scheduleId`} element={<ClubScheduleDetailPage />} />
              <Route path={ROUTE.GROUP.slice(1)} element={<ClubGroupHomePage />} />
              <Route path={`${ROUTE.GROUP_DETAIL.slice(1)}/:groupId`} element={<ClubGroupDetailPage />} />
              <Route path={`${ROUTE.GROUP.slice(1)}/:groupId`} element={<GroupLayout />}>
                <Route path={ROUTE.ROOT.slice(1)} element={<GroupRegisterPage />} />
                <Route path={ROUTE.PAYMENT.slice(1)} element={<PaymentPage />} />
                <Route path={ROUTE.PAYMENT_REDIRECT.slice(1)} element={<PaymentRedirectPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      {/* Catch-all route for non-existent pages */}
      <Route path="*" element={<Navigate to={ROUTE.CLUB_LIST} />} />
    </Routes>
  );
};
