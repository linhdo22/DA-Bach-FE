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
]);

export default routes;
