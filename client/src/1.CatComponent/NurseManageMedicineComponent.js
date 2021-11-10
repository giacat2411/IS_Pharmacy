import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NurseSideBar from './NurseSideBarComponent';

class NurseManageMedicine extends Component {
    render() {
        return(
            <div>
                <NurseSideBar />
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

export default NurseManageMedicine;