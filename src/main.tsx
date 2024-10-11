// import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginResgisterPage from "./pages/LoginRegister";

import "./App.css";
import ClubJoinOnboardingPage from "@pages/ClubJoinOnboarding";
import ClubJoinNoticePage from "@pages/ClubJoinNotice";

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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
