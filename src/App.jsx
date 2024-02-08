import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Components/SignIn";
import { UserContext } from "./Context/UserContext";
import PrivateRoute from "./Components/PrivateRoute";
import Customer from "./Components/Customer";
import Transaction from "./Components/Transaction";
import TransactionById from "./Components/TransactionById";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "transaction",
    element: <PrivateRoute Component={Transaction} />,
  },
  {
    path: "customer",
    element: <PrivateRoute Component={Customer} />,
  },
  {
    path: "transaction/:userId",
    element: <PrivateRoute Component={TransactionById} />,
  },
]);

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
