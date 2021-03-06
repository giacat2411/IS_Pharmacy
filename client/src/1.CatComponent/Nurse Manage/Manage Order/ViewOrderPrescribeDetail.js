import React, { Component } from 'react';
import { Container, Row, Col, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import NurseSideBar from '../../../5.Share Component/SideBar/NurseSideBarComponent';
import { Spinner } from 'reactstrap';
import { FaAngleLeft } from 'react-icons/fa'
import './manage_order.css';
import { Switch, Redirect } from 'react-router';
import ToastServive from 'react-material-toast';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import HeaderDefine from '../../../5.Share Component/Context';

const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});

class ViewOrderPrescribeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsOpen: [],
            orderOpen: { id: "", fullname: "", dateofbirth: "", address: "", phone: "" },
            payment: [],
            nurse: "",
            is_open: false
        }
        this.onSubmitPayment = this.onSubmitPayment.bind(this);
        this.onSubmitPaymentNurse = this.onSubmitPaymentNurse.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.setState({is_open: !this.state.is_open});
    }

    onSubmitPayment(total) {
        axios.post('https://mysql-healthcare.herokuapp.com/api/insert/momo_payment', { medicine_id: this.state.orderOpen.prescribe_id })
        axios.post('https://mysql-healthcare.herokuapp.com/payment_momo', { total: total.toString() })
            .then(res => {
                window.location.href = res.data.payUrl
            });
    }

    async onSubmitPaymentNurse() {
        console.log(this.context.phone)
        axios.post('https://mysql-healthcare.herokuapp.com/api/insert/momo_payment_nurse', { medicine_id: this.state.orderOpen.prescribe_id, phone: this.context.phone })
        toast.success('Th??nh c??ng');

        const res = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/payment', { params: { medicine_id: this.props.orderID } })

        this.setState({ payment: res.data.payment })

        const res2 = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/info', { params: { phonenum: this.context.phone } })

        console.log(res2)
        this.setState({ nurse: res2.data.user.fullname })
        console.log(this.state.nurse)

    }

    async componentDidMount() {
        const orderID = this.props.orderID;
        axios.get('https://mysql-healthcare.herokuapp.com/api/get/order_details', { params: { orderID: orderID } })
            .then(res => {
                const order_details = res.data.order_details;
                this.setState({ orderDetailsOpen: order_details });
            })
            .catch(error => console.log(error));

        axios.get('https://mysql-healthcare.herokuapp.com/api/get/order_prescribe_in_view', { params: { orderID: orderID } })
            .then(res => {
                const information = res.data.information;
                this.setState({ orderOpen: information[0] });
                console.log(this.state.orderOpen);
            })
            .catch(error => console.log(error));

        const res = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/payment', { params: { medicine_id: orderID } })
        console.log(res);
        this.setState({ payment: res.data.payment })

        console.log(res.data.payment[0])
        if (res.data.payment.length !== 0)
            if (res.data.payment[0].nurse_phone !== null) {
                const res2 = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/info', { params: { phonenum: res.data.payment[0].nurse_phone } })

                console.log(res2)
                this.setState({ nurse: res2.data.user.fullname })
                console.log(this.state.nurse)
            }
    }

    convertDate(day) {
        let date = day.getDate();
        let month = day.getMonth() + 1;
        let year = day.getYear() + 1900;

        if (date < 10) date = "0" + date.toString();
        if (month < 10) month = "0" + month.toString();

        return date + "/" + month + "/" + year;
    }

    countAge(day) {
        let year = day.getYear() + 1900 - parseInt(new Date().getFullYear());
        return (-year)
    }

    render() {
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



        const pageStyle = {};
        // Nurse -> ???, 
        if (this.context.role !== "Nurse" && this.context.role !== "Patient") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
                {(this.context.role === "Nurse") ? <NurseSideBar /> : <div />}
                <Container>
                    <Row>
                        <Col>
                            <LinkContainer to="/view_order">
                                <Button className="back-button"> <FaAngleLeft /> </Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Container>
                <Container className="order-inform">
                    <Row style={{ paddingTop: '10px' }}>
                        <Col> <img className="logo-print" src="/assets/images/Logo.png" height="50px" width="50px" alt="Logo"></img>
                            <span > HealthCare </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" style={{ textAlign: 'right' }}>
                            M?? ????n thu???c: {this.state.orderOpen.prescribe_id}
                        </Col>
                    </Row>
                    <div ref={(el) => { this.componentRef = el }}>
                        <Row>
                            <Col md="12" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px', margin: '10px 0px 20px 0px' }}>
                                ????N THU???C
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                T??n b???nh nh??n: <span style={{ fontWeight: 'bold' }}>{this.state.orderOpen.fullname}</span>
                            </Col>
                            <Col md="3">
                                Tu???i: {this.countAge(new Date(this.state.orderOpen.dateofbirth))}
                            </Col>
                            <Col md="3" style={{ textAlign: 'right' }}>
                                Gi???i t??nh: Nam
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '5px' }}>
                            <Col>
                                ?????a ch???: {this.state.orderOpen.address}
                            </Col>
                        </Row>
                        {this.state.nurse === "" ? <span></span> :
                            <Row style={{ marginTop: '5px' }}>
                                <Col>
                                    X??c nh???n thanh to??n: {this.state.nurse}
                                </Col>
                            </Row>}
                        <Row style={{ marginTop: '5px', marginBottom: '10px', textAlign: 'right' }}>
                            <Col>
                                {this.state.payment.length !== 0 ? <Badge color="success"> ???? thanh to??n </Badge> : <Badge color="danger"> Ch??a thanh to??n </Badge>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
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
                                </Table>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md="12">
                            {(() => {
                                if (this.state.payment.length !== 0)
                                    return <ReactToPrint
                                        trigger={() => <Button className="print-bill-button"> In h??a ????n </Button>}
                                        content={() => this.componentRef}
                                        pageStyle={pageStyle} />
                                else if (this.context.role === "Nurse")
                                    return <Button className="print-bill-button" onClick={() => this.handleOpen()}> X??c nh???n thanh to??n </Button>
                                else
                                    return <Button className="print-bill-button" onClick={() => this.onSubmitPayment(total)}> Thanh to??n </Button>
                            })()}

                        </Col>
                    </Row>
                    <Modal isOpen={this.state.is_open} toggle={this.handleOpen} centered>
                        <ModalHeader> B???n c?? ch???c ch???n v???i l???a ch???n c???a m??nh ? </ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row>
                                    <Col>
                                        <Button onClick={() => { this.onSubmitPaymentNurse(); this.handleOpen() }}
                                            style={{
                                                backgroundColor: '#62AFFC',
                                                border: '0px'
                                            }}>
                                            C??
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => { this.handleOpen();  }}
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

                    <Row style={{ padding: '10px 0px 5px 0px', margin: '15px 1px auto auto' }}>
                        <Col style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '25px', fontWeight: 'bold' }}>
                                Th??ng tin l?????t ??i???u tr???
                            </span>
                        </Col>
                        <Row style={{ marginBottom: '10px', marginTop: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}>
                                    M?? ??i???u tr???:&nbsp;
                                </span>
                                {this.state.orderOpen.id}
                            </Col>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> B??c s?? kh??m b???nh: </span> {this.state.orderOpen.doctor_name}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col >
                                <span style={{ fontWeight: 'bold' }}> B???nh nh??n: </span> {this.state.orderOpen.fullname}
                            </Col>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Ng??y sinh: </span> {this.state.orderOpen.dateofbirth}
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}>V???n ????? s???c kh???e: </span> {this.state.orderOpen.health_issue}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Huy???t ??p: </span> {this.state.orderOpen.blood_pressure}
                            </Col>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Nh???p tim: </span> {this.state.orderOpen.heart_beat}

                                {/* <Input defaultValue={this.state.treatment_curr.diagnose} onChange={(e) => { this.state.treatment_curr.diagnose = e.target.value }} placeholder="Ch???n ??o??n" />
                                <Input defaultValue={this.state.treatment_curr.therapy} onChange={(e) => { this.state.treatment_curr.therapy = e.target.value }} placeholder="??i???u tr???" /> */}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Ch???n ??o??n: </span>{this.state.orderOpen.diagnose}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Ph????ng ph??p ??i???u tr???: </span>{this.state.orderOpen.therapy}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> L???ch h???n: </span> {this.state.orderOpen.turn_time}
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '10px' }}>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}> Th???i ??i???m b???t ?????u: </span>{this.state.orderOpen.start_time}
                            </Col>
                            <Col>
                                <span style={{ fontWeight: 'bold' }}>Th???i ??i???m k???t th??c: </span>{this.state.orderOpen.end_time}
                            </Col>
                        </Row>
                    </Row>

                </Container>
            </>
        )
    }
}
ViewOrderPrescribeDetail.contextType = HeaderDefine
export default ViewOrderPrescribeDetail;