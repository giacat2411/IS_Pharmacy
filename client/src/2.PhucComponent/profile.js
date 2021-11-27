import React, { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Input, Row, Col, Button, CardHeader, CardBody, CardSubtitle } from 'reactstrap';
import Home from '../5.Share Component/Main UI/HomeComponent';
import HeaderDefine from '../5.Share Component/Context';
import { useContext } from 'react';
import { Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { Modal } from 'reactstrap';
import NotesApp from './note';
import { useEffect } from 'react';
import UpdatePwd from './updatePwd';
import EditHealth from './editHealth';
import EditInfo from './Editinfo';
const Profile = (props) => {
    const current = new Date();
    const ctx = useContext(HeaderDefine);
    const [edit, setEdit] = useState(false);
    const [health, setHealth] = useState(false);
    const [changePwd, setChangePwd] = useState(false);
    const date = (curr) => { return `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`; }
    const [user, setUser] = useState({
        phone: (props.phone) ? props.phone : ctx.phone,
        firstname: "",
        lastname: "",
        dateofbirth: "",
        address: "",
        email: "",
    })
    const [role, setRole] = useState("Patient");//
    const [info, setInfo] = useState({
        height: "1.23",
        weight: "53",
        BMI: 12.6,
        blood_type: "O",
        medical_history: "",
        medical_background: "",

    })
    const [msg,setMsg]=useState("");
const [isMsg,setIsMsg]=useState(false);
    useEffect(() => {
        setTimeout(() => {
            checkData();
        }, 1000);
    }, []);
    const showMsg=(msg)=>{
setMsg(msg);
setIsMsg(true);

    }
    const checkData = async () => {
        await axios
            .get('api/get/info', { params: { phonenum: user.phone } }
            )
            .then(res => {
                // console.log(res.data.user[0]);
                setUser(res.data.user[0]);
                axios.get('/api/get/role', { params: { phonenum: user.phone } }
                )
                    .then(res => {
                        const roleData = res.data.role;
                        if (roleData !== "Patient") {
                            if (user.phone != ctx.phone) {
                                setRole("Guest")
                            }
                            else setRole(roleData);
                        }
                        else {
                            setRole("Patient");
                            console.log(role)
                            axios.get('/api/get/patientInfo', { params: { phone: user.phone } }).then(
                                res => {
                                    const health = res.data;
                                    if (health) {
                                        setInfo(health[0]);
                                    }
                                    console.log(info)
                                }
                            )
                        }
                    });
            })
    }
    const toggleMsg=()=>{
        setIsMsg(!isMsg);
    }
    const toggleEdit = () => {
        setEdit(!edit);
    };
    const toggleHealth = () => {
        setHealth(!health);
    };
    const togglePwd = () => {
        setChangePwd(!changePwd);
    };
    const accessright = () => {
        if (role === "Patient") return 1;
        if (user.phone === ctx.phone) return 2;
        return 0;
    }
    const Health = () => {
            return (<>
                <Row>
                    <Col>
                        <Row>Chiều cao: {info.height}</Row>
                        <Row>Cân nặng: {info.weight}</Row>
                        <Row>Chỉ số BMI: {info.BMI}</Row>
                        <Row>Nhóm máu: {info.blood} </Row>
                        <Row>Tiền sử: {info.medical_history} </Row>
                        <Row>Bệnh lý nền: {info.medical_background}</Row>
                        <Row classname="additional"> *Thông tin từ ngày {date(current)}</Row>
                        <Button onClick={toggleHealth}> Cập nhật tình trạng sức khỏe </Button>
                    </Col>
                    <Button classname="center_screen">Xem các lượt khám bệnh </Button>
                </Row></>
            )
    }
    const View = () => {
        if (accessright)
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
                        <Col>
                            <h1> Người dùng: {user.lastname + " " + user.firstname}</h1>
                            <Row>Ngày sinh: {date(user.dateofbirth)} </Row>
                            {accessright() == 1 ?
                                <Health />
                                : <NotesApp />}
                        </Col>
                    </Row>
                    <Modal isOpen={edit} toggle={toggleEdit}><EditInfo info={user} toggleEdit={toggleEdit}msgCall={showMsg}/>
                    </Modal>
                    <Modal isOpen={changePwd} toggle={togglePwd}><UpdatePwd togglePwd={togglePwd} phone={user.phone}msgCall={showMsg}/>
                    </Modal><Modal isOpen={health} toggle={toggleHealth}><EditHealth health={info} phone={user.phone} toggleHealth={toggleHealth} msgCall={showMsg}/>
                    </Modal>
                    <Modal  isOpen={isMsg} toggle={toggleMsg}  > <Card>{msg}</Card> </Modal>
                </div>
            )
        else {
            return <> Hồ sơ không tồn tại</>
        }
    }
    return View();
}
export default Profile;
