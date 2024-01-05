import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return <div>{currentUser !==null ? <Outlet /> : <Navigate to="/sign-in" />}</div>;
}

export default PrivateRoute;
