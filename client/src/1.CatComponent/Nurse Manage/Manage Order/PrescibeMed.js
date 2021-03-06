import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import NurseSideBar from '../../../5.Share Component/SideBar/NurseSideBarComponent';
import { Spinner } from 'reactstrap';
import { FaAngleLeft } from 'react-icons/fa'
import './manage_order.css';
import { Switch, Redirect } from 'react-router';

import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import HeaderDefine from '../../../5.Share Component/Context';

class PrescribeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsOpen: [],
            userInfo:{fullname: "", dateofbirth: "", address: "", phone:this.props.phone},
            treatmentInfo: {id: "",name:""}, 
        }
        console.log(this.props);
    }

    componentDidMount() {
        const orderID = this.props.orderID;
        axios.get('https://mysql-healthcare.herokuapp.com/api/get/order_details', {params: {orderID: orderID}})
                .then(res => {
                    const order_details = res.data.order_details;
                        this.setState({orderDetailsOpen: order_details});
                    })
                .catch(error => console.log(error));

        axios.get('https://mysql-healthcare.herokuapp.com/api/get/prescribe-doctor',{params: {orderID: orderID}}).then(res=>{
            this.setState({treatmentInfo:res.data})
        })
        axios.get('https://mysql-healthcare.herokuapp.com/api/get/info',{params:{phone:this.state.userInfo.phone}}).then(
            res=>{
                this.setState({userInfo:res.data})
            }
        )
        
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
        const details = this.state.orderDetailsOpen.map(detail => {
            return (
                <tr>
                <th scope="row" style={{textAlign: 'center'}}>
                    {this.state.orderDetailsOpen.indexOf(detail) + 1}
                </th>
                <td>
                    {detail.drug_name}
                </td>
                <td style={{textAlign: 'center'}}>
                    {detail.unit}
                </td>
                <td style={{textAlign: 'center'}}>
                    {(detail.price).toLocaleString('vi-VN')}??
                </td>
                <td style={{textAlign: 'center'}}>
                    {detail.quantity}
                </td>
                <td style={{textAlign: 'right'}}>
                    {(detail.price * detail.quantity).toLocaleString('vi-VN')}??
                </td>
                </tr>
            );
        });
        
        

        const pageStyle = {};
        if (this.context.role !== "Nurse"&&this.context.phone!==this.state.userInfo.phone) return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
            { (this.context.role === "Nurse")?<NurseSideBar/>:<div/>}
            <Container>
                <Row>
                    <Col>
                        <LinkContainer to="/view_order">
                        <Button className="back-button"> <FaAngleLeft /> </Button>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
            <div ref={(el) => {this.componentRef = el}}>
            <Container className="order-inform">
                <Row style={{paddingTop: '10px'}}>
                    <Col> <img className="logo-print" src="/assets/images/Logo.png" height="50px" width="50px" alt="Logo"></img> 
                        <span > HealthCare </span>
                    </Col>
                </Row>
                <Row>
                    <Col md = "12" style= {{textAlign: 'right'}}>
                        M?? ????n thu???c: {this.state.userInfo.id}
                    </Col>
                </Row>
                <Row>
                    <Col md="12" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px', margin: '10px 0px 20px 0px'}}>
                        ????N THU???C
                    </Col>
                </Row>
                <Row>
                    <Col md="6"> 
                        T??n b???nh nh??n: <span style={{fontWeight: 'bold'}}>{this.state.userInfo.fullname}</span>
                    </Col>
                    <Col md="3">
                        Tu???i: {this.countAge(new Date(this.state.userInfo.dateofbirth))}
                    </Col>
                    <Col md="3" style = {{textAlign: 'right'}}>
                        Gi???i t??nh: Nam
                    </Col>
                </Row>
                <Row style={{margin: '5px 0px 5px 0px'}}>
                    <Col>
                    ?????a ch???: {this.state.userInfo.address}
                    </Col>
                </Row>
            </Container>
            <Container>
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
                                <th style={{textAlign: 'center'}}>
                                    ????n v??? t??nh
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    ????n gi??
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    S??? l?????ng
                                </th>
                                <th style={{textAlign: 'right'}}>
                                    Th??nh ti???n
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {if (this.state.orderDetailsOpen.length === 0) return <Spinner className="detail-spinner"> Loading... </Spinner>})()}
                                {details}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container>
                <thead> B??c s??? k?? ????n: {this.state.treatmentInfo.doctor}</thead>
            </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                        <ReactToPrint 
                            trigger={() => <Button className="print-bill-button"> In h??a ????n </Button>}
                            content={() => this.componentRef}
                            pageStyle={pageStyle} />
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}
PrescribeDetail.contextType = HeaderDefine
export default PrescribeDetail;