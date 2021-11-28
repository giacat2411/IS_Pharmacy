import React, { Component } from 'react';
import { Input, Row, Col, Button, Modal, Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            fullname: "",
            firstname: "",
            lastname: "",
            dateofbirth: '1997-01-01',
            address: "HCM",
            email: 'phuc@gmail.com',
            pwd: '',
            repwd: '',
            Msg: '',
            isMsg: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.subReg = this.subReg.bind(this);
        this.toggleMsg = this.toggleMsg.bind(this);
    }
    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            [evt.target.name]: value
        });
        console.log(this.state);
    }
    toggleMsg() {
        this.setState({ isMsg: !this.state.isMsg })
    }
    apiReg() {
        axios.post('/api/insert/regist', {
            params: this.state
        })
            .then(res => {
                const msg = res.data;
                if (msg.msg) {
                    this.setState({ Msg: msg.msg })
                }
                else { this.setState({ Msg: "Đăng ký thất bại" }) }
                this.toggleMsg();
            })
    }
    subReg() {
        const str = this.state.fullname;
        this.setState({ lastname: str.split(' ').slice(0, -1).join(' ') })
        this.setState({ firstname: str.split(' ').slice(-1).join(' ') })
        console.log(this.state)
        if (this.state.pwd !== this.state.repwd) {
            alert("Hãy kiểm tra lại mật khẩu!")
        }
        this.apiReg();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ offset: 4, size: 4 }}>
                        <Row>
                            <Col>
                                <h1 style={{ textAlign: 'center' }}> Đăng ký </h1>
                            </Col>
                        </Row>
                        <Row >
                            Họ và tên
                            <Input name="fullname" defaultValue="Võ Hồng Phúc" onChange={this.handleChange} required />
                        </Row>
                        <Row>
                            Ngày sinh
                            <Input name="date" type="date" defaultValue={'1997-01-01'} onChange={this.handleChange} />
                        </Row>
                        <Row>
                            Số điện thoại
                            <Input name="phone" onChange={this.handleChange} required />
                        </Row>
                        <Row>
                            Mật khẩu
                            <Input name="pwd" onChange={this.handleChange} type="password" required />
                        </Row>
                        <Row>
                            Xác nhận mật khẩu
                            <Input name="repwd" onChange={this.handleChange} defaultValue="123456" type="password" required />
                        </Row>
                        <Row>
                            <Col md={{ offset: 4, size: 4 }}>
                                <Button onClick={this.subReg} color="primary" style={{ marginTop: '15px', marginBottom: '15px' }}> Đăng ký</Button>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: '15px'}}>
                            <Col md="12" style={{textAlign: 'center'}}>
                            <span style={{fontStyle: 'italic'}}> Đã có tài khoản? </span> &nbsp;
                            <NavLink to='/login' style={{paddingTop: '0px'}} style={{color: '#007BFF', cursor: 'pointer'}}>
                            <FaSignInAlt /> Đăng nhập
                            </NavLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal className="LogMsg" isOpen={this.state.isMsg} toggle={this.toggleMsg}>
                    {this.state.Msg}
                    <NavLink className="nav-link" to='/login'> <FaSignInAlt /> Đăng nhập </NavLink>
                </Modal>
            </Container>
        )
    };

}
export default SignUp;