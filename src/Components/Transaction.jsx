import React from "react";
import { UserContext } from "../Context/UserContext";

export default function Transaction() {
  const context = React.useContext(UserContext);

  console.log("context----->", context);

  return <div>Transaction</div>;
}
