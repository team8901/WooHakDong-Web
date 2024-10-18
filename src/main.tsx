import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import LoginRegisterPage from "@pages/LoginRegister";
import ClubJoinOnboardingPage from "@pages/ClubJoinOnboarding";
import ClubJoinNoticePage from "@pages/ClubJoinNotice";
import ClubJoinInfoWritePage from "@pages/ClubJoinInfoWrite";
import ClubJoinInfoConfirmPage from "@pages/ClubJoinInfoConfirm";
import ClubJoinTempCompletePage from "@pages/ClubJoinTempComplete";
import PaymentPage from "@pages/Payment";
import AuthWrapper from "wrapper/AuthWrapper";
import HomePage from "@pages/Home";
import { AuthProvider } from "@contexts/AuthContext";

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
        path: "clubJoinOnboarding",
        element: <ClubJoinOnboardingPage />,
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
        path: "clubJoinTempComplete",
        element: <ClubJoinTempCompletePage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
