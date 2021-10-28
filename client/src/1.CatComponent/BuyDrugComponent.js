import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Navbar, Nav, NavItem, 
    Collapse } from 'reactstrap';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import axios from 'axios';

class BuyDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugs : [],
            nums_item: 0,
            carts: []
        }
    }

    componentDidMount() {
        axios.get('/api/get/drugs')
             .then(res => {
                const drugs = res.data;
                this.setState({ drugs: drugs.drugs });
                console.log(this.state.drugs)
              })
             .catch(error => console.log(error));
      };

      render(){
          const drug_list = this.state.drugs.map(drug => {
              const price = drug.price * 1000;
              return(
                <Col lg="2" md="3" sm="4">
                <Card className="drug-item">
                <img className="drug-img" width="91.98px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
                <CardBody>
                <CardTitle tag="h5" className="drug-text">{drug.drug_name}</CardTitle>
                <CardSubtitle tag="h6" className="drug-title">500mg, Viên sủi</CardSubtitle>
                <CardText className="drug-price-add">
                    <span className="drug-price"> {price.toLocaleString('vi-VN')}đ </span>
                    <span className="drug-add-item"> 
                        <img width="35px" height="35px" src="/assets/images/add-item.png" alt="Add Item"/> 
                    </span>
                </CardText> 
                
                </CardBody>
                </Card>
                </Col>
              )
          })
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
                                <Form className="search-bar">
                                    <FormGroup>
                                        <Input
                                        id="search"
                                        name="search-drugs"
                                        placeholder="Tìm sản phẩm thuốc mong muốn"
                                        />
                                    </FormGroup>
                                </Form>
                            </NavItem>
                            <NavItem className="search-button">
                            <Button color="primary">
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
                    </Row>
                </Container>
              </>
          )
      }
}

export default BuyDrug;
