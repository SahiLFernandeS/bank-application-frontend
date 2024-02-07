import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function PrivateRoute({ Component }) {
  const context = useContext(UserContext);
  const state = useLocation();

  var result = state.state ? state.state.isAuth : false;

  if (!result || !context.user.username) {
    Navigate({ to: "/" });
  } else {
    return <Component />;
  }
}
