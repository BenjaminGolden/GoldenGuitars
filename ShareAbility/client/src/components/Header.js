import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';
import './header.css'
import { Image } from 'cloudinary-react';


const imgStyle = {
  maxHeight: 90,
  maxWidth: 80,
}
export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

// const logo = () => {
//  const image = url("../components/images/GGOutline.png")
//  return image;
// }

  return (
    <div>
        
      <Navbar   className="header" medium expand="md" >
        <NavbarBrand  ><Image style={imgStyle} cloudName="djzvagvn5" publicId="https://res.cloudinary.com/djzvagvn5/image/upload/v1628107133/Golden_Guitars_Logo_ms1fir.jpg" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="header" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem className="mr-6">
                  <NavLink className="headerFont" tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem className="ml-6">
                  <NavLink className="headerFont" tag={RRNavLink} to="/project/add">New Project</NavLink>
                </NavItem>
                <NavItem className="ml-6">
                  <NavLink className="headerFont" tag={RRNavLink} to="/expenses">Expenses</NavLink>
                </NavItem>

              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link headerFont"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
