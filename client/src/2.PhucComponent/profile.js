import React, { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Input, Row, Col, Button, CardHeader, CardBody, CardSubtitle, Container } from 'reactstrap';
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
        img: "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png",
    })
    const grant = user.phone === ctx.phone ? false : true;
    const [role, setRole] = useState("Patient");//
    const [info, setInfo] = useState({
        height: "1.23",
        weight: "53",
        BMI: 12.6,
        blood_type: "O",
        medical_history: "",
        medical_background: "",

    })
    const [msg, setMsg] = useState("");
    const [isMsg, setIsMsg] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            checkData();
        }, 1000);
    }, []);
    const showMsg = (msg) => {
        setMsg(msg);
        setIsMsg(true);

    }
    const checkData = async () => {
        console.log("AKJLD")


        console.log(user.phone)
        console.log(ctx.phone)
        await axios
            .get('api/get/info', { params: { phonenum: user.phone } }
            )
            .then(res => {
                setUser(res.data.user);
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
    const toggleMsg = () => {
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
                    <Row>
                        <Col>
                            Chiều cao: {info.height}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Cân nặng: {info.weight}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Chỉ số BMI: {info.BMI}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Nhóm máu: {info.blood}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Tiền sử: {info.medical_history}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Bệnh lý nền: {info.medical_background}
                        </Col>
                    </Row>
                    <Row classname="additional">
                        <Col>
                            Thông tin từ ngày {date(current)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button disabled={grant} onClick={toggleHealth}
                                style={{ backgroundColor: '#62AFFC', border: '0px', marginTop: '10px' }}>
                                Cập nhật tình trạng sức khỏe </Button>
                        </Col>
                    </Row>
                </Col>
                <Button classname="center_screen"
                    style={{
                        backgroundColor: '#62AFFC',
                        border: '0px',
                        height: '40px',
                        marginTop: '50px'
                    }}>
                    Xem các lượt khám bệnh </Button>
            </Row></>
        )
    }
    const setAllImg = (newUser) => {
        ctx.setImg(newUser.img);
        setUser(newUser);
    }

    const View = () => {
        if (accessright)
            return (
                <Container >
                    <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Col md="4">
                            <Col>
                                <div className="center">
                                    <Row><img className="ava" src={user.img}></img></Row>
                                    <Row>{user.phone}</Row>
                                    <Row>{user.email}</Row>
                                    <Row>{user.address}</Row>
                                    <Row>
                                        <Button disabled={grant} style={{ backgroundColor: '#62AFFC', border: '0px', marginBottom: '15px', marginTop: '10px' }} onClick={toggleEdit}>
                                            Điều chỉnh thông tin
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button disabled={grant} style={{ backgroundColor: '#62AFFC', border: '0px' }} onClick={togglePwd}>
                                            Thay đổi mật khẩu
                                        </Button>
                                    </Row>
                                    <Route path="changePwd" component={Home} />
                                </div>
                            </Col>
                        </Col>
                        <Col md="8">
                            <Row>
                                <Col md="12" style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}> Thông tin cá nhân</Col>
                            </Row>
                            <Col>
                                <Row>
                                    <Col>
                                        Người dùng: {user.lastname + " " + user.firstname}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Ngày sinh: {date(user.dateofbirth)}
                                    </Col>
                                </Row>
                                {accessright() == 1 ?
                                    <Health />
                                    : <NotesApp />}
                            </Col>
                        </Col>
                    </Row>
                    <Modal isOpen={edit} toggle={toggleEdit}><EditInfo info={user} toggleEdit={toggleEdit} msgCall={showMsg} setUser={setAllImg} />
                    </Modal>
                    <Modal isOpen={changePwd} toggle={togglePwd}><UpdatePwd togglePwd={togglePwd} phone={user.phone} msgCall={showMsg} />
                    </Modal>
                    <Modal isOpen={health} toggle={toggleHealth}><EditHealth health={info} phone={user.phone} toggleHealth={toggleHealth} msgCall={showMsg} />
                    </Modal>
                    <Modal isOpen={isMsg} toggle={toggleMsg}  > <Card>{msg}</Card> </Modal>
                </Container>
            )
        else {
            return <> Hồ sơ không tồn tại</>
        }
    }
    return View();
}
export default Profile;
