import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginResgisterPage } from "./pages/LoginRegister";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginResgisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
