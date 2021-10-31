import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Card, CardBody} from 'reactstrap';

class HomeNur extends Component{
    render(){
        return(
            <Container class='dung-doctor'>
                <div class='dung-title'>
                    <h1>Chào mừng đến với HealthCare!</h1>
                    <hr/>
                </div>
                <div class="dung-doctor-row1">
                <Row className="home-service">
                    <Col>
                        <Card className="service-item">
                            <center>
                            <img className="service-img" width="61.86px" height="85px" src="/assets/images/buy-home.png" alt = "Quản lý đơn thuốc"></img>
                            </center>
                            <CardBody>
                            <center>
                            <Button tag="h5">Quản lý đơn thuốc</Button>
                            </center>
                            </CardBody>
                        </Card>                   
                    </Col>
                    <Col>
                        <Card className="service-item">
                            <center>
                            <img className="service-img" width="61.86px" height="85px" src="/assets/images/buy-home.png" alt = "Tạo lịch khám"></img>
                            </center>
                            <CardBody>
                            <center>
                            <Button tag="h5">Tạo lịch khám</Button>
                            </center>
                            </CardBody>
                        </Card>                   
                    </Col>
                    <Col>
                        <Card className="service-item">
                            <center>
                            <img className="service-img" width="61.86px" height="85px" src="/assets/images/make-treat-home.png" alt = "Thống kê lịch khám"></img>
                            </center>
                            <CardBody>
                            <center>
                            <Button tag="h5">Thống kê lịch khám</Button>
                            </center>
                            </CardBody>                           
                        </Card>                   
                    </Col>
                </Row>
                </div>
            </Container>
        );
    }
}

export default HomeNur;