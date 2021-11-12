import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, 
        Collapse, NavbarToggler } from 'reactstrap';
import { FaHome, FaRegCalendarAlt, FaInfo, FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import axios from 'axios';


import LogButton from './LogButton';
// import {HeaderDefine, ThingsProvider} from './Context';
// import HeaderDefine from '../2.PhucComponent/Context';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
            //user:HeaderDefine.user,

            // {
            //     phone: "0",
            //     firstname:"Guest",
            //     lastname:"",
            //     dateofbirth:'01/01/2001', 
            //     address: "HCM", 
            //     email:'phuc@gmail.com', 
            //     pwd:'123456',
            // }
        }
        // this.setState(user.pwd='123456')
    }
    // componentDidMount(){
    //     axios.get('/api/get/users').then(res =>{
    //         const users = res.data;
    //        this.setState({ user: users.users});
    //     //    console.log(this.state.user);
    //     })
    // }
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
                    <LogButton/>
                </Collapse>
            </div>
        </Navbar>
        );
    }
}

export default Header;