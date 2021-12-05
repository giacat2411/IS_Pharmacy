import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Row, Col, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, Badge } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import HeaderDefine from '../5.Share Component/Context';

const UpdatePwd = (props) => {
    const ctx = useContext(HeaderDefine);
    console.log(ctx);

    const [pwd, setpwd] = useState("");

    const [newpwd, setNewpwd] = useState("");

    const [repwd, setRepwd] = useState("");
    const changePwd = () => {
        axios.post('/api/post/pwd', { params: { phone: props.phone, pwd: pwd, newpwd: newpwd } }).then(res => {
            props.togglePwd();
            if (res.data.msg) props.msgCall(res.data.msg);
        })
    }

    const [is_open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!is_open)
    }

    return <>
        <ModalHeader>Thay đổi mật khẩu</ModalHeader>
        <ModalBody>
            <Container>
                <Row style={{ marginBottom: '15px' }}>
                    <Col md="4" style={{ marginTop: '8px' }}> Mật khẩu cũ</Col>
                    <Col md="8">
                        <Input name="pwd" type="password" onChange={(e) => setpwd(e.target.value)} ></Input>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                    <Col md="4" style={{ marginTop: '8px' }}>Mật khẩu mới </Col>
                    <Col md="8">
                        <Input name="newpwd" type="password" onChange={(e) => setNewpwd(e.target.value)}></Input>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '15px' }}>
                    <Col md="4" style={{ marginTop: '8px' }}>Nhập lại mật khẩu </Col>
                    <Col md="8">
                        <Input name="repwd" type="password" onChange={(e) => setRepwd(e.target.value)}></Input>
                        {((repwd !== "") && (newpwd !== "")) ? ((repwd !== newpwd) ? <Badge color="danger"> Mật khẩu chưa trùng khớp </Badge> : <Badge color="success"> Mật khẩu trùng khớp</Badge>): <span></span>}
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
                                    if (pwd === "" || newpwd === "" || repwd === "") props.msgCall("Vui lòng điền đủ thông tin!");
                                    else if (newpwd !== repwd) props.msgCall("Nhập lại mật khẩu không khớp!")
                                    else handleOpen()}} 
                                style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                            Xác nhận
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={props.togglePwd} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                            Hủy bỏ
                        </Button>
                    </Col>
                </Row>
            </Container>
        </ModalFooter>
        <Modal isOpen={is_open} toggle={handleOpen} centered>
            <ModalHeader> Bạn có chắc chắn với lựa chọn của mình ? </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <Button onClick={() => {changePwd(); handleOpen(); props.togglePwd() }}
                                style={{
                                    backgroundColor: '#62AFFC',
                                    border: '0px'
                                }}>
                                Có
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => { handleOpen(); props.togglePwd() }}
                                style={{
                                    backgroundColor: '#62AFFC',
                                    border: '0px'
                                }}>
                                Không </Button>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>
        {/* <Row>
            <Col>
                <Button className="center_screen" onClick={(e) => changePwd()} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                    Xác nhận
                </Button>
            </Col>
            <Col>
                <NavLink className="nav-link" to={`/profile/${JSON.stringify(ctx.phone)}`} onClick={props.togglePwd} style={{ marginTop: '-8px' }}>
                    <Button style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                        Hủy bỏ
                    </Button>
                </NavLink>
            </Col>
        </Row> */}

    </>





}
export default UpdatePwd;