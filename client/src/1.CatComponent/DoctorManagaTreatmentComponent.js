import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DoctorSideBar from './DoctorSideBarComponent';

class DoctorManageTreatment extends Component {
    render() {
        return(
            <div>
                <DoctorSideBar />
                <Container>
                    <Row>
                        <Col> Danh sách đơn thuốc </Col>
                        <Col> Tìm đơn thuốc </Col>
                    </Row>
                    <Row>
                        <Col>
                        Các đơn thuốc
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DoctorManageTreatment;