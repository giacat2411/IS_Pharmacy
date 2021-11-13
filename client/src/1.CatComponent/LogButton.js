import React, { useContext } from 'react'
import HeaderDefine from './Context'
import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


import { Nav, NavItem, } from 'reactstrap';
const LogButton = (props) => {
    const user = useContext(HeaderDefine);
    console.log(user.role);


    if (user.role === "Guest")
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="nav-link" to='/signup'> <FaUserPlus /> Đăng ký </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/login'> <FaSignInAlt /> Đăng nhập </NavLink>
                    </NavItem>
                </Nav>
            );

    return (
        // <HeaderDefine.Consumer>
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink className="nav-link" to='/profile'>Thông tin cá nhân </NavLink>
                {/* <img src={user.user.ava} /> {user.user.fullname} */}
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" to='/home'> <FaSignOutAlt /> Đăng xuất </NavLink>
            </NavItem>
        </Nav>
        // </HeaderDefine.Consumer>
    );


}
export default LogButton;