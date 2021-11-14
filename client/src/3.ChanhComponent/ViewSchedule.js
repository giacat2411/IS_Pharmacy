import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DoctorSideBar from './DoctorSideBarComponent';

class ViewSchedule extends Component {
    render() {
        return(
            <div>
                <DoctorSideBar />
                <Container>
                    <Row>
                        <Col> Lịch làm việc </Col>
                        <Col> Tìm lịch làm việc </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ViewSchedule;