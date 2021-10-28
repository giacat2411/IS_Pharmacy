import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Navbar, Nav, NavItem, 
    Collapse } from 'reactstrap';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Modal, ModalBody } from 'reactstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import axios from 'axios';

class BuyDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugs : [],
            nums_item: 0,
            carts: [],
            drugs_display: [],
            item_open: [],
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.setItemModal = this.setItemModal.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    setItemModal(item, e) {
        this.setState({
            item_open: item
        });
    }

    handleSubmit(){
        const search = this.state.drugs.filter(drug => {
            return drug.drug_name.toLowerCase().replace(/\s/g, '').includes(this.search_item.value.toLowerCase().replace(/\s/g, ''));
        })
        this.setState({drugs_display: search});
    }

    componentDidMount() {
        axios.get('/api/get/drugs')
             .then(res => {
                const drugs = res.data;
                this.setState({ drugs: drugs.drugs, 
                        drugs_display: drugs.drugs,
                    item_open: drugs.drugs[0]});
              })
             .catch(error => console.log(error));
      };

      render(){
          const not_Found = () => {
              if (this.state.drugs_display.length === 0) 
              return (
                  <Col md="12">
                    <div className="not-found"> Không tìm thấy kết quả</div>
                  </Col>
              );
          }
          const drug_list = this.state.drugs_display.map(drug => {
              const price = drug.price * 1000;
              return(
                <Col lg="2" md="3" sm="4">
                <Card className="drug-item">
                <img className="drug-img" width="91.98px" height="90px" src="/assets/images/drug_example.png" alt = "Xem hồ sơ bệnh án"></img>
                <CardBody>
                <CardTitle tag="h5" className="drug-text">{drug.drug_name}</CardTitle>
                <CardSubtitle tag="h6" className="drug-title">500mg, Viên sủi</CardSubtitle>
                <CardText className="drug-price-add">
                    <span className="drug-price"> {price.toLocaleString('vi-VN')}đ </span>
                    <span className="drug-add-item"> 
                        <img className="drug-add-item-img" 
                            onClick={(e) => {this.toggleModal(); this.setItemModal(drug, e)}} 
                            width="35px" height="35px" src="/assets/images/add-item.png" alt="Add Item"/> 
                    </span>
                </CardText>     
                </CardBody>
                </Card>
                </Col>
              )
          });

          return(
              <>
                <Navbar dark expand="md">
                <div className="container">
                    <Collapse navbar>
                        <Nav navbar>
                            <NavItem>
                                <img src='assets/images/category.png' width="40px" height="40px" alt="Danh mục"></img>
                            </NavItem>
                            <NavItem className="search">
                                <p className="search-1"> Danh Mục </p>
                                <p className="search-2"> Sản Phẩm </p>
                            </NavItem>
                            <NavItem>
                                <img className="show-category" src='assets/images/arrow.png' width="17px" height="17px" alt="Chọn"></img>
                            </NavItem>
                            <NavItem>
                                <Form className="search-bar" onSubmit={e => {e.preventDefault();}}>
                                    <FormGroup>
                                        <Input id="search" name="search-drugs" placeholder="Tìm sản phẩm thuốc mong muốn"
                                        innerRef={(input) => this.search_item = input} />
                                    </FormGroup>
                                </Form>
                            </NavItem>
                            <NavItem className="search-button">
                            <Button color="primary" onClick={this.handleSubmit}>
                                <FaSearch /> Tìm kiếm
                            </Button>
                            </NavItem>
                        </Nav>

                        <Nav className="ml-auto" navbar>
                            <NavItem className="cart">
                            <FaShoppingCart className="buy-cart"/> 
                            <span> Giỏ hàng </span>
                            <span className="buy-cart-item"> {this.state.nums_item} </span>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
                </Navbar>

                <Container>
                    <Row>
                        {drug_list}  
                        {not_Found()}
                    </Row>
                </Container>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalBody>
                    <Card className="modal-drug-item">
                        <img className="modal-drug-img" width="283px" height="283px" src="/assets/images/drug_example.png" alt = "Ảnh thuốc"></img>
                        <CardBody>
                        <CardTitle tag="h5" className="modal-drug-text">{this.state.item_open.drug_name}</CardTitle>
                        <CardSubtitle tag="h6" className="modal-drug-title">500mg, Viên sủi</CardSubtitle>
                        <CardText className="modal-drug-price">
                            {(this.state.item_open.price*1000).toLocaleString('vi-VN')}đ 
                        </CardText>     
                        </CardBody>
                    </Card>
                        <Button onClick={this.toggleModal} className="modal-add-button"> Thêm vào giỏ hàng </Button>
                    </ModalBody>
                </Modal>
              </>
          )
      }
}

export default BuyDrug;
