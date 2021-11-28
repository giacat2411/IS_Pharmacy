import React, { useState } from 'react';
import { Input, Row, Col, Button, CardHeader, CardBody, CardSubtitle } from 'reactstrap';
import { Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

const EditInfo=(props)=>{
    const date = (curr) => { return `${curr.getDate()}/${curr.getMonth() + 1}/${curr.getFullYear()}`; }
    
    const updateInfo = () => {
        subReg();
        axios.post('/api/post/info', { params: temp }).then(res => {
            props.toggleEdit();
            if(res.data.msg)props.msgCall(res.data.msg);
        })
    }
    const [temp,setTemp]=useState(props.info);
    const handleChange=(evt) =>{
        const value = evt.target.value;
        var newValue=temp;
        newValue[evt.target.name]=value;
        setTemp(newValue);
      }
      
    const subReg=()=>{
        const str=temp.firstname;
        var lname=str.split(' ').slice(0, -1).join(' ');
        var fname=str.split(' ').slice(-1).join(' ');
        var newTemp=temp;
        newTemp.lastname=lname;
        newTemp.firstname=fname;
        setTemp(newTemp);
    };
return <Card>
<CardHeader>Điều chỉnh thông tin</CardHeader>
<CardBody>
    <CardTitle>Họ và tên</CardTitle> <Input name="firstname"  onChange={handleChange} defaultValue={temp.lastname+" "+temp.firstname}></Input><FaEdit />
    <CardTitle>Số điện thoại </CardTitle> <Input name="phone" onChange={handleChange} defaultValue={temp.phone} ></Input>
    <CardTitle>Ngày sinh </CardTitle> <Input name="dateofbirth"  onChange={handleChange} defaultValue={temp.dateofbirth}></Input>
    <CardTitle>Địa chỉ </CardTitle> <Input name="address"  onChange={handleChange} defaultValue={temp.address}></Input>
</CardBody>
<CardSubtitle><Button onClick={updateInfo}>Xác nhận</Button>
    <Button onClick={props.toggleEdit}>Hủy bỏ</Button></CardSubtitle>



    
</Card>












}
export default EditInfo;
