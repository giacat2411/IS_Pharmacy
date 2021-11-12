import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';

import NurseSideBar from '../../NurseSideBarComponent';
import AddDrug from './AddDrug';
import ViewDrug from './ViewDrug';


import axios from 'axios';
import './managedrug.css';

class ManageDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1,
            drugs: [],
            display_drugs: [],
            drug_open: []
        }
        this.onClickAdd = this.onClickAdd.bind(this);   
        this.onClickView = this.onClickView.bind(this);
        this.getDrugs = this.getDrugs.bind(this);
        this.changeDisplayDrug = this.changeDisplayDrug.bind(this);
        this.changeDrugOpen = this.changeDrugOpen.bind(this);
    }

    changeDrugOpen(drug) {
        this.setState({drug_open: drug})
    }

    changeDisplayDrug(list) {
        this.setState({display_drugs: list})
    }
    onClickAdd() {
        this.setState({view: 0});
    }

    onClickView() {
        this.setState({view: 1})
    }

    componentDidMount() {
        axios.get('/api/get/drugs')
            .then(res => {
               const newdrugs = res.data.drugs; 
               this.setState({drugs: newdrugs, display_drugs: newdrugs});
            })
        .catch(error => console.log(error));
    }

    getDrugs() {
        axios.get('/api/get/drugs')
            .then(res => {
               const newdrugs = res.data.drugs; 
               this.setState({drugs: newdrugs, display_drugs: newdrugs});
            })
        .catch(error => console.log(error));
    }

    render() {   
        const Add = <AddDrug drugs = {this.state.drugs} getDrugs = {this.getDrugs}/>;
        const View = <ViewDrug drugs = {this.state.drugs} drug_open = {this.state.drug_open}
                               display_drugs = {this.state.display_drugs} 
                               changeDisplayDrug = {this.changeDisplayDrug}
                               changeDrugOpen = {this.changeDrugOpen} getDrugs = {this.getDrugs}/>; 
        return(
            <>
                <NurseSideBar />
                <Container>
                    <Row>
                        <Col md="6" style={{paddingLeft: '20px'}}> 
                            <Button onClick={this.onClickAdd} className="manage-button"> 
                                Thêm <span style={{textTransform: 'lowercase'}}> sản phẩm thuốc </span> 
                            </Button> 
                        </Col>
                        <Col md="6"> 
                            <Button onClick={this.onClickView} className="manage-button"> 
                                Xem <span style={{textTransform: 'lowercase'}}> sản phẩm thuốc </span> 
                            </Button>
                        </Col>
                    </Row>
                    {(this.state.view === 0) && Add}
                    {(this.state.view === 1) && View}
                </Container>
            </>
        );
    }
}

export default ManageDrug;