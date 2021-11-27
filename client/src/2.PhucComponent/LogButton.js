import React, { useContext, useState } from 'react'
import HeaderDefine from '../5.Share Component/Context'
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Switch, Redirect } from 'react-router';
import { Nav, NavItem, } from 'reactstrap';

import { useEffect } from 'react';
import axios from 'axios';
const LogButton = (props) => {
    const user = useContext(HeaderDefine);
    // console.log(user.role);
  const checkData = () => {
    axios.get('/api/get/session').then(res => {
      if (res.data) {
        user.setPhone(res.data.phone);
        user.setName(res.data.firstname);
        axios.get('/api/get/role', { params: { phonenum: res.data.phone } }).then(resp => user.setRole(resp.data.role))
      }
    }
    )
  }
  useEffect(() => {
    setTimeout(() => {
      // if (init) {
      //     setInit(false);
      // }
      checkData();
    }, 100);
  }, []);


    const [swit, setSwit] = useState(<span></span>);
    const logOut = () => {
        user.setPhone("");
        user.setRole("Guest");
        sessionStorage.setItem('user', JSON.stringify({ phone: '', role: 'Guest' }));
        setSwit(<Switch> <Redirect to='/home' /> </Switch>)
        // axios.get('/api/destroy/session')
    }
    if (user.role === "Guest") {
        var tempUser = sessionStorage.getItem('user');
        if (tempUser) {
            var userSession = JSON.parse(tempUser)
            if (userSession.role !== "Guest") {
                user.setRole(userSession.role);
                user.setPhone(userSession.phone);
            }
        }
        else sessionStorage.setItem('user', JSON.stringify({ phone: '', role: "Guest" }));
        // axios.get('/api/get/session').then(
        //     res=>{
        //         const value=res.data;
        //         if(value.user){
        //             user.setPhone(value.user.phone);
        //             user.setRole(value.user.role);
        //         }
        //         // console.log(m);
        //     }
        // )
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
                <NavLink className="nav-link" to='/profile'><img src='/assets/images/ava_user.JPG' className="mini-ava" alt="Mini-ava"/> {user.name} </NavLink>
                {/* <img src={user.user.ava} /> {user.user.fullname} */}
            </NavItem>
            <NavItem>
                <Button onClick={logOut}>Đăng xuất </Button>
                {/* <NavLink className="nav-link" to='/home'> <FaSignOutAlt /> Đăng xuất </NavLink> */}
            </NavItem>
        <Switch>
            <Redirect to={'/'+user.role}/>
        </Switch>
        </Nav>
        // </HeaderDefine.Consumer>
    );


}
export default LogButton;