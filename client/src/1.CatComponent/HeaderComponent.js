import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, 
        Collapse, NavbarToggler } from 'reactstrap';
import { FaHome, FaRegCalendarAlt, FaInfo, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render(){
        return(
            <Navbar dark expand="md">
            <div className="container">
                <NavbarToggler/>
                <NavbarBrand className="mr-auto" href="/"><img src='assets/images/Logo.png' height="38px" width="38px" alt='HealthCare' /></NavbarBrand>
                <Collapse navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link"  to='/home'><FaHome /> Trang chủ</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/'><FaRegCalendarAlt /> Lịch làm việc</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link"  to='/'><FaInfo /> Liên hệ</NavLink>
                        </NavItem>
                    </Nav>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" to='/signup'> <FaUserPlus/> Đăng ký </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/login'> <FaSignInAlt /> Đăng nhập </NavLink>
                        </NavItem>
                            </Nav>
                </Collapse>
            </div>
        </Navbar>
        );
    }
}

export default Header;