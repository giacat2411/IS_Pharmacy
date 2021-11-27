import React, { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import { Input, Col, Button,  } from 'reactstrap';
import { Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

const EditHealth=(props)=>{
    const postHealth = () => {
        axios.post('/api/post/TTSK', { params: { tempInfo, phone: props.phone } }).then(res => {
            props.toggleHealth();
            if(res.data.msg)props.msgCall(res.data.msg);
        })
    }
    const [tempInfo,setTemp]=useState(props.health);
    const handleChange=(evt) =>{
        const value = evt.target.value;
        var newValue=tempInfo;
        newValue[evt.target.name]=value;
        setTemp(newValue);
      }
return (<Col>
    <Card>
        <CardTitle>Chiều cao</CardTitle> 
        <Input name="height" defaultValue={tempInfo.height} ></Input><FaEdit />
    </Card>
    <Card>
        <CardTitle>Cân nặng: </CardTitle><Input name="weight"  onChange={handleChange} defaultValue={tempInfo.weight}/></Card>

    <Card>
        <CardTitle>Nhóm máu: </CardTitle><Input name="blood_type"  defaultValue={tempInfo.blood_type}onChange={handleChange}/> </Card>
    <Card>
        <CardTitle>Tiền sử:</CardTitle> <Input name="medical_history"  defaultValue={tempInfo.medical_history}onChange={handleChange}/> </Card>
    <Card>
        <CardTitle>Bệnh lý nền: </CardTitle><Input name="medical_background"  defaultValue={tempInfo.medical_background}onChange={handleChange}/></Card>
    <Button onClick={postHealth}>Xác nhận</Button>
    <NavLink className="nav-link" to='/profile' onClick={props.toggleHealth}><Button>Hủy bỏ</Button></NavLink>
</Col>)
}
export default EditHealth;