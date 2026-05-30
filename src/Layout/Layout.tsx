import { Outlet } from "react-router-dom";
import Footer from "./../components/ProjectComponents/Footer/Footer";
import NavbarComponent from "../components/ProjectComponents/Navbar/Navbar";

export default function Layout() {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <Footer />
    </div>
  );
}
