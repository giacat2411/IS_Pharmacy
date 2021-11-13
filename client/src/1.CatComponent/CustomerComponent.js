import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle} from 'reactstrap';

class Customer extends Component{
    render(){
        return(
            <Container>
                <Row>
                    <Col md="12"> <h1 className="cat-cushome-header">Chào mừng bạn đến với Health Care !</h1>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="6">
                        <Card className="cat-customer-item-right">
                            <img className="cat-customer-img" width="91.98px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Tra cứu</CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">    
                        <a className="cat-customer-item-link" href="/buydrug">
                        <Card className="cat-customer-item-left">
                            <img className="cat-customer-img" width="61.86px" height="85px" src="/assets/images/buy-home.png" alt = "Mua thuốc online"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Mua thuốc online</CardTitle>
                            </CardBody>
                        </Card>
                        </a>
                    </Col>
                    <Col md="6">
                        <a href='/appointment'>
                            <Card className="cat-customer-item-right">
                                <img className="cat-customer-img" width="67.29px" height="95px" src="/assets/images/make-treat-home.png" alt = "Đặt lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Đặt lịch khám</CardTitle>
                                </CardBody>
                            </Card>
                        </a>
                    </Col>
                    <Col md="6">
                        <a href='/cancelappointment'>
                            <Card className="cat-customer-item-left">
                                <img className="cat-customer-img" width="94px" height="95px" src="/assets/images/cancal-treat.png" alt = "Hủy lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Hủy lịch khám</CardTitle>
                                </CardBody>
                            </Card>
                        </a>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Customer;