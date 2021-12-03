import React, { useContext } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavItem,
    Collapse, NavbarToggler
} from 'reactstrap';
import { FaHome, FaRegCalendarAlt, FaInfo } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import LogButton from '../2.PhucComponent/LogButton';
import HeaderDefine from './Context';

const Header = (props) => {
    return (
        <div>
            <Navbar className="navbar-header" color="light"  expand="md"  light container>
                <NavbarToggler />
                <NavbarBrand className="me-auto"><img src='/assets/images/Logo.png' height="38px" width="38px" alt='HealthCare' /></NavbarBrand>
                <Collapse navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to='/'><FaHome /> Trang chủ</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/'><FaRegCalendarAlt /> Lịch làm việc</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/'><FaInfo /> Liên hệ</NavLink>
                        </NavItem>
                    </Nav>
                    {/* <HeaderDefine.Provider value={ProviderValue}> */}
                    <LogButton />
                    {/* </HeaderDefine.Provider> */}
                </Collapse>
            </Navbar>
        </div>
    );
}


export default Header;