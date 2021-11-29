import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Modal, ModalBody } from 'reactstrap';
import { Input, Row, Col, Button, Container } from 'reactstrap';
import { Redirect, Switch } from 'react-router';
import HeaderDefine from '../5.Share Component/Context';
import { NavLink } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const LoginPane = (props) => {
    const ctx = useContext(HeaderDefine);

    const [phone, setPhone] = useState();
    const [pwd, setPwd] = useState();
    const [, setRePwd] = useState();
    const [DOB, setDOB] = useState();
    const [isModal, setModal] = useState(false);
    const [isMsg, setMsg] = useState(false);

    var Msg = "";
    const toggleModal = () => {
        setModal(!isModal);
    }

    const toggleMsg = () => {
        setMsg(!isMsg);
    }

    const apiLog = () => {
        axios.get('/api/get/access', { params: { phonenum: phone.value, userpwd: pwd.value } }
        )
            .then(res => {
                console.log("over access")
                console.log(res.data);
                const user = res.data;
                if (user.user) {
                    ctx.setPhone(user.user[0].phone);
                    ctx.setName(user.user[0].firstname);
                    ctx.setImg(user.user[0].img);
                    console.log(ctx);
                    axios
                        .get('/api/get/role', { params: { phonenum: phone.value } }
                        )
                        .then(res => {
                            ctx.setRole(res.data.role);
                            axios.post('/api/set/role', { role: res.data.role })
                            props.updatePage(res.data.role.toString())
                            Msg = "Đăng nhập thành công"; toggleMsg();
                        });
                }
                else { Msg = "Sai thông tin tài khoản"; toggleMsg(); }
            });
    };
    const newPwd = () => {
        toggleModal();
        axios
            .post('/api/post/newpwd', { params: { phone: phone.value, pwd: pwd.value, DOB: DOB.value } }//DOB:DOB.value,
            )
            .then(res => {
                const msg = res.data;
                if (msg.msg) { Msg = msg.msg; }
                else { Msg = "Không thể thực hiện thay đổi"; }; toggleMsg();
            });
    };


    if (ctx.role === "Guest") {
        return (
            <Container>
                <Row>
                    <Col md="7">
                        <Row><img src='assets/images/pana.svg' height="595px" width="700px" alt="pana"></img></Row>
                    </Col>
                    <Col md={{ size: 3, offset: 1 }}>
                        <Row style={{ marginTop: '150px' }}>
                            <Col style={{ textAlign: 'center' }}>
                                <h1>Đăng Nhập {isModal}</h1>
                            </Col>
                        </Row>
                        <Row>
                            Số điện thoại
                            <Input name="phone" innerRef={(input) => setPhone(input)} required />
                        </Row>
                        <Row>
                            Mật khẩu
                            <Input name="pwd" innerRef={(input) => setPwd(input)} type="password" required />
                        </Row>
                        <Row>
                            <Button onClick={toggleModal}
                                style={{
                                    backgroundColor: '#F6F8FB',
                                    color: '#007BFF',
                                    border: '0px',
                                    boxShadow: 'none !important',
                                    marginTop: '6px'
                                }}>
                                Quên mật khẩu?
                            </Button>
                        </Row>
                        <Row align="center">
                            <Col md={{ size: 6, offset: 3 }}>
                                <Button onClick={apiLog} color="primary" >Đăng nhập</Button>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '15px' }}>
                            <Col md="12" style={{ textAlign: 'center' }}>
                                <span style={{ fontStyle: 'italic' }}> Chưa có tài khoản? </span> &nbsp;
                                <NavLink to='/signup' style={{ paddingTop: '0px' }} style={{ color: '#007BFF', cursor: 'pointer' }}>
                                    <FaUserPlus style={{ marginTop: '-3px' }} /> Đăng ký
                                </NavLink>
                            </Col>
                        </Row>

                    </Col>
                    <Col />
                </Row>
                <Modal className="LogMsg" style={{ zIndex: 1000 }} isOpen={isMsg} toggle={toggleMsg}>
                    {Msg}
                </Modal>
                <Modal isOpen={isModal} toggle={toggleModal}>
                    <ModalBody className="modal-drug-item">
                        <h1> Quên mật khẩu </h1>
                        Số điện thoại
                        <Input name="phone" innerRef={(input) => setPhone(input)} required />
                        Ngày sinh
                        <Input name="date" type="date" innerRef={(input) => setDOB(input)} required />
                        Mật khẩu mới
                        <Input name="pwd" innerRef={(input) => setPwd(input)} type="password" required />
                        Xác nhận mật khẩu
                        <Input name="repwd" innerRef={(input) => setRePwd(input)} type="password" required />
                        <Button onClick={newPwd} color="primary">Đổi mật khẩu</Button> <Button onClick={toggleModal}>Hủy</Button>

                    </ModalBody>
                </Modal>
            </Container>
            // </HeaderDefine.Provider>
        )
    }
    else {
        // axios.get('/api/set/user', { params: { phone: ctx.phone, role: ctx.role } });
        // var userSession = { phone: ctx.phone, role: ctx.role };
        // console.log(userSession);
        // sessionStorage.clear();
        // sessionStorage.setItem('user', JSON.stringify(userSession));
        // console.log(ctx);
        // axios.get('/api/set/user',{params:{phone:ctx.phone,name:ctx.name,role:ctx.role, img:ctx.img}});
        
        // <Switch>
        //     <Redirect to='/home' />
        // </Switch>
        if (ctx.role === "Patient") {
            return (
                <Switch>
                    <Redirect to='/patient' />
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
