import React, { useState } from 'react';
import { Input, Row, Col, Button, CardHeader, CardBody, CardSubtitle, Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import storage from './firebase';


const EditInfo = (props) => {
    const [file, setFile] = useState();
    const updateInfo = async () => {
        await subReg();
        if (file) {
            var snapshot = await storage.ref(`/images/${temp.phone}`).put(file);
            snapshot.ref.getDownloadURL().then(url => {
                var newValue = temp;
                newValue.img = url;
                setTemp(newValue);
                axios.post('/api/post/info', {
                    params: {
                        // dateofbirth:Date(temp.dateofbirth),
                        firstname: temp.firstname,
                        lastname: temp.lastname,
                        address: temp.address,
                        email: temp.email,
                        phone: temp.phone,
                        img: url
                    }
                }).then(res => {
                    props.toggleEdit();
                    if (res.data.msg) props.msgCall(res.data.msg);
                    props.setUser(temp);
                })
            })
        }
        else {
            axios.post('/api/post/info', { params: temp }).then(res => {
                props.toggleEdit();
                if (res.data.msg) props.msgCall(res.data.msg);
                props.setUser(temp);
            })
        }

    }
    const [temp, setTemp] = useState(props.info);
    const handleChange = (evt) => {
        const value = evt.target.value;
        var newValue = temp;
        newValue[evt.target.name] = value;
        setTemp(newValue);
    }

    const subReg = () => {
        const str = temp.firstname;
        var lname = str.split(' ').slice(0, -1).join(' ');
        var fname = str.split(' ').slice(-1).join(' ');
        var newTemp = temp;
        newTemp.lastname = lname;
        newTemp.firstname = fname;
        setTemp(newTemp);
    };
    const handleFile = (event) => {
        setFile(event.target.files[0]);
    }
    return <Card>
        <CardHeader>Điều chỉnh thông tin</CardHeader>
        <CardBody>
            <CardTitle>Họ và tên</CardTitle> <Input name="firstname" onChange={handleChange} defaultValue={temp.lastname + " " + temp.firstname}></Input><FaEdit />
            <CardTitle>Email </CardTitle> <Input name="email" onChange={handleChange} defaultValue={temp.email} ></Input>
            <CardTitle>Ngày sinh </CardTitle> <Input name="dateofbirth" type="date" onChange={handleChange} defaultValue={temp.dateofbirth}></Input>
            <CardTitle>Địa chỉ </CardTitle> <Input name="address" onChange={handleChange} defaultValue={temp.address}></Input>
            <CardTitle>Ảnh đại diện </CardTitle> <Input name="img" type="file" onChange={handleFile}></Input>

        </CardBody>
        <CardSubtitle>
            <Container>
                <Row>
                    <Col>
                        <Button className="center_screen" onClick={updateInfo} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                            Xác nhận
                        </Button>
                    </Col>
                    <Col>
                        <NavLink className="nav-link" to='/profile' onClick={props.toggleEdit} style={{ marginTop: '-8px' }}>
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
export default EditInfo;
