import React, { Component } from 'react';
import { Container, Row, Col, Modal, Table, ModalBody, Badge, Spinner } from 'reactstrap';
import axios from 'axios';
import ToastServive from 'react-material-toast';

import { Link } from 'react-router-dom';
import { Input, Button } from 'reactstrap';
import HeaderDefine from '../5.Share Component/Context';

const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});


class ViewMedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: this.props.phone,// this.props.phone,
            treatment_turn: [{}],
            system_user: {},
            treatment_curr: {},
            is_open: false,
            orderDetailsOpen: []
            // treatment_turns:[],
            // system_users:[],
        }
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    async toggleOpen(treatment, flag) {
        let res = []
        console.log(treatment);

        if (flag) {
            this.setState({ treatment_curr: treatment })
            if (treatment.prescribe_id !== null) {
                res = await axios.get('/api/get/order_details', { params: { orderID: treatment.prescribe_id } })
                this.setState({ orderDetailsOpen: res.data.order_details })
            }
        }
        this.setState({ is_open: !this.state.is_open })
    }

    componentDidMount() {
        axios.get('/api/get/mytreatment', { params: { phone: this.state.phone } }).then(
            res => { this.setState({ treatment_turn: res.data }); console.log(this.state.treatment_turn) }
        )
            .catch(error => console.log(error));

        // await  axios.get('/api/get/treatment_turns')
        // .then(res => {
        // const treatment_turns = res.data;
        // this.setState({ treatment_turns: treatment_turns.treatment_turns});
        // })
        // .catch(error => console.log(error));


        axios.get('/api/get/info', { params: { phonenum: this.state.phone } }).then(res => this.setState({ system_user: res.data.user }))
            .catch(error => console.log(error));

        // axios.get('/api/get/system_users')
        // .then(res => {
        // const system_users = res.data;
        // this.setState({ system_users: system_users.system_users});

        // let new_Treatment_turn=this.state.treatment_turns.filter(x=> x.patient_phone==this.state.phone);

        // const new_System_user=this.state.system_users.filter(x=> x.phone == this.state.phone);
        // this.setState({ treatment_turn: new_Treatment_turn, system_user:new_System_user });
        // })
        // .catch(error => console.log(error));
    };



    render() {
        const treatment_turn = this.state.treatment_turn.map((x) => {
            if ((+(new Date(x.start_time))) < (+(new Date()))) {
                const date = new Date(x.turn_time)
                console.log(date.getMinutes())
                return (
                    <tr>
                        <th scope="row">
                            {this.state.treatment_turn.indexOf(x) + 1}
                        </th>
                        <td>
                            {x.id}
                        </td>
                        <td>
                            {date.getHours() + ":" +
                                (() => date.getMinutes() === 0 ? "00" : date.getMinutes())()
                                + " " + date.getDate() + "/" + (parseInt(date.getMonth()) + 1).toString()
                                + "/" + date.getFullYear()}
                        </td>
                        <td>
                            {x.fullname}
                        </td>
                        <td>
                            {x.doctor_phone}
                        </td>
                        <td>
                            {/* <Link to={`/view_medical_detail/${x.id}`}> */}
                            <Button style={{
                                backgroundColor: '#62AFFC',
                                marginTop: '-4px',
                                border: '0px',
                                color: 'white',
                                borderRadius: '10px',
                                height: '30px',
                                paddingTop: '2px'
                            }} disabled={this.context.phone !== x.patient_phone}
                                onClick={() => this.toggleOpen(x, true)}>
                                Xem
                            </Button>
                            {/* </Link> */}
                        </td>
                    </tr>
                )
            }
        }
        )
        return (
            <Container id='dung-benhan'>
                <Row style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>
                    <Col class='dung-title'>
                        <h1>Các lượt điều trị</h1>
                        <hr />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '98px', marginTop: '91px' }}>
                    <Col>
                        <Table hover >
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Ngày khám
                                    </th>
                                    <th>
                                        Bác sĩ phụ trách
                                    </th>
                                    <th>
                                        Số điện thoại
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {treatment_turn}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Modal isOpen={this.state.is_open} toggle={this.toggleOpen} fullscreen>
                    <ModalBody style={{ overflowY: 'auto' }}>
                        <Container>
                            <Row>
                                <Col md="11">
                                    <img src="/assets/images/Logo.png" alt="Logo" width="50px" height="50px"></img>
                                </Col>
                                <Col md="1" style={{ float: 'right' }}>
                                    <Button style={{
                                        backgroundColor: '#62AFFC',
                                        border: '0px',
                                        height: '30px',
                                        marginTop: '10px',
                                        width: '30px',
                                        padding: '0'
                                    }}
                                        onClick={() => this.toggleOpen("", false)}> X </Button>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center' }}>
                                <Col>
                                    <span style={{ fontSize: '25px', fontWeight: 'bold' }}>
                                        Thông tin lượt điều trị
                                    </span>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}>
                                        Mã điều trị:&nbsp;
                                    </span>
                                    {this.state.treatment_curr.id}</Col>
                            </Row>

                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> Bác sĩ khám bệnh: </span> {this.state.treatment_curr.fullname}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>

                                <Col >
                                    <span style={{ fontWeight: 'bold' }}> Bệnh nhân: </span> {this.state.system_user.lastname + " " + this.state.system_user.firstname}
                                </Col>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> Ngày sinh: </span> {this.state.system_user.dateofbirth}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> Lịch hẹn: </span> {this.state.treatment_curr.turn_time}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}>Vấn đề sức khỏe: </span> {this.state.treatment_curr.health_issue}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> Huyết áp: </span> {this.state.treatment_curr.blood_pressure}
                                </Col>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> Nhịp tim: </span> {this.state.treatment_curr.heart_beat}

                                    {/* <Input defaultValue={this.state.treatment_curr.diagnose} onChange={(e) => { this.state.treatment_curr.diagnose = e.target.value }} placeholder="Chẩn đoán" />
                                <Input defaultValue={this.state.treatment_curr.therapy} onChange={(e) => { this.state.treatment_curr.therapy = e.target.value }} placeholder="Điều trị" /> */}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> Phương pháp điều trị: </span>{this.state.treatment_curr.therapy}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> Thời điểm bắt đầu: </span>{this.state.treatment_curr.start_time}
                                </Col>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}>Thời điểm kết thúc: </span>{this.state.treatment_curr.end_time}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col md="12" style={{ textAlign: 'center' }}>
                                    {(() => {
                                        if (this.state.treatment_curr.prescribe_id === null)
                                            return <Badge color="primary" style={{ fontSize: '15px' }}> Không có đơn thuốc kèm theo </Badge>
                                        else {
                                            const details = this.state.orderDetailsOpen.map(detail => {
                                                return (
                                                    <tr>
                                                        <th scope="row" style={{ textAlign: 'center' }}>
                                                            {this.state.orderDetailsOpen.indexOf(detail) + 1}
                                                        </th>
                                                        <td>
                                                            {detail.drug_name}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {detail.unit}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {(detail.price).toLocaleString('vi-VN')}đ
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {detail.quantity}
                                                        </td>
                                                        <td style={{ textAlign: 'right' }}>
                                                            {(detail.price * detail.quantity).toLocaleString('vi-VN')}đ
                                                        </td>
                                                    </tr>
                                                );
                                            });
                                            return <><Badge color="primary" style={{ fontSize: '15px', marginBottom: '20px' }}> Đơn thuốc kèm theo </Badge> 
                                            <Table responsive hover striped bordered>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            #
                                                        </th>
                                                        <th>
                                                            Tên thuốc
                                                        </th>
                                                        <th style={{ textAlign: 'center' }}>
                                                            Đơn vị tính
                                                        </th>
                                                        <th style={{ textAlign: 'center' }}>
                                                            Đơn giá
                                                        </th>
                                                        <th style={{ textAlign: 'center' }}>
                                                            Số lượng
                                                        </th>
                                                        <th style={{ textAlign: 'right' }}>
                                                            Thành tiền
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(() => { if (this.state.orderDetailsOpen.length === 0) return <Spinner className="detail-spinner"> Loading... </Spinner> })()}
                                                    {details}
                                                </tbody>
                                            </Table></>
                                        }
                                    })()}
                                </Col>
                            </Row>
                            {/* <Link to={`/prescribe-med/${JSON.stringify(this.state.treatment_curr.prescribe_id)}/${JSON.stringify(this.state.system_user.phone)}`}>
                                    <Button className='order-button' >
                                        Đơn thuốc đã kê: {this.state.treatment_curr.prescribe_id}
                                    </Button>
                                </Link> */}

                        </Container>
                    </ModalBody>
                    {/* <Button >Thêm đơn thuốc</Button>
                    <Button onClick={(e) => {
                        if (this.state.treatment_curr.end_time === "") this.state.treatment_curr.end_time = new Date();
                        //submit gọi
                        this.toggleEdit();
                    }}           >Xác nhận </Button> */}

                </Modal>
            </Container>
        )
    }
}
ViewMedicalRecord.contextType = HeaderDefine;
export default ViewMedicalRecord;
