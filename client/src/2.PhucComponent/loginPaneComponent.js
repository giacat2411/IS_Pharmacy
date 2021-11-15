import React, { Component, useContext, useState, useMemo } from 'react';
import axios from 'axios';
import { Modal, ModalBody } from 'reactstrap';
import { Container, Input, Row, Col, Button } from 'reactstrap';
import { Redirect, Switch } from 'react-router';
import HeaderDefine from '../1.CatComponent/Context';

const LoginPane = () => {
    const ctx = useContext(HeaderDefine);

    const [users, setUsers] = useState();
    const [init, setInit] = useState(true);
    const [doctors, setDoctors] = useState();

    (() => {
        if (init === true) {
            setInit(false);
            axios.get('/api/get/doctors').then(
                res => {
                    const doctors = res.data.doctors;
                    setDoctors(doctors);
                })
            axios.get('/api/get/users')
                .then(res => {
                    const users = res.data.users;
                    setUsers(users);
                });
            // axios.get('/api/new/session');
            

        }
    })();

    const [phone, setPhone] = useState();
    const [pwd, setPwd] = useState();

    // const ProviderValue=useMemo(()=>({formValue,setFormValue}),[formValue,setFormValue]);
    const [isModal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!isModal);
    }

    const apiLog = () => {
        const login = users.filter((user) => {return user.phone.toString() === phone.value.toString()})
        console.log(login.length);
        if (login.length !== 0)
        { console.log('Hi')
            const doc_role = doctors.filter((doctor) => {return doctor.phone.toString() === phone.value.toString()})
            console.log(doc_role);
            if (doc_role.length !== 0)  ctx.setRole("Doctor");
            else {
                ctx.setRole('Patient');
            }
        }
        else ctx.setRole("Guest");
        //ASSIGN SESSION
         //TODO search for Nurse list and assign


        // if (phone.value === "1") ctx.setRole('Patient');
        // else if (phone.value === "2") ctx.setRole('Doctor');
        // else if (phone.value === "3") ctx.setRole('Nurse');
    };
    const newPwd = () => {
        // console.log(formValue)
        // axios
        //     .get('/api/post/newpwd', { params: formValue }
        //     )
        //     .then(res => {
        //         const users = res.data;
        //         setFormValue(users.users);
        //         toggleModal();
        //     });
    };
    
    
    if(ctx.role==="Guest"){
        return (
            // <HeaderDefine.Provider value={ProviderValue}>
            <div className="center">
                <Row>
                    <Col xs={0.5}>
                        <Row><img src='assets/images/pana.svg' xs={0.8}></img></Row>
                    </Col>
                    <Col><div>

                        <form>
                            <h1>Đăng Nhập {isModal}</h1>
                            Số điện thoại
                            <Input name="phone" innerRef={(input) => setPhone(input)} required />
                            Mật khẩu
                            <Input name="pwd" innerRef={(input) => setPwd(input)} type="password" required />
                            <Button onClick={toggleModal} className="exception">Quên mật khẩu?</Button>

                            <Row align="center">
                                <Button onClick={apiLog} color="primary" >Đăng nhập</Button>
                            </Row>
                        </form><Button className="exception">Chưa có tài khoản? Đăng ký</Button>

                    </div>
                    </Col>
                    <Col />
                </Row>
                {/* <Modal isOpen={isModal} toggle={toggleModal}>
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
                </Modal> */}
            </div>
            // </HeaderDefine.Provider>
        )}
        else{
            axios.get('/api/set/user', { params: { phone: ctx.phone, role: ctx.role } });
            
        var userSession={phone:ctx.phone,role:ctx.role};
        console.log(userSession);
        sessionStorage.clear();
        sessionStorage.setItem('user',JSON.stringify(userSession));
            if (ctx.role === "Patient") {
                return (
                    <Switch>
                        <Redirect to='/customer' />
                    </Switch>
                )
            } else if (ctx.role === "Nurse") {
                return (
                    <Switch>
                        <Redirect to='/nurse' />
                    </Switch>
                )
            } else if (ctx.role === "Doctor") {
                return (<Switch>
                    <Redirect to='/doctor' />
                </Switch>)
            }
        
        }
}
export default LoginPane;
