import React, { useState } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Row, Col, Button, Container, ModalHeader, ModalBody } from 'reactstrap';
import Home from '../5.Share Component/Main UI/HomeComponent';
import HeaderDefine from '../5.Share Component/Context';
import { useContext } from 'react';
import axios from 'axios';
import { Modal } from 'reactstrap';
import NotesApp from './note';
import { useEffect } from 'react';
import UpdatePwd from './updatePwd';
import EditHealth from './editHealth';
import EditInfo from './Editinfo';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {Switch, Redirect} from 'react-router-dom';

const Profile = (props) => {
    const current = new Date();
    const ctx = useContext(HeaderDefine);
    const [edit, setEdit] = useState(false);
    const [health, setHealth] = useState(false);
    const [changePwd, setChangePwd] = useState(false);
    const date = (curr) => { return `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`; }
    const [user, setUser] = useState({
        phone: props.phone,
        fullname: "",
        firstname: "",
        lastname: "",
        dateofbirth: "",
        address: "",
        email: "",
        img: "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png",
    })

    useEffect(async () => {
        {
            const res1 = await axios.get('/api/get/info', { params: { phonenum: props.phone } })
            setUser(res1.data.user);

            console.log(user)

            const res = await axios.get('/api/get/role', { params: { phonenum: props.phone } })
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
                const res = await axios.get('/api/get/patientInfo', { params: { phone: props.phone } })
                const health = res.data;
                if (health) {
                    setInfo(health[0]);
                }
                console.log(info)
            }
        }
        // fetchData();
    }, [props.phone]);

    console.log(ctx)
    console.log(user)
    const grant = user === undefined ? false : user.phone === ctx.phone ? false : true;
    const [role, setRole] = useState("Patient");
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
    // useEffect(() => {
    //     setTimeout(() => {
    //         checkData();
    //     }, 1000);
    // }, []);
    const showMsg = (msg) => {
        setMsg(msg);
        setIsMsg(true);

    }
    // (async () => {
    //     console.log("AKJLD")


    //     console.log(user.phone)
    //     console.log(ctx.phone)

    // })()
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
        if (ctx.role === "Guest") return -1;
        if (role === "Patient") return 1;
        if (user.phone === ctx.phone) return 2;
        return 0;
    }

    const Health = () => {
        return (<>
            <Row>
                <Col md="6">
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

                <Col md="6">
                    <Row>
                        <Col>
                            <NavLink to='/view_order'>
                                <Button classname="center_screen" disabled={grant}
                                    style={{
                                        backgroundColor: '#62AFFC',
                                        border: '0px',
                                        height: '40px',
                                        marginTop: '50px',
                                        width: '140px'
                                    }}>
                                    Xem đơn thuốc </Button>
                            </NavLink>
                        </Col>
                        <Col>
                            <Link to={`/medical_record/${JSON.stringify(user.phone)}`}>
                                <Button
                                    onClick={(e) => { localStorage.setItem("med_phone", user.phone); console.log("set") }}
                                    style={{
                                        backgroundColor: '#62AFFC',
                                        border: '0px',
                                        height: '40px',
                                        marginTop: '50px',
                                        width: '140px'
                                    }}>
                                    Lượt điều trị
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row></>
        )
    }
    const setAllImg = (newUser) => {
        ctx.setImg(newUser.img);
        setUser(newUser);
    }

    const View = () => {
        if (ctx.role !== "Patient" && ctx.role !== "Doctor" && ctx.role !== "Nurse") return <Switch> <Redirect to='/home' /> </Switch>
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
                                        Ngày sinh: {(new Date(user.dateofbirth)).toLocaleDateString('vi')}
                                    </Col>
                                </Row>
                                {accessright() == 1 ?
                                    <Health />
                                    : <> <Row style={{ textAlign: 'center' }}> <Col>
                                        <LinkContainer to={`/view_treatment/${JSON.stringify(ctx.phone)}`} style={{ backgroundColor: '#62AFFC', border: '0px', marginBottom: '15px', marginTop: '10px' }}>
                                            <Button disabled={grant} onClick={toggleEdit}>
                                                Xem lượt điều trị
                                            </Button>
                                        </LinkContainer> </Col> </Row> <NotesApp /> </>}
                            </Col>
                        </Col>
                    </Row>
                    <Modal centered isOpen={edit} toggle={toggleEdit}><EditInfo info={user} toggleEdit={toggleEdit} msgCall={showMsg} setUser={setAllImg} />
                    </Modal>
                    <Modal centered isOpen={changePwd} toggle={togglePwd}><UpdatePwd togglePwd={togglePwd} phone={user.phone} msgCall={showMsg} />
                    </Modal>
                    <Modal centered isOpen={health} toggle={toggleHealth}><EditHealth health={info} phone={user.phone} toggleHealth={toggleHealth} msgCall={showMsg} />
                    </Modal>
                    <Modal centered isOpen={isMsg} toggle={toggleMsg}>
                        <ModalHeader> Message </ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        {msg}
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>
                </Container>
            )
        else {
            return <> Hồ sơ không tồn tại</>
        }
    }
    return View();
}
export default Profile;
