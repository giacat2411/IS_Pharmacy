import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Input, Row, Col,Button } from 'reactstrap';
import Home from '../1.CatComponent/HomeComponent';
import '../'
class Profile extends Component{
    render(){
        const current = new Date();
        //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        const {
            phone="0919813172",
            addr="123 KTX khu A",
            username="Võ Hồng Phúc",
            birth="12/04/2003",

            info = {
                height:"1.23",
                weight:"53",
                blood:"O",
                heart:"80",
                ill:"",
                press:"90",
                before:"",
                date:"11/10/2021"
            }
        }=this.props;
        return(
            <div >
                <Row>
                <Col>
                <div className="center">
                <Row><img className="ava" src='assets/images/ava_user.JPG'></img></Row>
                <Row>{phone}</Row>
                <Row>{addr}</Row>
                <Row><Button color="secondary"> Điều chỉnh thông tin</Button></Row>
                {/*<Route path="editProfile" component={Home}/>*/}


                <Row><Button color="secondary"> Thay đổi mật khẩu</Button></Row>
                <Route path="changePwd" component={Home}/>
                </div>
                </Col>
                <Col xs={5} >
                    <Col xs={5}/>
                    <Col>
                <h1> Người dùng: {username}</h1>
                <Row>Ngày sinh: {birth}</Row>
                <Row>Chiều cao: {info.height}</Row>
                <Row>Cân nặng: {info.weight}</Row>
                <Row>Chỉ số BMI: {info.weight/info.height*info.height,1}</Row>
                <Row>Nhóm máu: {info.blood} </Row>
                <Row>Nhịp tim: {info.heart} </Row>
                <Row>Huyết áp: {info.press} </Row>
                <Row>Tiền sử: {info.before} </Row>
                <Row>Bệnh lý nền: {info.ill}</Row>
                </Col>
                <Row classname="additional"> *Thông tin từ ngày {info.date}</Row>
                <Button> Cập nhật tình trạng sức khỏe </Button> 
                </Col>
                <Col> 
                
                <Button classname="center_screen">Xem bệnh án </Button>
                </Col>
                </Row>
            </div>
        )
    };
    
}
export default Profile;
