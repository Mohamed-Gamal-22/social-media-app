import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../components/ProjectComponents/Navbar/Navbar";
import Footer from "./../components/ProjectComponents/Footer/Footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 md:w-[80%] md:mx-auto p-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
