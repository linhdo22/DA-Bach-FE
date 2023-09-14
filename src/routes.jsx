import { createBrowserRouter } from "react-router-dom";
import { titleLoader } from "./common/helper";

import HeaderBarLayout from "./view/layout/HeaderBarLayout";
import LoginPage from "./view/login/LoginPage";
import { ROUTE_PATH } from "./common/constant";
import HomePage from "./view/home/HomePage";

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
];

const routes = createBrowserRouter([
  {
    path: "",
    element: <HeaderBarLayout />,
    children: LIST_PRIVATE_ROUTE.map((route) => ({
      loader: titleLoader(route.title),
      path: route.path,
      element: route.component,
    })),
  },
  ...LIST_PUBLIC_ROUTE.map((route) => ({
    loader: titleLoader(route.title),
    path: route.path,
    element: route.component,
  })),
]);

export default routes;
