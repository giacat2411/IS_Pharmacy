import React, {useContext } from 'react'
import HeaderDefine from './Context'
import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

import { Nav, NavItem,} from 'reactstrap';
const LogButton = props =>{
    const user=useContext(HeaderDefine)
    if (user.user.role =='Guest'){
            return(<Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink className="nav-link" to='/signup'> <FaUserPlus/> Đăng ký </NavLink>
            </NavItem>
            <NavItem>
                
                <NavLink className="nav-link" to='/login'> <FaSignInAlt /> Đăng nhập </NavLink>
            </NavItem>
                </Nav>
        );
        }
        else {
            return(<Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink className="nav-link" to='/profile'> <img src={this.state.user.ava}/> {this.user.fullname} </NavLink>
            </NavItem>
            <NavItem>
                
                <NavLink className="nav-link" to='/home'> <FaSignOutAlt /> Đăng xuất </NavLink>
            </NavItem>
                </Nav>
        );
        }


}
export default LogButton;