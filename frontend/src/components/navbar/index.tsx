import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from "./navbarElements.tsx";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
 
                <NavMenu>
                    <NavLink to="/home" >
                        Home
                    </NavLink>
                    <NavLink to="/about" >
                        About
                    </NavLink>
                    <NavLink to="/annual" activeStyle>
                        Annual Report
                    </NavLink>
                    <NavLink to="/team" activeStyle>
                        Teams
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};
 
export default Navbar;