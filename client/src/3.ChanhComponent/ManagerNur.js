import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DoctorSideBar from './DoctorSideBarComponent';

class ManagerNur extends Component {
    render() {
        return(
            <div>
                <DoctorSideBar />
                <Container>
                    <Row>
                        <Col> Danh sách điều dưỡng </Col>
                        <Col> Tìm thông tin điều dưỡng </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ManagerNur;