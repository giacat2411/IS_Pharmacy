import React, { Component, useContext, useState,useMemo } from 'react';
import axios from 'axios';
import { Modal, ModalBody } from 'reactstrap';
import { Container, Input, Row, Col, Button } from 'reactstrap';
import { Redirect, Switch } from 'react-router';
import HeaderDefine from '../1.CatComponent/Context';

const LoginPane = () => {
    const ctx = useContext(HeaderDefine);
    const [formValue, setFormValue] = useState({
        
        phone: ctx.phone,
        fullname: ctx.fullname,
        pwd: '123456',
        role:"Guest",
    });
    const ProviderValue=useMemo(()=>({formValue,setFormValue}),[formValue,setFormValue]);
    const [isModal, setModal] = useState(false);

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setFormValue((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })
    }
    const toggleModal = () => {
        setModal(!isModal);

    }
    const apiLog = () => {
        axios
            .post('/api/get/login', { query: formValue }
            )
            .then(res => {
                const users = res.data;
                setFormValue(
                    {phone:users.users[0].phone,
                        fullname:"new",
                        pwd:"123456",
                    role:users.users[0].role,
                })
            });
        
            console.log(formValue);
    };
    //TODO update context in main

    const newPwd = () => {
        console.log(formValue)
        // axios
        //     .get('/api/post/newpwd', { params: formValue }
        //     )
        //     .then(res => {
        //         const users = res.data;
        //         setFormValue(users.users);
        //         toggleModal();
        //     });
    };
    if (formValue.role !== "Guest") {
        return (
            <Switch>
                <Redirect to='/home' />
            </Switch>
        )
    }

    else
        return (
            <HeaderDefine.Provider value={ProviderValue}>
            <div className="center">
                <Row>
                    <Col xs={0.5}>
                        <Row><img src='assets/images/pana.svg' xs={0.8}></img></Row>
                    </Col>
                    <Col><div>

                        <form>
                            <h1>Đăng Nhập {isModal}</h1>
                            Số điện thoại
                            <Input name="phone" onChange={handleChange} required />
                            Mật khẩu
                            <Input name="pwd" onChange={handleChange} type="password" required />
                            <Button onClick={toggleModal} className="exception">Quên mật khẩu?</Button>

                            <Row align="center">
                                <Button onClick={apiLog} color="primary" >Đăng nhập</Button>
                            </Row>
                        </form><Button className="exception">Chưa có tài khoản? Đăng ký</Button>

                    </div>
                    </Col>
                    <Col />
                </Row>
                <Modal isOpen={isModal} toggle={toggleModal}>
                    <ModalBody className="modal-drug-item">
                        <h1> Quên mật khẩu </h1>
                        Số điện thoại
                        <Input name="phone" onChange={handleChange} required />
                        Ngày sinh
                        <Input name="date" type="date" onChange={handleChange} />
                        Mật khẩu mới
                        <Input name="pwd" onChange={handleChange} type="password" required />
                        Xác nhận mật khẩu
                        <Input name="repwd" onChange={handleChange} type="password" required />
                        <Button onClick={newPwd} color="primary">Đổi mật khẩu</Button> <Button onClick={toggleModal}>Hủy</Button>

                    </ModalBody>
                </Modal>
            </div>
            </HeaderDefine.Provider>
        )
}
export default LoginPane;
