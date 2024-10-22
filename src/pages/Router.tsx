import { Route, Routes } from "react-router-dom";

import ClubJoinNoticePage from "@pages/club/ClubJoinNotice";
import ClubMemberHomePage from "@pages/club/ClubMemberHome";
import ClubRegisterPage from "@pages/club/ClubRegister";
import MemberRegisterPage from "@pages/member/MemberRegister";
import MemberInfoWritePage from "@pages/member/MemberInfoWrite";
import MemberInfoConfirmPage from "@pages/member/MemberInfoConfirm";
import PaymentPage from "@pages/payment";
import ClubListPage from "@pages/club/ClubList";
import LandingPage from "@pages/landing";
import NotAuthLayout from "@layouts/NotAuthLayout";
import AuthLayout from "@layouts/AuthLayout";
import ClubLayout from "@layouts/ClubLayout";
import LoginRegisterPage from "@pages/login/LoginRegister";

export const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<LandingPage />} />
      {/* 인증된 사용자가 접근할 수 없는 페이지 */}
      <Route element={<NotAuthLayout />}>
        <Route path={"/loginRegister"} element={<LoginRegisterPage />} />
        <Route
          path={"/:clubEnglishName/loginRegister"}
          element={<LoginRegisterPage />}
        />
      </Route>
      {/* 인증되지 않은 사용자가 접근할 수 없는 페이지 */}
      <Route element={<AuthLayout />}>
        <Route path={"/clubList"} element={<ClubListPage />} />
        <Route path="/:clubEnglishName" element={<ClubLayout />}>
          <Route path={"memberRegister"} element={<MemberRegisterPage />} />
          <Route path={"clubJoinNotice"} element={<ClubJoinNoticePage />} />
          <Route path={"memberInfoWrite"} element={<MemberInfoWritePage />} />
          <Route
            path={"memberInfoConfirm"}
            element={<MemberInfoConfirmPage />}
          />
          <Route path={"clubRegister"} element={<ClubRegisterPage />} />
          <Route path={"payment"} element={<PaymentPage />} />
          <Route path={""} element={<ClubMemberHomePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
