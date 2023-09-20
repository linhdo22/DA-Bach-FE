import { createBrowserRouter } from "react-router-dom";
import { titleLoader } from "./common/helper";
import Layout from "./view/layout/Layout";
import LoginPage from "./view/login/LoginPage";
import { ROUTE_PATH } from "./common/constant";
import HomePage from "./view/home/HomePage";
import AccountPage from "./view/account/AccountPage";
import PrivateRoutes from "./view/layout/PrivateRoutes";
import UnauthorizedRoutes from "./view/layout/UnauthorizedRoutes";
import DrugPage from "./view/drug/DrugPage";
import ForgotPassword from "./view/login/ForgotPassword";
import ResetPassword from "./view/login/ResetPassword";
import ProfilePage from "./view/profile/ProfilePage";
import BookingPage from "./view/booking/BookingPage";
import BookingDetail from "./view/booking/BookingDetail";
import ViewPDF from "./view/view-pdf/ViewPDF";
import DiagnosisPage from "./view/diagnosis/Diagnosis";
import FeedbackPage from "./view/feedback/FeedbackPage";

const LIST_PUBLIC_ROUTE = [
  {
    title: "Login",
    path: ROUTE_PATH.LOGIN,
    component: <LoginPage />,
  },
  {
    title: "Register",
    path: ROUTE_PATH.REGISTER,
    component: <LoginPage />,
  },
  {
    title: "Forgot password",
    path: ROUTE_PATH.FORGOT_PASSWORD,
    component: <ForgotPassword />,
  },
  {
    title: "Reset password",
    path: ROUTE_PATH.RESET_PASSWORD,
    component: <ResetPassword />,
  },
];

const LIST_PRIVATE_ROUTE = [
  {
    title: "Home",
    path: ROUTE_PATH.HOME,
    component: <HomePage />,
  },
  {
    title: "Account Management",
    path: ROUTE_PATH.ACCOUNT,
    component: <AccountPage />,
  },
  {
    title: "Drug Management",
    path: ROUTE_PATH.DRUG,
    component: <DrugPage />,
  },
  {
    title: "Profile",
    path: ROUTE_PATH.PROFILE,
    component: <ProfilePage />,
  },
  {
    title: "Booking",
    path: `${ROUTE_PATH.BOOKING}/:id`,
    component: <BookingDetail />,
  },
  {
    title: "Booking",
    path: ROUTE_PATH.BOOKING,
    component: <BookingPage />,
  },
  {
    title: "Diagnoses",
    path: ROUTE_PATH.DIAGNOSES,
    component: <DiagnosisPage />,
  },
  {
    title: "Feedback",
    path: ROUTE_PATH.FEEDBACK,
    component: <FeedbackPage />,
  },
];

const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: LIST_PRIVATE_ROUTE.map((route) => ({
          loader: titleLoader(route.title),
          path: route.path,
          element: route.component,
        })),
      },
    ],
  },
  {
    element: <UnauthorizedRoutes />,
    children: LIST_PUBLIC_ROUTE.map((route) => ({
      loader: titleLoader(route.title),
      path: route.path,
      element: route.component,
    })),
  },
  {
    loader: titleLoader("View PDF"),
    path: ROUTE_PATH.VIEW_PDF,
    element: <ViewPDF />,
  },
]);

export default routes;
