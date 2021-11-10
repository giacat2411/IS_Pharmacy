import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
<<<<<<< Updated upstream
import DoctorSideBar from './DoctorSideBarComponent';
=======
import DoctorseSideBar from './DoctorSideBarComponent';
>>>>>>> Stashed changes

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