import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import ClubJoinNoticePage from "@pages/club/ClubJoinNotice";
import AuthWrapper from "wrapper/AuthWrapper";
import { AuthProvider } from "@contexts/AuthContext";
import ClubMemberHomePage from "@pages/club/ClubMemberHome";
import ClubRegisterPage from "@pages/club/ClubRegister";
import LoginRegisterPage from "@pages/login/LoginRegister";
import MemberRegisterPage from "@pages/member/MemberRegister";
import MemberInfoWritePage from "@pages/member/MemberInfoWrite";
import MemberInfoConfirmPage from "@pages/member/MemberInfoConfirm";
import PaymentPage from "@pages/payment";
import ClubListPage from "@pages/ClubList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
  },
  {
    path: "/clubList",
    element: <ClubListPage />,
  },
  {
    path: "/loginRegister",
    element: <LoginRegisterPage />,
  },

  {
    path: "/:prefix",
    element: <AuthWrapper />,
    children: [
      {
        path: "loginRegister",
        element: <LoginRegisterPage />,
      },
      {
        path: "memberRegister",
        element: <MemberRegisterPage />,
      },
      {
        path: "clubJoinNotice",
        element: <ClubJoinNoticePage />,
      },
      {
        path: "memberInfoWrite",
        element: <MemberInfoWritePage />,
      },
      {
        path: "memberInfoConfirm",
        element: <MemberInfoConfirmPage />,
      },
      {
        path: "clubRegister",
        element: <ClubRegisterPage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "",
        element: <ClubMemberHomePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
