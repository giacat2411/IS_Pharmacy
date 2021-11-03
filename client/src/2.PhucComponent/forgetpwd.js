import React, { Component } from 'react';
import { Container, Input, Row, Col,Button } from 'reactstrap';
import axios from 'axios';
class SignPwd extends Component{
    constructor(props) {
        super(props);
        this.state={
            user:{
                phone: 1294333157,
                firstname:"HongPhuc",
                lastname:"Vo",
                dateofbirth:'', 
                address: "HCM", 
                email:'phuc@gmail.com', 
                pwd:'123456',
            },
            userlist:[],
        }
        this.subReg=this.subReg.bind(this);
    }
    
    
    componentDidMount() {
        axios.get('/api/get/users')
             .then(res => {
                const users = res.data;
                this.setState({ userlist: users.users});
              })
             .catch(error => console.log(error));
    
             
      };

    
    // componentDidMount() {
    //     axios.get('/api/get/username')
    //          .then(res => {
    //             const users = res.data;
    //             this.setState({ userlist:users.users});
    //             console.log(this.state.userlist);
    //           })
    //          .catch(error => console.log(error));
    //   };
      subReg(){
          console.log(this.state.userlist);
    }
    
    render(){
        const {phone,pwd}=this.props;
        return(
            <div classname="center">
                <Row>
                <Col xs={1}/>
                <Col>

                    <h1> Quên mật khẩu </h1>
                    Số điện thoại
                    <Input name="phone" defaultValue={129433315} text={phone} type="number" required/>
                    Ngày sinh
                    <Input name="Date" type="date" required/>
                    Mật khẩu mới
                    <Input name="pwd" text={pwd} type="password" required/>
                    Xác nhận mật khẩu
                    <Input name="pwd" text={pwd} type="password" required/>
                    <Button color="primary">Đổi mật khẩu</Button>
                </Col>
                
                <Col xs={1}/>
                <Col>
                <h1> Đăng ký </h1>
                <form action={this.subReg}>
                Họ và tên
                <Input name="name" defaultValue={"Võ Hồng Phúc"} type="text" required/>
                    Ngày sinh
                    <Input name="date" type="date" required/>
                Số điện thoại
                    <Input name="phone" defaultValue={129433315} type="number" required/>
                    Mật khẩu mới
                    <Input name="pwd" defaultValue={123456} type="password" required/>
                    Xác nhận mật khẩu
                    <Input name="repwd" defaultValue={123456} type="password" required/>
                    
                    <Button type='submit' color="primary">Đăng ký</Button>
                
            <Button onClick={this.subReg}className="exception">Bạn muốn đăng nhập</Button>
            </form>
            </Col>
                <Col xs={1}/>
                </Row>
                </div>
        )
    };
    
}
export default SignPwd;
