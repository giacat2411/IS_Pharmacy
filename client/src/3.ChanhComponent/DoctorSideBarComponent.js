import React, { Component } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter, SidebarHeader } from 'react-pro-sidebar';
import { FaGem, FaHeart, FaGithub } from 'react-icons/fa';

class DoctorSideBar extends Component {
    render(){
        return(
            <ProSidebar className="cat-nurse-sidebar">
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'black'
                        }}
                        >
                        <img style={{'margin-right': '5px', 'margin-top': '-5px'}} height="45.88px" width="45px" src="/assets/images/sub_logo.png" /> 
                        <span> Tính năng bác sĩ </span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaGem />}>Thống kê lịch khám</MenuItem>
                        <MenuItem icon={<FaGem />}>Xem lịch làm việc</MenuItem>
                        <SubMenu title="Quản lý điều dưỡng" icon={<FaHeart />}>
                            <MenuItem>Cấp tài khoản điều dưỡng</MenuItem>
                            <MenuItem>Xem thông tin điều dưỡng</MenuItem>
                        </SubMenu>
                        <SubMenu title="Quản lý lượt điều trị" icon={<FaHeart />}>
                            <MenuItem>Tạo lượt điều trị</MenuItem>
                            <MenuItem>Xem lượt điều trị</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                        textAlign: 'center'
                    }}
                    >
                    <div style={{textDecoration: 'none', color: 'black', 
                                border: '1px solid', borderRadius: '15px',
                                width: '150px', height: '35px', margin: 'auto', 'padding-top': '5px'}}>
                    <a
                        href="https://github.com/giacat2411/IS_Pharmacy"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                        style={{textDecoration: 'none', color: 'black'}}
                    >
                        <FaGithub />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        &nbsp; View Source
                        </span>
                    </a>
                    </div>
                </div>
                </SidebarFooter>
            </ProSidebar>
        );
    }
}

export default DoctorSideBar;