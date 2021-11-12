import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Table, Button } from 'reactstrap';
import { Form, FormGroup, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

import './managedrug.css';

class ViewDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModelOpen: false
        }
        this.onInputDrugName = this.onInputDrugName.bind(this);
        this.onToggleModel = this.onToggleModel.bind(this);
        this.add_num_drugs = this.add_num_drugs.bind(this);
    }

    onToggleModel(drug, flag) {
        if (flag === true) this.props.changeDrugOpen(drug);
        this.setState({
            isModelOpen: !this.state.isModelOpen});
    }

    add_num_drugs() {
        const item = {
            drug: this.props.drug_open,
            quantity: parseInt(this.drugs_quantity.value) + parseInt(this.props.drug_open.remain)
        }
        console.log(item);
        axios.post('/api/update/drug_quantity', item)
            .then().catch(error => console.log(error));
    }
    
    onInputDrugName() {
        const search_name = this.search_item.value;
        const display = this.props.drugs.filter(drug => {
            return drug.drug_name.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
            .replace(/Đ/g, 'D').toLowerCase()
            .includes(search_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase());
        })
        this.props.changeDisplayDrug(display);
    }

    render() {
        const display_drugs = this.props.drugs.map((drug) => {
            return (
                <tr>
                <th scope="row">
                    {this.props.display_drugs.indexOf(drug) + 1}
                </th>
                <td>
                    {drug.drug_name}
                </td>
                <td style={{textAlign: 'center'}}>
                    {drug.unit}
                </td>
                <td style={{textAlign: 'center'}}>
                    {drug.price.toLocaleString('vi-VN')}đ
                </td>
                <td style={{textAlign: 'center'}}>
                    {drug.remain}
                </td>
                <td style={{textAlign: 'center'}}>
                    <Button className='manage-drug-button' onClick={() => {this.onToggleModel(drug, true)}}> 
                            Nhập hàng
                    </Button>
                </td>
                </tr>
        )}); 

        return (
            <Container>
                    <Row className="manage-order-heading">
                        <Col className='manage-order-header'> Danh sách sản phẩm thuốc </Col>
                        <Col>
                            <Row>
                                <Form className="search-drug1-bar" onSubmit={e => {e.preventDefault();}}>
                                    <FormGroup>
                                        <Input className="search-box" id="search" name="search-drugs" placeholder="Nhập tên thuốc"
                                        innerRef={(input) => this.search_item = input} />
                                    </FormGroup>
                                </Form> 
                                <Button className="search-drug-button" onClick={this.onInputDrugName}>
                                    <FaSearch /> Tìm <span style={{textTransform: 'lowercase'}}> kiếm </span>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table responsive hover striped>
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Tên thuốc
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    Đơn vị
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    Đơn giá
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    Số lượng còn lại
                                </th>
                                <th style={{textAlign: 'center'}}>
                                    Hành động
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_drugs}
                            </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.isModelOpen} toggle={this.onToggleModel} centered>
                        <ModalHeader>
                        {this.props.drug_open.drug_name}
                        </ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row>
                                <Form className="search-drug1-bar" onSubmit={e => {e.preventDefault();}}>
                                    <FormGroup>
                                        <Input className="search-box" id="search" name="search-drugs" placeholder="Nhập số lượng"
                                        innerRef={(input) => this.drugs_quantity = input} />
                                    </FormGroup>
                                </Form> 
                                <Button className="search-drug-button" onClick={() => {this.onToggleModel("",false); this.add_num_drugs();}}>
                                    <FaSearch /> Nhập <span style={{textTransform: 'lowercase'}}> hàng </span>
                                </Button>
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>
                </Container> 
        )
    }
}

export default ViewDrug;