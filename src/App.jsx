import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import toast, { Toaster } from "react-hot-toast";
import { HeroUIProvider } from "@heroui/react";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedAuth from "./components/Protected/ProtectedAuth";
import ProtectedRoute from "./components/Protected/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </HeroUIProvider>
      </AuthContextProvider>
    </>
  );
}
