import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Input, Row, Col,Button } from 'reactstrap';
import Home from '../1.CatComponent/HomeComponent';
class LoginPane extends Component{
    
    render(){
        const {phone,pwd}=this.props;   
        
        return(
            <div classname="center">
                <Row>
                <Col xs={0.5}>
                <Row><img  src='assets/images/pana.svg' xs={0.8}></img></Row>
                </Col>
                <Col><div>
            <h1>Đăng Nhập</h1>
            Số điện thoại
            <Input name="Phone" text={phone} type="number" required/>

             Mật khẩu
            <Input name="pwd" text={pwd} type="password" required/>
            <Button className="exception">Quên mật khẩu?</Button>
            
            <Row align="center">
            <Button onClick={this.try} color="primary" >Đăng nhập</Button>
            <Route path='/home' component={Home}/>
            </Row>
            <Button className="exception">Chưa có tài khoản? Đăng ký</Button>
            </div>
            </Col>
            <Col/>
            </Row>
            </div>
        )
    };
    
}
export default LoginPane;
