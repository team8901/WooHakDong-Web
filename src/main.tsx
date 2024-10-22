import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import LoginRegisterPage from "@pages/LoginRegister";
import ClubJoinNoticePage from "@pages/ClubJoinNotice";
import ClubJoinInfoWritePage from "@pages/ClubJoinInfoWrite";
import ClubJoinInfoConfirmPage from "@pages/ClubJoinInfoConfirm";
import PaymentPage from "@pages/Payment";
import AuthWrapper from "wrapper/AuthWrapper";
import HomePage from "@pages/Home";
import { AuthProvider } from "@contexts/AuthContext";
import ClubMemberHomePage from "@pages/ClubMemberHome";
import MemberRegisterPage from "@pages/MemberRegister";
import ClubRegisterPage from "@pages/ClubRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
  },
  {
    path: "/home",
    element: <HomePage />,
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
        path: "clubJoinInfoWrite",
        element: <ClubJoinInfoWritePage />,
      },
      {
        path: "clubJoinInfoConfirm",
        element: <ClubJoinInfoConfirmPage />,
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
