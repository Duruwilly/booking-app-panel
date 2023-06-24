import { lazy } from "react";

// const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
import NotFoundPage from "../pages/NotFoundPage";

const LoginPage = lazy(() => import("../pages/Login"));

export const publicRoutes = [
  {
    path: "*",
    component: NotFoundPage,
    ifAuthenticatedRedirect: false,
  },
  {
    path: "/",
    component: LoginPage,
    ifAuthenticatedRedirect: true,
  },
];
