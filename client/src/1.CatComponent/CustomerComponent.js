import React, {Component} from 'react';
import { NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap'; 

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
                    <LinkContainer to ="/" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                        <Card className="cat-customer-item-right">
                            <img className="cat-customer-img" width="90px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Tra cứu</CardTitle>
                            </CardBody>
                        </Card>
                    </NavLink>
                    </LinkContainer>    
                    </Col>
                    <Col md="6">    
                    <LinkContainer to ="/buydrug" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                        <Card className="cat-customer-item-left">
                            <img className="cat-customer-img" width="65px" height="90px" src="/assets/images/buy-home.png" alt = "Mua thuốc online"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Mua thuốc online</CardTitle>
                            </CardBody>
                        </Card>
                        </NavLink>
                        </LinkContainer>
                    </Col>
                    <Col md="6">
                    <LinkContainer to ="/appointment" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                            <Card className="cat-customer-item-right">
                                <img className="cat-customer-img" width="65px" height="90px" src="/assets/images/make-treat-home.png" alt = "Đặt lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Đặt lịch khám</CardTitle>
                                </CardBody>
                            </Card>
                            </NavLink>
                        </LinkContainer>
                    </Col>
                    <Col md="6">
                        <LinkContainer to ="/cancelappointment" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                            <Card className="cat-customer-item-left">
                                <img className="cat-customer-img" width="93px" height="90px" src="/assets/images/cancal-treat.png" alt = "Hủy lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Hủy lịch khám</CardTitle>
                                </CardBody>
                            </Card>
                            </NavLink>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Customer;