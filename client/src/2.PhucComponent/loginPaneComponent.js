import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, FormFeedback, Label } from 'reactstrap';
import { Input, Row, Col, Button, Container } from 'reactstrap';
import { Redirect, Switch } from 'react-router';
import HeaderDefine from '../5.Share Component/Context';
import { NavLink } from 'react-router-dom';
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { InputAdornment } from '@mui/material';
import { InputGroup, InputGroupText } from 'reactstrap'

const LoginPane = (props) => {
    const ctx = useContext(HeaderDefine);

    const [phone, setphone] = useState("");
    const [pwd, setpwd] = useState("");

    const [Phone, setPhone] = useState("");
    const [Pwd, setPwd] = useState("");
    const [repwd, setRePwd] = useState("");
    const [DOB, setDOB] = useState("");

    const [isModal, setModal] = useState(false);
    const [isMsg, setMsg] = useState(false);

    const [Msg, setmsg] = useState("");

    const [show, setShow] = useState(false);

    const toggleModal = () => {
        setModal(!isModal);
    }

    const toggleMsg = () => {
        setMsg(!isMsg);
    }

    const apiLog = () => {
        if (phone.value === "" || pwd.value === "") { setmsg("Không được bỏ trống thông tin"); toggleMsg() }
        else axios.get('/api/get/access', { params: { phonenum: phone.value, userpwd: pwd.value } })
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
                            // axios.post('/api/set/role', { role: res.data.role })
                            props.updatePage(res.data.role.toString())
                        });
                }
                else { setmsg("Sai thông tin tài khoản!"); toggleMsg(); }
            });
    };

    const newPwd = () => {
        toggleModal();
        axios
            .post('/api/post/newpwd', { params: { phone: Phone, pwd: Pwd, DOB: DOB } }//DOB:DOB.value,
            )
            .then(res => {
                const msg = res.data;
                if (msg.msg) { setmsg(msg.msg) }
                else { setmsg("Không thể thực hiện thay đổi") };
                toggleMsg();
            });
    };

    if (ctx.role === "Guest") {
        return (
            <Container>
                <Modal centered isOpen={isMsg} toggle={toggleMsg}>
                    <ModalHeader> Message </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row style={{ textAlign: 'center' }}>
                                <Col>
                                    {Msg}
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
                <Row>
                    <Col md="7">
                        <Row><img src='assets/images/pana.svg' height="595px" width="700px" alt="pana"></img></Row>
                    </Col>
                    <Col md={{size: 3, offset: 1}}>
                        <Form onSubmit={(e) => { e.preventDefault(); apiLog() }}>
                            <Row style={{ marginTop: '150px' }}>
                                <Col style={{ textAlign: 'center' }}>
                                    <h1>Đăng Nhập {isModal}</h1>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label> Số điện thoại </Label>
                                <Input required name="phone" innerRef={(input) => setphone(input)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label> Mật khẩu </Label>
                                <InputGroup>
                                    <Input required name="pwd" innerRef={(input) => setpwd(input)} type={show ? "text" : "password"}>
                                    </Input>
                                    <InputGroupText onClick={() => { setShow(!show) }} style={{cursor: 'pointer'}}>
                                        {show ? <FaEye /> : <FaEyeSlash />}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        <Button onClick={toggleModal}
                                            style={{
                                                backgroundColor: '#F6F8FB',
                                                color: '#007BFF',
                                                border: '0px',
                                                boxShadow: 'none !important',
                                                marginTop: '-10px',
                                                marginBottom: '-10px'
                                            }}>
                                            Quên mật khẩu?
                                        </Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup check>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        <Button style={{marginLeft: '-20px'}} color="primary" >Đăng nhập</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                            <Row style={{ marginTop: '15px' }}>
                                <Col md="12" style={{ textAlign: 'center' }}>
                                    <span style={{ fontStyle: 'italic' }}> Chưa có tài khoản? </span> &nbsp;
                                    <NavLink to='/signup' style={{ paddingTop: '0px' }} style={{ color: '#007BFF', cursor: 'pointer' }}>
                                        <FaUserPlus style={{ marginTop: '-3px' }} /> Đăng ký
                                    </NavLink>
                                </Col>
                            </Row>
                            </FormGroup>
                            {/* </Col> */}
                            {/* <Col /> */}
                        </Form>
                    </Col>
                </Row>
                <Modal isOpen={isModal} toggle={toggleModal} centered>
                    <ModalHeader>Quên mật khẩu</ModalHeader>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        if ((repwd === "") || (Pwd === "") || (Phone === "") || (DOB === "")) {
                            setmsg("Vui lòng không bỏ trống thông tin")
                            toggleMsg()
                        }
                        else if (repwd !== Pwd) {
                            setmsg("Mật khẩu không khớp")
                            toggleMsg()
                        }
                        else {
                            newPwd();
                            setPhone(""); setDOB(""); setPwd(""); setRePwd("");
                            toggleModal();
                        }
                    }}>
                        <ModalBody>
                            <Container>
                                <FormGroup row>
                                    <Label md="5"> Số điện thoại </Label>
                                    <Col md="7">
                                        <Input required name="phone" onChange={(e) => setPhone(e.target.value)} required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md="5"> Ngày sinh </Label>
                                    <Col md="7">
                                        <Input required name="date" type="date" onChange={(e) => setDOB(e.target.value)} required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md="5"> Mật khẩu mới </Label>
                                    <Col md="7">
                                        <Input required name="pwd" onChange={(e) => setPwd(e.target.value)} type="password" required />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md="5"> Nhập lại mật khẩu mới </Label>
                                    <Col md="7">
                                        <Input required name="repwd" onChange={(e) => setRePwd(e.target.value)} type="password" required
                                            valid={(repwd !== "") && (Pwd !== "") && (repwd === Pwd)}
                                            invalid={(repwd !== "") && (Pwd !== "") && (repwd !== Pwd)} />
                                        <FormFeedback valid> Mật khẩu trùng khớp </FormFeedback>
                                        <FormFeedback invalid> Mật khẩu chưa trùng khớp </FormFeedback>
                                    </Col>
                                </FormGroup>
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Container>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        <FormGroup check>
                                            <Button className="center_screen"
                                                style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                                                Đổi mật khẩu
                                            </Button>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <Button onClick={toggleModal} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                                            Hủy
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </ModalFooter>
                    </Form>
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
