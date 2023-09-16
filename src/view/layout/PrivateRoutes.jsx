import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_PATH } from "../../common/constant";

const PrivateRoutes = () => {
  const account = useSelector((state) => state.authentication.account);
  console.log(account);
  if (!account) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
