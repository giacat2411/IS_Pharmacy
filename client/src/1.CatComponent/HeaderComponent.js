import React, { Component,useContext,useState,useMemo } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, 
        Collapse, NavbarToggler } from 'reactstrap';
import { FaHome, FaRegCalendarAlt, FaInfo, FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import axios from 'axios';


import LogButton from './LogButton';
import HeaderDefine from './Context';
// import {HeaderDefine, ThingsProvider} from './Context';
// import HeaderDefine from '../2.PhucComponent/Context';


const Header =()=> {
    const ctx = useContext(HeaderDefine);
    const [formValue, setFormValue] = useState({
        
        phone: ctx.phone,
        fullname: ctx.fullname,
        pwd: '123456',
        role:"Guest",
    });
    const ProviderValue=useMemo(()=>({formValue,setFormValue}),[formValue,setFormValue]);
    
        

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
                    <HeaderDefine.Provider value={ProviderValue}>

                    <LogButton/>
                    </HeaderDefine.Provider>
                </Collapse>
            </div>
        </Navbar>
        );
    }


export default Header;