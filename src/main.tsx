// import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import LoginResgisterPage from "./pages/LoginRegister";
import ClubJoinOnboardingPage from "@pages/ClubJoinOnboarding";
import ClubJoinNoticePage from "@pages/ClubJoinNotice";
import { AuthProvider } from "@contexts/AuthContext";
import ClubJoinInfoWritePage from "@pages/ClubJoinInfoWrite";
import ClubJoinInfoConfirmPage from "@pages/ClubJoinInfoConfirm";
import ClubJoinTempCompletePage from "@pages/ClubJoinTempComplete";
import ClubJoinTempOnboardingPage from "@pages/ClubJoinTempOnboarding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginResgisterPage />,
  },
  {
    path: "/clubJoinOnboarding",
    element: <ClubJoinOnboardingPage />,
  },
  {
    path: "/clubJoinNotice",
    element: <ClubJoinNoticePage />,
  },
  {
    path: "/clubJoinInfoWrite",
    element: <ClubJoinInfoWritePage />,
  },
  {
    path: "/clubJoinInfoConfirm",
    element: <ClubJoinInfoConfirmPage />,
  },
  {
    path: "/clubJoinTempComplete",
    element: <ClubJoinTempCompletePage />,
  },
  {
    path: "/clubJoinTempOnboarding",
    element: <ClubJoinTempOnboardingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
);
