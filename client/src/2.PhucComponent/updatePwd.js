import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Row, Col, Button, CardHeader, CardBody, CardSubtitle, Container } from 'reactstrap';
import { Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

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
<CardSubtitle>
<Container>
        <Row>
            <Col>
            <Button className="center_screen" onClick={(e)=>changePwd()} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px'}}>
                Xác nhận
            </Button>
            </Col>
            <Col>
            <NavLink className="nav-link" to='/profile' onClick={props.togglePwd} style={{marginTop: '-8px'}}>
                <Button style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                    Hủy bỏ
                </Button>
            </NavLink>
            </Col>
        </Row>
        </Container>
    </CardSubtitle>
</Card>







}
export default UpdatePwd;