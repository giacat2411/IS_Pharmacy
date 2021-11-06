import React, { Component } from 'react';
import { Container, Input, Row, Col,Button } from 'reactstrap';
import axios from 'axios';
class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state={
                phone: "",
                fullname:"",
                firstname:"Guest",
                lastname:"",
                dateofbirth:'1997-01-01', 
                address: "HCM", 
                email:'phuc@gmail.com', 
                pwd:'',
                repwd:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.subReg=this.subReg.bind(this);
    }
    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
          [evt.target.name]: value
        });
      }
    
    subReg(){
        const str=this.state.firstname
        const arr=str.split(',');
        this.setState({lastname:arr.pop()})
        this.setState({firstname:arr.shift()})
        if (this.state.pwd!=this.state.repwd){
            alert("Hãy kiểm tra lại mật khẩu!")
        }
        axios.post('/api/post/regist',{
            params:this.state
        })
        .then(res => {
           const users = res.data;
           this.setState({ user: users.users});
        //    console.log(this.state.user);
         })
    }
    
    render(){
        return(
            <div className="center">
                <Row>
                <Col>
                <h1> Đăng ký </h1>
                <form >
                Họ và tên
                <Input name="name" defaultValue={this.state.fullname} onChange={this.handleChange} required/>
                    Ngày sinh
                    <Input name="date" type="date"defaultValue={'1997-01-01'} onChange={this.handleChange}  />
                Số điện thoại
                    <Input name="phone" defaultValue={this.state.phone} onChange={this.handleChange} required/>
                    Mật khẩu
                    <Input name="pwd" defaultValue={this.state.pwd} onChange={this.handleChange}  type="password" required/>
                    Xác nhận mật khẩu
                    <Input name="repwd" defaultValue={this.state.repwd} onChange={this.handleChange} type="password" required/>
                    
                    <Button onClick={this.subReg} type='submit' color="primary">Đăng ký</Button>
                
            <Button className="exception">Bạn muốn đăng nhập</Button>
            </form>
            </Col>
                </Row>
                </div>
        )
    };
    
}
export default SignUp;
