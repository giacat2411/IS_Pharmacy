import React, { useState } from 'react';
import { Input, Row, Col, Button, CardHeader, CardBody, CardSubtitle } from 'reactstrap';
import { Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import storage from './firebase';

  
  const EditInfo=(props)=>{
    const [file,setFile]=useState();
    const updateInfo =async () => {
        await subReg();
        var snapshot = await storage.ref(`/images/${temp.phone}`).put(file);
        snapshot.ref.getDownloadURL().then(url=>{
                // console.log(url);
                // console.log(temp.img);
                var newValue=temp;
                newValue.img=url;
                setTemp(newValue);
                axios.post('/api/post/info', { params: {
                    // dateofbirth:Date(temp.dateofbirth),
                    firstname:temp.firstname,
                    lastname:temp.lastname,
                    address:temp.address,
                    email:temp.email,
                    phone:temp.phone,
                    img:url
                } }).then(res => {
                    props.toggleEdit();
                    if(res.data.msg)props.msgCall(res.data.msg);
                    props.setUser(temp);
                })
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
    const handleFile=(event)=>{
        setFile(event.target.files[0]);
    }
return <Card>
<CardHeader>Điều chỉnh thông tin</CardHeader>
<CardBody>
    <CardTitle>Họ và tên</CardTitle> <Input name="firstname"  onChange={handleChange} defaultValue={temp.lastname+" "+temp.firstname}></Input><FaEdit />
    <CardTitle>Email </CardTitle> <Input name="email" onChange={handleChange} defaultValue={temp.email} ></Input>
    <CardTitle>Ngày sinh </CardTitle> <Input name="dateofbirth" type="date" onChange={handleChange} defaultValue={temp.dateofbirth}></Input>
    <CardTitle>Địa chỉ </CardTitle> <Input name="address"  onChange={handleChange} defaultValue={temp.address}></Input>
<CardTitle>Ảnh đại diện </CardTitle> <Input name="img" type="file" onChange={handleFile}></Input>

</CardBody>
<CardSubtitle><Button onClick={updateInfo}>Xác nhận</Button>
    <Button onClick={props.toggleEdit}>Hủy bỏ</Button></CardSubtitle>



    
</Card>












}
export default EditInfo;
