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
                    <Col md="12"> <h1 className="cat-cushome">Chào mừng bạn đến với Health Care !</h1>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="6">
                    <LinkContainer to ="/" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                        <Card className="customer-item-right">
                            <img className="cat-customer-img" width="91.98px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
                            <CardBody>
                            <CardTitle className="cat-customer-text">Tra cứu</CardTitle>
                            </CardBody>
                        </Card>
                    </NavLink>
                    </LinkContainer>    
                    </Col>
                    <Col md="6">    
                    <LinkContainer to ="/buydrug" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                        
                        </NavLink>
                        </LinkContainer>
                    </Col>
                    <Col md="6">
                        <LinkContainer to ="/cancelappointment" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                            <Card className="cat-customer-item-left">
                                <img className="cat-customer-img" width="94px" height="95px" src="/assets/images/cancal-treat.png" alt = "Hủy lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Hủy lịch khám</CardTitle>
                                </CardBody>
                            </Card>
                            </NavLink>
                        </LinkContainer>
                    </Col>
                    <Col md="6">
                    <LinkContainer to ="/appointment" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                            <Card className="cat-customer-item-right">
                                <img className="cat-customer-img" width="67.29px" height="95px" src="/assets/images/make-treat-home.png" alt = "Đặt lịch khám"></img>
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
                                <img className="cat-customer-img" width="94px" height="95px" src="/assets/images/cancal-treat.png" alt = "Hủy lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Hủy lịch khám</CardTitle>
                                </CardBody>
                            </Card>
                            </NavLink>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
            </Container>
        )
    }
}
export default Customer;