import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Components/SignIn";
import { UserContext } from "./Context/UserContext";
import Transaction from "./Components/Transaction";
import PrivateRoute from "./Components/PrivateRoute";
import Customer from "./Components/Customer";

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
