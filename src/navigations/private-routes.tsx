import { lazy } from "react";
import CheckRouteAccess from "../utils/CheckRoutesAccess";

const DashboardPage = lazy(() => import("../pages/Dashboard"));

const UsersPage = lazy(() => import("../pages/Users/Users"));

const CreateUserPage = lazy(() => import("../pages/Users/CreateUser"));

const TransactionsPage = lazy(() => import("../pages/Transactions"));

const BookingsPage = lazy(() => import("../pages/Bookings/Bookings"));

const SingleBookingPage = lazy(
  () => import("../pages/Bookings/SingleBooking")
)

const HotelsPage = lazy(() => import("../pages/HotelsPage"))

export const privateRoutes = [
  {
    path: "/dashboard",
    component: DashboardPage,
  },
  {
    path: "/users",
    component: () => (
      <CheckRouteAccess permission="view-users" component={UsersPage} />
    ),
    permission: "view-users",
  },
  {
    path: "/users/:id",
    component: () => (
      <CheckRouteAccess permission="view-users" component={UsersPage} />
    ),
    permission: "view-users",
  },
  {
    path: "/users/create",
    // component: CreateUserPage,
    component: () => (
      <CheckRouteAccess permission="create-users" component={CreateUserPage} />
    ),
    permission: "create-users",
  },
  {
    path: "/transactions",
    component: () => (
      <CheckRouteAccess permission="view-transactions" component={TransactionsPage} />
    ),
    permission: "view-transactions",
  },
  {
    path: "/transactions/:id",
    component: () => (
      <CheckRouteAccess permission="view-transactions" component={TransactionsPage} />
    ),
  },
  {
    path: "/bookings",
    component: () => (
      <CheckRouteAccess permission="view-bookings" component={BookingsPage} />
    ),
    permission: "view-bookings",
  },
  {
    path: "/single-booking/:id",
    component: () => (
      <CheckRouteAccess permission="view-bookings" component={SingleBookingPage} />
    ),
    permission: "view-bookings"
  },
  {
    path: "/hotels",
    component: () => (
      <CheckRouteAccess permission="view-hotels" component={HotelsPage} />
    ),
    permission: "view-hotels",
  },
];
