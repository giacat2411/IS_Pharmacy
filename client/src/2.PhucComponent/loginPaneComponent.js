import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody } from 'reactstrap';
import { Container, Input, Row, Col,Button } from 'reactstrap';
class LoginPane extends Component{
    constructor(props) {
        super(props);
        this.state={
                phone: '',
                fullname:"",
                firstname:"Guest",
                lastname:"",
                dateofbirth:'1997-01-01', 
                address: "HCM", 
                email:'guest@gmail.com', 
                pwd:'',
                repwd:'',
                isModal:false,
        }
        this.apiLog=this.apiLog.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.newPwd=this.newPwd.bind(this);
    };
    toggleModal() {
        this.setState({
          isModal: !this.state.isModal
        });
    }
    subLog(){
        axios.get('api/get/phuc')
    };
    apiLog() {
        axios
          .get('/api/get/login', {params:this.state}         
          )
          .then(res => {
            const users = res.data;
            this.setState(users.users);
         });
      }
    newPwd(){
        axios
          .get('/api/post/newpwd', {params:this.state}         
          )
          .then(res => {
            const users = res.data;
            this.setState(users.users);
         });
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
                    <Input name="phone" onChange={this.handleChange} required/>
            Mật khẩu
                    <Input name="pwd" onChange={this.handleChange}  type="password" required/>
                    <Button onClick={this.toggleModal} className="exception">Quên mật khẩu?</Button>
            
            <Row align="center">
            <Button onClick={(e)=>this.apiLog()} color="primary" >Đăng nhập</Button>
            </Row>
            </form><Button className="exception">Chưa có tài khoản? Đăng ký</Button>
            
            </div>
            </Col>
            <Col/>
            </Row>
            <Modal isOpen={this.state.isModal} toggle={this.toggleModal}>
                <ModalBody>

                    <h1> Quên mật khẩu </h1>
                     Số điện thoại
                    <Input name="phone" defaultValue={this.state.phone} onChange={this.handleChange} required/>
                    Ngày sinh
                    <Input name="date" type="date" onChange={this.handleChange}  />
                    Mật khẩu mới
                    <Input name="pwd" onChange={this.handleChange}  type="password" required/>
                    Xác nhận mật khẩu
                    <Input name="repwd" onChange={this.handleChange} type="password" required/>
                    <Button onClick={this.newPwd} color="primary">Đổi mật khẩu</Button>

                </ModalBody>
            </Modal>
            </div>
        )
    };
    
}
export default LoginPane;
