import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';
import { Modal, ModalBody } from 'reactstrap';
import './managedrug.css';

class AddDrug extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <Container>
                    <Row className="manage-order-heading">
                        <Col className='manage-order-header'> Danh sách đơn hàng </Col>
                        <Col> 
                        <Row>
                        </Row>
                        </Col>
                    </Row>
                    <Row>
                        
                    </Row>
            </Container> 
        )
    }
}

export default AddDrug;