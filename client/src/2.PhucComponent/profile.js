import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Input, Row, Col,Button } from 'reactstrap';
import Home from '../1.CatComponent/HomeComponent';
import '../'
class Profile extends Component{
    render(){
        const {
            phone="{0919}",
            addr="123",
            username="Võ Hồng Phúc",
            birth="",
            info = {
                height:"1.23",
                weight:"53",
                blood:"O",
                heart:"80",
                ill:"",
                press:"90",
                before:"",
            },
            date="123456"
        }=this.props;
        return(
            <div >
                <Row>
                <Col xs={1}/>
                <Col>
                <img className="ava" src='../logo.svg'></img>
                {phone}
                {addr}
                <Button color="secondary"> Điều chỉnh thông tin</Button>
                <Route path="editProfile" component={Home}/>
                <Button color="secondary"> Thay đổi mật khẩu</Button>
                <Route path="changePwd" component={Home}/>
                </Col>
                <h1> Người dùng: {username}</h1>
                <Row>Ngày sinh: {birth}</Row>
                <Row>Chiều cao: {info.height}</Row>
                <Row>Cân nặng: {info.weight}</Row>
                <Row>Chỉ số BMI: {info.weight/info.height*info.height}</Row>
                <Row>Nhóm máu: {info.blood} </Row>
                <Row>Nhịp tim: {info.heart} </Row>
                <Row>Huyết áp: {info.press} </Row>
                <Row>Tiền sử: {info.before} </Row>
                <Row>Bệnh lý nền: {info.ill}</Row>

                <Row classname="additional"> *Thông tin từ ngày {date}</Row>
                <Button> Cập nhật tình trạng sức khỏe </Button> 
                <Col> 
                
                <Button color="yellow">Xem bệnh án </Button>
                </Col>
                <Col>
            </Col>
                <Col xs={1}/>
                </Row>
            </div>
        )
    };
    
}
export default Profile;
