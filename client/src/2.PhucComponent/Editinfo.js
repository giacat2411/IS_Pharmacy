import React, { useState } from 'react';
import { Input, Row, Col, Button, Container, ModalFooter } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import storage from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'


const EditInfo = (props) => {
    const [file, setFile] = useState();
    const updateInfo = async () => {
        await subReg();
        if (file) {
            var snapshot = await uploadBytesResumable(ref(storage, `/images/${temp.phone}`), file);
            getDownloadURL(snapshot.ref).then(url => {
                var newValue = temp;
                newValue.img = url;
                setTemp(newValue);

                console.log(temp)
                axios.post('https://mysql-healthcare.herokuapp.com/api/post/info', {
                    params: {
                        // dateofbirth:Date(temp.dateofbirth),
                        firstname: temp.firstname,
                        lastname: temp.lastname,
                        address: temp.address,
                        email: temp.email,
                        phone: temp.phone,
                        img: url
                    }
                }).then(res => {
                    props.toggleEdit();
                    if (res.data.msg) props.msgCall(res.data.msg);
                    props.setUser(temp);
                    axios.get('https://mysql-healthcare.herokuapp.com/api/set/user', { params: temp });
                })
            })
        }
        else {
            axios.post('https://mysql-healthcare.herokuapp.com/api/post/info', { params: temp }).then(res => {
                props.toggleEdit();
                if (res.data.msg) props.msgCall(res.data.msg);
                props.setUser(temp);
                axios.get('https://mysql-healthcare.herokuapp.com/api/set/user', { params: temp });
            })
        }
    }
    const [temp, setTemp] = useState(props.info);
    const handleChange = (evt) => {
        const value = evt.target.value;
        var newValue = temp;
        newValue[evt.target.name] = value;
        setTemp(newValue);
    }

    const [is_open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!is_open)
    }

    const subReg = () => {
        const str = temp.fullname;
        var lname = str.split(' ').slice(0, -1).join(' ');
        var fname = str.split(' ').slice(-1).join(' ');
        var newTemp = temp;
        newTemp.lastname = lname;
        newTemp.firstname = fname;
        setTemp(newTemp);
    };
    const handleFile = (event) => {
        setFile(event.target.files[0]);
    }
    return <>
        <ModalHeader>??i???u ch???nh th??ng tin</ModalHeader>
        <ModalBody>
            <Container>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}> H??? v?? t??n</Col>
                    <Col md="9">
                        <Input name="fullname" onChange={handleChange} defaultValue={temp.lastname + " " + temp.firstname}> </Input> </Col>
                </Row>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}>Email </Col>
                    <Col md="9">
                        <Input name="email" onChange={handleChange} defaultValue={temp.email} ></Input>
                    </Col>
                </Row>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}>Ng??y sinh </Col>
                    <Col md="9">
                        <Input name="dateofbirth" type="date" onChange={handleChange} defaultValue={(new Date(temp.dateofbirth)).toLocaleDateString('vi').split("/").reverse().join('-')}></Input>
                    </Col>
                </Row>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}>?????a ch??? </Col>
                    <Col md="9">
                        <Input name="address" onChange={handleChange} defaultValue={temp.address}></Input>
                    </Col>
                </Row>
                <Row style={{marginBottom: '15px'}}>
                    <Col md="3" style={{marginTop: '8px'}}>???nh ?????i di???n </Col>
                    <Col md="9">
                        <Input name="img" type="file" onChange={handleFile}></Input>
                    </Col>

                </Row>
            </Container>
        </ModalBody>
        <ModalFooter>
            <Container>
                <Row style={{ textAlign: 'center' }}>
                    <Col>
                        <Button className="center_screen" onClick={handleOpen} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                            X??c nh???n
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={props.toggleEdit} style={{ backgroundColor: '#62AFFC', marginTop: '10px', border: '0px' }}>
                            H???y b???
                        </Button>
                    </Col>
                </Row>
            </Container>
        </ModalFooter>
        <Modal isOpen={is_open} toggle={handleOpen} centered>
            <ModalHeader> B???n c?? ch???c ch???n v???i l???a ch???n c???a m??nh ? </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <Button onClick={() => { updateInfo(); handleOpen(); props.toggleEdit() }}
                                style={{
                                    backgroundColor: '#62AFFC',
                                    border: '0px'
                                }}>
                                C??
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => { handleOpen(); props.toggleEdit() }}
                                style={{
                                    backgroundColor: '#62AFFC',
                                    border: '0px'
                                }}>
                                Kh??ng </Button>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>
    </>
}
export default EditInfo;
