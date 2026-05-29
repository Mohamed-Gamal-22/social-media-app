import { useState } from "react";
import logo from "../../../assets/Logo.webp";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  NavbarMenuToggle,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const menuItems = ["login", "register", "logout"];

  return (
    <Navbar className="p-3" maxWidth="xl">
      

      <NavbarBrand>
        <Link to="/">
          <img src={logo} width={70} />
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {/* Links in big screen */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" to="/login">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="register">
              Register
            </Link>
          </NavbarItem>
        </NavbarContent>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              // will be changed
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="help_and_feedback">
              <Link to="/profile" className="w-full block">Profile</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* <NavbarMenu className="bg-red-500">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full block"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              to={`/${item === "logout" ? "login" : item}`}
              // size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}

      {/* <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      /> */}
    </Navbar>
  );
}
