import React, { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Input, Row, Col, Button, CardHeader, CardBody, CardSubtitle } from 'reactstrap';
import Home from '../5.Share Component/Main UI/HomeComponent';
import HeaderDefine from '../5.Share Component/Context';
import { useContext } from 'react';
import { Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { Modal } from 'reactstrap';
import NotesApp from './note';
import { useEffect } from 'react';

const UpdatePwd=(props)=>{

    
    const [pwd,setpwd]=useState();

    const [newpwd,setNewpwd]=useState();

    const [repwd,setRepwd]=useState();
    const changePwd = () => {
        axios.post('/api/post/pwd', { params: { phone: props.phone, pwd: pwd, newpwd: newpwd } }).then(res => {
            props.togglePwd();
            if(res.data.msg)props.msgCall(res.data.msg);
        })
    }


return <Card>
<CardHeader>Thay đổi mật khẩu</CardHeader>
<CardBody>
    <CardTitle>Mật khẩu cũ</CardTitle> <Input name="pwd" type="password" onChange={(e)=>setpwd(e.target.value)} ></Input><FaEdit />

    <CardTitle>Mật khẩu mới</CardTitle> <Input name="newpwd" type="password" onChange={(e)=>setNewpwd(e.target.value)}></Input>

    <CardTitle>Nhập lại mật khẩu </CardTitle> <Input name="repwd" type="password" onChange={(e)=>setRepwd(e.target.value)}></Input>
        {(repwd===pwd)? "Mật khẩu chưa trùng khớp":"" }
</CardBody>
<CardSubtitle><Button onClick={(e)=>changePwd()}>Xác nhận</Button>
    <Button onClick={props.togglePwd}>Hủy bỏ</Button></CardSubtitle>
</Card>







}
export default UpdatePwd;