import React, { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Input, Row, Col, Button, CardHeader, CardBody, CardSubtitle } from 'reactstrap';
import Home from '../1.CatComponent/HomeComponent';
import HeaderDefine from '../1.CatComponent/Context';
import { useContext } from 'react';
import { Card,CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { Modal } from 'reactstrap';
import NotesApp from './note';
const Profile = () => {
    const current = new Date();
    const ctx = useContext(HeaderDefine);
    const [edit, setEdit] = useState(false);
    const [health, setHealth] = useState(false);
    const [changePwd, setChangePwd] = useState(false);
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    var user = {
        phone: ctx.phone,
        firstname: "",
        lastname: "",
        dateofbirth: "",
        address: "",
        email: "",
    }
    var info = {
        height: "1.23",
        weight: "53",
        BMI: 12.6,
        blood_type: "O",
        medical_history: "",
        medical_background: "",
    }
    axios
        .get('/api/get/access', { params: { phonenum: ctx.phone } }
        )
        .then(res => {
            user = res.data.user[0];
        })

    const toggleEdit = () => {
        setEdit(!edit);
    };
    const toggleHealth = () => {
        setHealth(!health);
    };
    const togglePwd = () => {
        setChangePwd(!changePwd);
    };
    const postHealth=()=>{
        axios.post('/api/post/TTSK',{params:{info,phone:ctx.phone}}).then(res=>{
            toggleHealth();
        })
    }
    const updateInfo=()=>{
        axios.post('/api/post/info',{params:user}).then(res=>{
            toggleEdit();
        })
    }
    const updatePwd=()=>{
        axios.post('/api/post/pwd',{param:{phone:user.phone,pwd:user.pwd, newpwd:user.newpwd}}).then(res=>{
            togglePwd();
        })
    }
    const Health = () => {
        if (health) {
            return (
                <Col>
                <Card>
                    <CardTitle>Chiều cao</CardTitle> <Input name="height" ></Input><FaEdit/>
                    </Card>
                <Card>
                    <CardTitle>Cân nặng: </CardTitle><Input name="weight"/></Card>
                <Card>
                    <CardTitle>    Chỉ số BMI: </CardTitle>{info.BMI.toPrecision(2)}</Card>
                <Card>
                    <CardTitle>     Nhóm máu: </CardTitle><Input name="blood_type"/> </Card>
                <Card>
                    <CardTitle>     Tiền sử:</CardTitle> <Input name="medical_history"/> </Card>
                <Card>
                    <CardTitle>     Bệnh lý nền: </CardTitle><Input name="medical_background"/></Card>
                <Button onClick={postHealth}>Xác nhận</Button>
                <NavLink className="nav-link" to='/profile'><Button>Hủy bỏ</Button></NavLink>
                
                </Col>
            )
        }
        else {
            return(<>
                <Row>Chiều cao: {info.height}</Row>
                <Row>Cân nặng: {info.weight}</Row>
                <Row>Chỉ số BMI: {info.BMI.toPrecision(2)}</Row>
                <Row>Nhóm máu: {info.blood} </Row>
                <Row>Tiền sử: {info.medical_history} </Row>
                <Row>Bệnh lý nền: {info.medical_background}</Row>
                    <Row classname="additional"> *Thông tin từ ngày {date}</Row>
                    <Button onClick={toggleHealth}> Cập nhật tình trạng sức khỏe </Button></>)
        }
    }
    const editModal=(
        <Card>
            <CardHeader>Điều chỉnh thông tin</CardHeader>
            <CardBody>
            <CardTitle>Họ và tên</CardTitle> <Input name="name" ></Input><FaEdit/>
                    
            <CardTitle>Số điện thoại </CardTitle> <Input name="phone" ></Input>

            <CardTitle>Ngày sinh </CardTitle> <Input name="dateofbirth" ></Input>
            <CardTitle>Địa chỉ </CardTitle> <Input name="address" ></Input>
            </CardBody>
            <CardSubtitle><Button onClick={updateInfo}>Xác nhận</Button> 
               <Button onClick={toggleEdit}>Hủy bỏ</Button></CardSubtitle>
        </Card>
    )
    const Pwd=(
        <Card>
            <CardHeader>Thay đổi mật khẩu</CardHeader>
            <CardBody>
            <CardTitle>Mật khẩu cũ</CardTitle> <Input name="pwd" type="password" ></Input><FaEdit/>
                    
            <CardTitle>Mật khẩu mới</CardTitle> <Input name="newpwd" type="password" ></Input>

            <CardTitle>Nhập lại mật khẩu </CardTitle> <Input name="repwd" type="password" ></Input>
            </CardBody>
            <CardSubtitle><Button onClick={updatePwd}>Xác nhận</Button> 
                <Button onClick={togglePwd}>Hủy bỏ</Button></CardSubtitle>
        </Card>
    )
    if(ctx.role==="Patient")
    return (
        <div >
            <Row>
                <Col>
                    <div className="center">
                        <Row><img className="ava" src='assets/images/ava_user.JPG'></img></Row>
                        <Row>{user.phone}</Row>
                        <Row>{user.email}</Row>
                        <Row>{user.address}</Row>
                        <Row><Button color="secondary" onClick={toggleEdit}> Điều chỉnh thông tin</Button></Row>
                        <Row><Button color="secondary" onClick={togglePwd}> Thay đổi mật khẩu</Button></Row>
                        <Route path="changePwd" component={Home} />
                    </div>
                </Col>
                <Col xs={5} >
                    <Col xs={5} />
                    <Col>
                        <h1> Người dùng: {user.firstname + " " + user.lastname}</h1>

                        <Row>Ngày sinh: {user.dateofbirth} </Row>
                        <Health />
                    </Col>
                </Col>
                <Col>

                    <Button classname="center_screen">Xem các lượt khám bệnh </Button>
                </Col>
            </Row>
            <Modal isOpen={edit} toggle={toggleEdit}>
                {editModal}
            </Modal>
            <Modal isOpen={changePwd} toggle={togglePwd}>
                {Pwd}
            </Modal>
        </div>
    )

     else return       <NotesApp/>
}
export default Profile;
