import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Container, Input, Row, Col,Button } from 'reactstrap';
import Home from '../1.CatComponent/HomeComponent';
class LoginPane extends Component{
    constructor(props) {
        super(props);
        this.state={
            user:{
                phone: '1294333157',
                firstname:"Guest",
                lastname:"",
                dateofbirth:'01/01/2001', 
                address: "HCM", 
                email:'guest@gmail.com', 
                pwd:'123456',
            }
        }
        this.apiLog=this.apiLog.bind(this);
    };
    subLog(){
        axios.get('api/get/phuc')
    };
    apiLog() {
        axios
          .get('/api/get/login', {
            body: this.state.user,
          })
          .then(res => {
            const users = res.data;
            this.setState({ user: users.users});
         });
         axios.get('api/get/phuc')
      }
    
    // componentDidMount() {
        
    //   };

    
    render(){
        const {phone,pwd}=this.props;   
        
        return(
            <div className="center">
                <Row>
                <Col xs={0.5}>
                <Row><img  src='assets/images/pana.svg' xs={0.8}></img></Row>
                </Col>
                <Col><div>

                <form>
            <h1>Đăng Nhập</h1>
            Số điện thoại
            <Input name="phone" defaultValue="1294333157" placeholder="Số điện thoại" 
                type="number" required onChange={(e)=>this.setState({phone:phone})}/>

             Mật khẩu
            <Input name="pwd" text={pwd} type="password" required/>
            <Button className="exception">Quên mật khẩu?</Button>
            
            <Row align="center">
            <Button onClick={(e)=>this.apiLog()} color="primary" >Đăng nhập</Button>
            </Row>
            </form><Button className="exception">Chưa có tài khoản? Đăng ký</Button>
            
            </div>
            </Col>
            <Col/>
            </Row>
            </div>
        )
    };
    
}
export default LoginPane;
