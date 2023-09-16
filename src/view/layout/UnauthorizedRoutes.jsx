import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATH } from "../../common/constant";

const UnauthorizedRoutes = () => {
  const account = useSelector((state) => state.authentication.account);
  if (account) {
    return <Navigate to={ROUTE_PATH.HOME} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default UnauthorizedRoutes;
