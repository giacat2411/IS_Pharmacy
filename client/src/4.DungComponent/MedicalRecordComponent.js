import React, { Component } from 'react';
import { Container, Row, Col, Modal, Table, ModalBody, Badge, Spinner, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import axios from 'axios';
import ToastServive from 'react-material-toast';
import { Switch, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Input, Button, Form, Label } from 'reactstrap';
import HeaderDefine from '../5.Share Component/Context';
import { LinkContainer } from 'react-router-bootstrap';
import DoctorSideBar from '../5.Share Component/SideBar/DoctorSideBarComponent';

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
            orderDetailsOpen: [],
            is_edit: false,
            payment_detail: []
            // treatment_turns:[],
            // system_users:[],
        }
        this.toggleOpen = this.toggleOpen.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSubmitPayment = this.onSubmitPayment.bind(this);
    }

    onSubmitPayment() {
        let total = 0;
        this.state.orderDetailsOpen.map(detail => total += detail.quantity * detail.price)
        axios.post('https://mysql-healthcare.herokuapp.com/api/insert/momo_payment', { medicine_id: this.state.treatment_curr.prescribe_id })
        axios.post('https://mysql-healthcare.herokuapp.com/payment_momo', { total: total.toString() })
            .then(res => {
                window.location.href = res.data.payUrl
            });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const treatment = {
            treatment_id: this.state.treatment_curr.id,
            blood_pressure: this.blood_pressure.value,
            heart_beat: this.heart_beat.value,
            diagnose: this.diagnose.value,
            therapy: this.therapy.value
        }
        const idx = this.state.treatment_turn.indexOf(this.state.treatment_curr);
        const new_treat = {
            ...this.state.treatment_curr,
            blood_pressure: this.blood_pressure.value,
            heart_beat: this.heart_beat.value,
            diagnose: this.diagnose.value,
            therapy: this.therapy.value
        }
        this.setState({ treatment_curr: new_treat });
        this.state.treatment_turn[idx] = new_treat;

        alert('Ch???nh s???a th??nh c??ng');
        this.toggleEdit();
        // console.log(treatment);
        await axios.post('https://mysql-healthcare.herokuapp.com/api/update/treatment_turn_doctor', treatment)
    }

    toggleEdit() {
        this.setState({ is_edit: !this.state.is_edit });
    }

    async toggleOpen(treatment, flag) {
        let res = [];
        let payment = [];
        // console.log(treatment);

        if (flag) {
            this.setState({ treatment_curr: treatment })
            if (treatment.prescribe_id !== null) {
                res = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/order_details', { params: { orderID: treatment.prescribe_id } })
                this.setState({ orderDetailsOpen: res.data.order_details })
                console.log(res.data.order_details)
                payment = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/payment', { params: { medicine_id: treatment.prescribe_id } })
                console.log(payment)
                this.setState({ payment_detail: payment.data.payment })
            }
        }
        this.setState({ is_open: !this.state.is_open })
    }

    componentDidMount() {
        axios.get('https://mysql-healthcare.herokuapp.com/api/get/mytreatment', { params: { phone: this.state.phone } }).then(
            res => {
                this.setState({
                    treatment_turn: res.data.sort((a, b) => {
                        let day1 = (new Date(b.turn_time)).toLocaleDateString('vi');
                        let day2 = (new Date(a.turn_time)).toLocaleDateString('vi');

                        day1 = day1.split("/").map(x => parseInt(x));
                        day2 = day2.split("/").map(x => parseInt(x));

                        if (parseInt(day1[2]) > parseInt(day2[2])) return 1;
                        else if (parseInt(day1[2]) < parseInt(day2[2])) return -1;
                        else if (parseInt(day1[1]) > parseInt(day2[1])) return 1;
                        else if (parseInt(day1[1]) < parseInt(day2[1])) return -1;
                        else if (parseInt(day1[0]) > parseInt(day2[0])) return 1;
                        else if (parseInt(day1[0]) < parseInt(day2[0])) return -1;
                        else return 0;
                    })
                }); console.log(this.state.treatment_turn)
            }
        )
            .catch(error => console.log(error));

        axios.get('https://mysql-healthcare.herokuapp.com/api/get/info', { params: { phonenum: this.state.phone } }).then(res => this.setState({ system_user: res.data.user }))
            .catch(error => console.log(error));
    };
    render() {
        const treatment_turn = this.state.treatment_turn.map((x) => {
            if (true) {
                const date = new Date(x.turn_time)
                // console.log(date.getMinutes())
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
                                paddingTop: '2px',
                                width: '100px'
                            }} disabled={!(this.context.phone === x.patient_phone || this.context.role === "Doctor")}
                                onClick={() => this.toggleOpen(x, true)}>
                                {this.context.phone !== x.doctor_phone ? <span>Xem</span> : <span> Hi???u ch???nh </span>}
                            </Button>
                            {/* </Link> */}
                        </td>
                    </tr>
                )
            }
        }
        )
        if (this.context.role !== "Doctor" && this.context.role !== "Patient") return <Switch> <Redirect to={`/${this.context.role.toString()}`} /> </Switch>
        return (<>
            {this.context.role === "Doctor" ? <DoctorSideBar /> : <span></span>}
            <Container id='dung-benhan'>
                <Row style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <Col class='dung-title'>
                        <h1>L???ch s??? ??i???u tr???</h1>
                        <hr />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '98px', marginTop: '0px' }}>
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
                                        Ng??y kh??m
                                    </th>
                                    <th>
                                        B??c s?? ph??? tr??ch
                                    </th>
                                    <th>
                                        S??? ??i???n tho???i
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
                                        Th??ng tin l?????t ??i???u tr???
                                    </span>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}>
                                        M?? ??i???u tr???:&nbsp;
                                    </span>
                                    {this.state.treatment_curr.id}
                                </Col>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> B??c s?? kh??m b???nh: </span> {this.state.treatment_curr.fullname}
                                </Col>
                            </Row>
                            <Row style={{ border: '1px solid', borderRadius: '10px', padding: '10px 0px 5px 0px', marginBottom: '10px' }}>
                                <Col>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col >
                                            <span style={{ fontWeight: 'bold' }}> B???nh nh??n: </span> {this.state.system_user.lastname + " " + this.state.system_user.firstname}
                                        </Col>
                                        <Col>
                                            <span style={{ fontWeight: 'bold' }}> Ng??y sinh: </span> {(new Date(this.state.system_user.dateofbirth)).toLocaleDateString('vi')}
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col>
                                            <span style={{ fontWeight: 'bold' }}>V???n ????? s???c kh???e: </span> {this.state.treatment_curr.health_issue}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col>
                                            <span style={{ fontWeight: 'bold' }}> Huy???t ??p: </span> {this.state.treatment_curr.blood_pressure}
                                        </Col>
                                        <Col>
                                            <span style={{ fontWeight: 'bold' }}> Nh???p tim: </span> {this.state.treatment_curr.heart_beat}

                                            {/* <Input defaultValue={this.state.treatment_curr.diagnose} onChange={(e) => { this.state.treatment_curr.diagnose = e.target.value }} placeholder="Ch???n ??o??n" />
                                <Input defaultValue={this.state.treatment_curr.therapy} onChange={(e) => { this.state.treatment_curr.therapy = e.target.value }} placeholder="??i???u tr???" /> */}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col>
                                            <span style={{ fontWeight: 'bold' }}> Ch???n ??o??n: </span>{this.state.treatment_curr.diagnose}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col>
                                            <span style={{ fontWeight: 'bold' }}> Ph????ng ph??p ??i???u tr???: </span>{this.state.treatment_curr.therapy}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col>
                                    <span style={{ fontWeight: 'bold' }}> L???ch h???n: </span> {(new Date(this.state.treatment_curr.turn_time)).toLocaleString('vi')}
                                </Col>
                            </Row>

                            <Row style={{ marginBottom: '10px' }}>
                                {((+(new Date(this.state.treatment_curr.start_time))) > (+(new Date()))) ? <Col> <Badge color="danger" style={{ fontSize: '15px' }}> Ch??a ?????n th???i gian kh??m </Badge> </Col> :
                                    <>
                                        <Col>
                                            <span style={{ fontWeight: 'bold' }}> Th???i ??i???m b???t ?????u: </span>{(new Date(this.state.treatment_curr.start_time)).toLocaleString('vi')}
                                        </Col>
                                        <Col>
                                            <span style={{ fontWeight: 'bold' }}>Th???i ??i???m k???t th??c: </span>{(new Date(this.state.treatment_curr.end_time)).toLocaleString('vi')}
                                        </Col> </>}
                            </Row>

                            <Row style={{ marginBottom: '10px' }}>
                                <Col md="2">
                                    <Button
                                        hidden={this.context.role === "Patient" || this.state.treatment_curr.doctor_phone !== this.context.phone || ((+(new Date(this.state.treatment_curr.start_time))) > (+(new Date())))}
                                        style={{
                                            backgroundColor: '#62AFFC',
                                            border: '0px',
                                            width: '100px'
                                        }}
                                        onClick={() => this.toggleEdit()}>
                                        Hi???u ch???nh
                                    </Button>
                                </Col>
                                <Col md="2">
                                    <LinkContainer to={`/prescribe/${this.state.treatment_curr.id}`}
                                        style={{ backgroundColor: '#62AFFC', border: '0px', width: '100px' }}>
                                        <Button
                                            hidden={this.context.role === "Patient" || (this.state.treatment_curr.doctor_phone !== this.context.phone) || ((+(new Date(this.state.treatment_curr.start_time))) > (+(new Date())))}
                                            disabled={this.state.treatment_curr.prescribe_id != null}
                                            style={{
                                                backgroundColor: '#62AFFC',
                                                border: '0px',
                                                width: '100px'
                                            }}>
                                            K?? ????n
                                        </Button>
                                    </LinkContainer>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col md="12" style={{ textAlign: 'center' }}>
                                    {(() => {
                                        if (this.state.treatment_curr.prescribe_id === null)
                                            return <Badge color="primary" style={{ fontSize: '15px' }}> Kh??ng c?? ????n thu???c k??m theo </Badge>
                                        else {
                                            let total = 0
                                            const details = this.state.orderDetailsOpen.map(detail => {
                                                total += detail.price * detail.quantity
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
                                                            {(detail.price).toLocaleString('vi-VN')}??
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            {detail.quantity}
                                                        </td>
                                                        <td style={{ textAlign: 'right' }}>
                                                            {(detail.price * detail.quantity).toLocaleString('vi-VN')}??
                                                        </td>
                                                    </tr>
                                                );
                                            });

                                            const payment = (() => {
                                                if (this.state.payment_detail.length === 0) return <Badge color="danger" style={{ fontSize: '15px', marginBottom: '20px' }}> Ch??a thanh to??n </Badge>
                                                else return <Badge color="success" style={{ fontSize: '15px', marginBottom: '20px' }}> ???? thanh to??n </Badge>
                                            })()
                                            return <><Badge color="primary" style={{ fontSize: '15px', marginBottom: '20px', marginRight: '10px' }}> ????n thu???c k??m theo </Badge>
                                                {payment}
                                                <Table responsive hover striped bordered>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                #
                                                            </th>
                                                            <th>
                                                                T??n thu???c
                                                            </th>
                                                            <th style={{ textAlign: 'center' }}>
                                                                ????n v??? t??nh
                                                            </th>
                                                            <th style={{ textAlign: 'center' }}>
                                                                ????n gi??
                                                            </th>
                                                            <th style={{ textAlign: 'center' }}>
                                                                S??? l?????ng
                                                            </th>
                                                            <th style={{ textAlign: 'right' }}>
                                                                Th??nh ti???n
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(() => { if (this.state.orderDetailsOpen.length === 0) return <Spinner className="detail-spinner"> Loading... </Spinner> })()}
                                                        {details}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th colSpan="5" style={{ textAlign: 'center' }}>
                                                                T???ng c???ng
                                                            </th>
                                                            <th style={{ textAlign: 'right' }}>
                                                                {total.toLocaleString('vi-VN')}??
                                                            </th>
                                                        </tr>
                                                    </tfoot>
                                                </Table></>
                                        }
                                    })()}
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'right' }}>
                                <Col>
                                    <Button style={{
                                        backgroundColor: '#62AFFC',
                                        border: '0px'
                                    }} hidden={this.context.role === "Doctor" || this.state.treatment_curr.prescribe_id === null}
                                        disabled={this.state.payment_detail.length !== 0}
                                        onClick={this.onSubmitPayment}>
                                        <span style={{ fontWeight: 'bold' }}> Thanh to??n </span>
                                    </Button>
                                </Col>
                            </Row>
                            {/* <Link to={`/prescribe-med/${JSON.stringify(this.state.treatment_curr.prescribe_id)}/${JSON.stringify(this.state.system_user.phone)}`}>
                                    <Button className='order-button' >
                                        ????n thu???c ???? k??: {this.state.treatment_curr.prescribe_id}
                                    </Button>
                                </Link> */}

                        </Container>
                    </ModalBody>
                    {/* <Button >Th??m ????n thu???c</Button>
                    <Button onClick={(e) => {
                        if (this.state.treatment_curr.end_time === "") this.state.treatment_curr.end_time = new Date();
                        //submit g???i
                        this.toggleEdit();
                    }}           >X??c nh???n </Button> */}

                </Modal>
                <Modal isOpen={this.state.is_edit} toggle={this.toggleEdit}>
                    <ModalHeader> L?????t ??i???u tr??? cho b???nh nh??n </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row>
                                <Col>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup row>
                                            <Label
                                                for="exampleEmail"
                                                sm={3}
                                            >
                                                Huy???t ??p
                                            </Label>
                                            <Col sm={9}>
                                                <Input innerRef={input => this.blood_pressure = input}
                                                    required
                                                    id="exampleEmail"
                                                    name="email"
                                                    placeholder=""
                                                    type="number"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                                for="examplePassword"
                                                sm={3}
                                            >
                                                Nh???p tim
                                            </Label>
                                            <Col sm={9}>
                                                <Input innerRef={input => this.heart_beat = input}
                                                    required
                                                    id="examplePassword"
                                                    name="password"
                                                    placeholder=""
                                                    type="number"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                                for="examplePassword"
                                                sm={3}
                                            >
                                                Ch???n ??o??n
                                            </Label>
                                            <Col sm={9}>
                                                <Input innerRef={input => this.diagnose = input}
                                                    required
                                                    id="examplePassword"
                                                    name="password"
                                                    placeholder=""
                                                    type="textarea"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                                for="examplePassword"
                                                sm={3}
                                            >
                                                Ph????ng ph??p ??i???u tr???
                                            </Label>
                                            <Col sm={9}>
                                                <Input innerRef={input => this.therapy = input}
                                                    required
                                                    id="examplePassword"
                                                    name="password"
                                                    placeholder=""
                                                    type="textarea"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <Row style={{ textAlign: 'right' }}>
                                            <Col>
                                                <Button
                                                    style={{
                                                        backgroundColor: '#62AFFC',
                                                        border: '0px'
                                                    }}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
            </Container>
            </>
        )
    }
}
ViewMedicalRecord.contextType = HeaderDefine;
export default ViewMedicalRecord;
