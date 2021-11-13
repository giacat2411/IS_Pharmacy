import React, { useContext, useState } from 'react'
import HeaderDefine from './Context'
import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Switch, Redirect } from 'react-router';


import { Nav, NavItem, } from 'reactstrap';
const LogButton = (props) => {
    const user = useContext(HeaderDefine);
    // console.log(user.role);
    const [swit, setSwit] = useState(<span></span>);

    const logOut=()=>{
        user.setPhone("");
        user.setRole("Guest");
        setSwit(<Switch> <Redirect to='/home' /> </Switch>)
    }
    
    if (user.role === "Guest")
            return (
                <>
                {swit}
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="nav-link" to='/signup'> <FaUserPlus /> Đăng ký </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/login'> <FaSignInAlt /> Đăng nhập </NavLink>
                    </NavItem>
                </Nav>
                <Switch>
                    <Redirect to='/home' />
                </Switch>
                </>
            );

    return (
        // <HeaderDefine.Consumer>
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink className="nav-link" to='/profile'>Thông tin cá nhân </NavLink>
                {/* <img src={user.user.ava} /> {user.user.fullname} */}
            </NavItem>
            <NavItem>
                <Button onClick={logOut}>Đăng xuất </Button>
                {/* <NavLink className="nav-link" to='/home'> <FaSignOutAlt /> Đăng xuất </NavLink> */}
            </NavItem>
        </Nav>
        // </HeaderDefine.Consumer>
    );


}
export default LogButton;