import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, NavLink } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Nurse extends Component{
    render(){
        return(
            <Container>
                <Row>
                    <Col md="12"> <h1 className="cat-cushome-header">Chào mừng bạn đến với Health Care !</h1>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md="4">
                        <LinkContainer to="/manage_drug" >
                        <NavLink className="cat-customer-item-link">
                        <Card className="cat-customer-item">
                            <img className="cat-customer-img" width="91.98px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Quản lý thuốc</CardTitle>
                            </CardBody>
                        </Card>
                        </NavLink>
                        </LinkContainer>
                    </Col>
                    <Col md="4">    
                        <LinkContainer to="/view_order" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link">
                        <Card className="cat-customer-item">
                            <img className="cat-customer-img" width="61.86px" height="85px" src="/assets/images/buy-home.png" alt = "Mua thuốc online"></img>
                            <CardBody>
                            <CardTitle tag="h5" className="cat-customer-text">Quản lý đơn thuốc</CardTitle>
                            </CardBody>
                        </Card>
                        </NavLink>
                        </LinkContainer>
                    </Col>
                    <Col md="4">
                    {/* <LinkContainer to ="/" style={{cursor: 'pointer'}}>
                        <NavLink className="cat-customer-item-link"> */}
                            <Card className="cat-customer-item">
                                <img className="cat-customer-img" width="67.29px" height="95px" src="/assets/images/make-treat-home.png" alt = "Đặt lịch khám"></img>
                                <CardBody>
                                <CardTitle tag="h5" className="cat-customer-text">Thống kê lịch khám</CardTitle>
                                </CardBody>
                            </Card>
                    {/* </NavLink>
                    </LinkContainer> */}
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Nurse;