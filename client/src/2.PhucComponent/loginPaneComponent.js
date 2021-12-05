import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Badge } from 'reactstrap';
import { Input, Row, Col, Button, Container } from 'reactstrap';
import { Redirect, Switch } from 'react-router';
import HeaderDefine from '../5.Share Component/Context';
import { NavLink } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

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
                    <Col md={{ size: 3, offset: 1 }}>
                        <Row style={{ marginTop: '150px' }}>
                            <Col style={{ textAlign: 'center' }}>
                                <h1>Đăng Nhập {isModal}</h1>
                            </Col>
                        </Row>
                        <Row>
                            Số điện thoại
                            <Input name="phone" innerRef={(input) => setphone(input)} required />
                        </Row>
                        <Row>
                            Mật khẩu
                            <Input name="pwd" innerRef={(input) => setpwd(input)} type="password" required />
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
                <Modal isOpen={isModal} toggle={toggleModal} centered>
                    <ModalHeader>Quên mật khẩu</ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row style={{ marginBottom: '15px' }}>
                                <Col md="5" style={{ marginTop: '8px' }}> Số điện thoại </Col>
                                <Col md="7">
                                    <Input name="phone" onChange={(e) => setPhone(e.target.value)} required />
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '15px' }}>
                                <Col md="5" style={{ marginTop: '8px' }}> Ngày sinh </Col>
                                <Col md="7">
                                    <Input name="date" type="date" onChange={(e) => setDOB(e.target.value)} required />
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '15px' }}>
                                <Col md="5" style={{ marginTop: '8px' }}> Mật khẩu mới </Col>
                                <Col md="7">
                                    <Input name="pwd" onChange={(e) => setPwd(e.target.value)} type="password" required />
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '15px' }}>
                                <Col md="5" style={{ marginTop: '8px' }}> Nhập lại mật khẩu mới </Col>
                                <Col md="7">
                                    <Input name="repwd" onChange={(e) => setRePwd(e.target.value)} type="password" required />
                                    {((repwd !== "") && (Pwd !== "")) ? ((repwd !== Pwd) ? <Badge color="danger"> Mật khẩu chưa trùng khớp </Badge> : <Badge color="success"> Mật khẩu trùng khớp</Badge>) : <span></span>}
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Container>
                            <Row style={{ textAlign: 'center' }}>
                                <Col>
                                    <Button className="center_screen"
                                        onClick={() => {
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
                                        }}
                                        style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                                        Đổi mật khẩu
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={toggleModal} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                                        Hủy
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </ModalFooter>
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
