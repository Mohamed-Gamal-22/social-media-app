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

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
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
