import { Outlet } from "react-router-dom";
import Footer from "./../components/ProjectComponents/Footer/Footer";
import NavbarComponent from "../components/ProjectComponents/Navbar/Navbar";


export default function Layout() {
  return (
    <div>
      <NavbarComponent /> 
      <div className="w-full px-4 md:w-[80%] md:mx-auto p-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
