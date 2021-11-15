import React, { Component } from 'react';
import { Container, Input, Row, Col,Button, Modal } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';
class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state={
                phone: "",
                fullname:"",
                firstname:"",
                lastname:"",
                dateofbirth:'1997-01-01', 
                address: "HCM", 
                email:'phuc@gmail.com', 
                pwd:'',
                repwd:'',
                Msg:'',
                isMsg:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.subReg=this.subReg.bind(this);
        this.toggleMsg=this.toggleMsg.bind(this);
    }
    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
          [evt.target.name]: value
        });
        console.log(this.state);
      }
    toggleMsg(){
        this.setState({isMsg:!this.state.isMsg})
    }
    apiReg(){
        axios.post('/api/insert/regist',{
            params:this.state
        })
        .then(res => {
           const msg = res.data;
           if (msg.msg){
               this.setState({Msg:msg.msg})
           }
           else{ this.setState({Msg:"Đăng ký thất bại"})}
           this.toggleMsg();
         })
    }
    subReg(){
        const str=this.state.fullname;
        this.setState({lastname:str.split(' ').slice(0, -1).join(' ')})
        this.setState({firstname:str.split(' ').slice(-1).join(' ')})
        console.log(this.state)
        if (this.state.pwd!=this.state.repwd){
            alert("Hãy kiểm tra lại mật khẩu!")
        }
        this.apiReg();
    }
    
    render(){
        return(
            <div className="center">
                <Row>
                <Col>
                <h1> Đăng ký </h1>
                <form >
                Họ và tên
                <Input name="fullname" defaultValue="Võ Hồng Phúc" onChange={this.handleChange} required/>
                    Ngày sinh
                    <Input name="date" type="date"defaultValue={'1997-01-01'} onChange={this.handleChange}  />
                Số điện thoại
                    <Input name="phone" onChange={this.handleChange} required/>
                    Mật khẩu
                    <Input name="pwd" onChange={this.handleChange}  type="password" required/>
                    Xác nhận mật khẩu
                    <Input name="repwd" onChange={this.handleChange} defaultValue="123456" type="password" required/>
                    
                    <Button onClick={this.subReg}  color="primary"> Đăng ký</Button>
                    <NavLink className="nav-link" to='/login'> <FaSignInAlt /> Đăng nhập </NavLink>
            </form>
            </Col>
                </Row>
                <Modal className="LogMsg" isOpen={this.state.isMsg} toggle={this.toggleMsg}>
                    {this.state.Msg}
                    <NavLink className="nav-link" to='/login'> <FaSignInAlt /> Đăng nhập </NavLink>
                </Modal>
                </div>
        )
    };
    
}
export default SignUp;
