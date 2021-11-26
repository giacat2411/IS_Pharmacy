import React, { Component, useContext, useState, useMemo } from 'react';
import axios from 'axios';
import { Modal, ModalBody } from 'reactstrap';
import { Container, Input, Row, Col, Button } from 'reactstrap';
import { Redirect, Switch } from 'react-router';
import HeaderDefine from '../1.CatComponent/Context';
import { NavLink } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
const LoginPane = () => {
    const ctx = useContext(HeaderDefine);

    // const [users, setUsers] = useState();
    // const [init, setInit] = useState(true);
    // const [doctors, setDoctors] = useState();

    // (async() => {
    //     if (init === true) {
    //         setInit(false);
    //         axios.get('/api/get/doctors').then(
    //             res => {
    //                 const doctors = res.data.doctors;
    //                 setDoctors(doctors);
    //                 console.log("123")
    //             })
    //         await  axios.get('/api/get/users')
    //             .then(res => {
    //                 const users = res.data.users;
    //                 setUsers(users);
    //                 console.log("1235"); return;
    //             });
    //         // axios.get('/api/new/session');


    //     }
    // })();

    const [phone, setPhone] = useState();
    const [pwd, setPwd] = useState();
    const [repwd, setRePwd] = useState();
    const [DOB, setDOB] = useState();
    // const ProviderValue=useMemo(()=>({formValue,setFormValue}),[formValue,setFormValue]);
    const [isModal, setModal] = useState(false);
    const [isMsg, setMsg] = useState(false);
    var Msg="";
    const toggleModal = () => {
        setModal(!isModal);
    }
const toggleMsg = () => {
        setMsg(!isMsg);
    }

    const apiLog = () => {

        axios
            .get('/api/get/access', { params: { phonenum: phone.value ,userpwd:pwd.value } }
            )
            .then(res => {
                const user = res.data;
                if (user.user[0]) {
                    ctx.setPhone(user.user[0].phone);
                    ctx.setName(user.user[0].firstname);
                    axios
                        .get('/api/get/role', { params: { phonenum: phone.value} }
                        )
                        .then(res => {
                            const role = res.data;
                            ctx.setRole(role.role);Msg="Đăng nhập thành công"; toggleMsg();
                        });
                }
                else {Msg="Sai thông tin tài khoản"; toggleMsg();}
            });
    };
    const newPwd = () => {toggleModal();
        axios
            .post('/api/post/newpwd', { params: {phone:phone.value,pwd:pwd.value, DOB:DOB.value} }//DOB:DOB.value,
            )
            .then(res => {
                const msg=res.data;
                if (msg.msg) {Msg=msg.msg;}
                else {Msg="Không thể thực hiện thay đổi";};toggleMsg();
            });
    };


    if (ctx.role === "Guest") {
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
                        </form>
                        <NavLink className="nav-link" to='/signup'> <FaUserPlus /> Hoặc đăng ký </NavLink>
                       
                    </div>
                    </Col>
                    <Col />
                </Row>
                <Modal className="LogMsg" style={{zIndex:1000}} isOpen={isMsg} toggle={toggleMsg}>
                    {Msg}
                </Modal>
                <Modal isOpen={isModal} toggle={toggleModal}>
                    <ModalBody className="modal-drug-item">
                        <h1> Quên mật khẩu </h1>
                        Số điện thoại
                        <Input name="phone" innerRef={(input) => setPhone(input)} required />
                        Ngày sinh
                        <Input name="date" type="date" innerRef={(input) => setDOB(input)} required/>
                        Mật khẩu mới
                        <Input name="pwd" innerRef={(input) => setPwd(input)} type="password" required />
                        Xác nhận mật khẩu
                        <Input name="repwd" innerRef={(input) => setRePwd(input)} type="password" required />
                        <Button onClick={newPwd} color="primary">Đổi mật khẩu</Button> <Button onClick={toggleModal}>Hủy</Button>

                    </ModalBody>
                </Modal>
            </div>
            // </HeaderDefine.Provider>
        )
    }
    else {
        axios.get('/api/set/user', { params: { phone: ctx.phone, role: ctx.role } });
        var userSession = { phone: ctx.phone, role: ctx.role };
        console.log(userSession);
        sessionStorage.clear();
        sessionStorage.setItem('user', JSON.stringify(userSession));
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
