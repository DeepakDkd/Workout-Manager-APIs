import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import { WorkoutContextProvider } from "./Context/WorkoutContext.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import RouteProtector from "./RouteProtector/RouteProtector.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <RouteProtector authentication={true}>
            <Home />
          </RouteProtector>
        ),
      },
      {
        path: "login",
        element: (
          <RouteProtector>
            <Login />
          </RouteProtector>
        ),
      },
      {
        path: "signup",
        element: (
          <RouteProtector>
            <SignUp />
          </RouteProtector>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <RouterProvider router={router} />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
