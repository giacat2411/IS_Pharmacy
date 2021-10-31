import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class ViewCart extends Component {
    render(){
        let total = 0;
        const cart = this.props.cart;
        for (let i = 0; i < cart.length; i++) {
            console.log(cart[i].number);
            total += (cart[i].number)*(cart[i].item.price);
        }

        const list = this.props.cart.map(item => {
            return(
                <Col className="cart-item" md="12">
                    <img className="cart-item-img" width="150px" height="150px" src="/assets/images/drug_example.png" alt = "Ảnh thuốc"></img>
                    <div className="cart-item-name"> {item.item.drug_name}  </div>
                    <div className="cart-item-content"> 500mg, Viên sủi bọt </div>

                    <div className="cart-item-number"> {item.number} x {(item.item.price*1000).toLocaleString('vi-VN')}đ</div>

                    <div className="cart-item-price"> {(item.item.price*1000*item.number).toLocaleString('vi-VN')}đ </div>

                </Col>
            );
        })
        return(
        <Container>
            <Row>
                <Col md="12" className="cart-header"> Giỏ hàng của tôi </Col>
            </Row>
            <Row>
                {list}
            </Row>
            <Row>
                <Button className="cart-button"> 
                    Thanh toán 
                    <div className="cart-total"> {(total*1000).toLocaleString('vi-VN')}đ </div>
                </Button>
            </Row>
        </Container>
        )}
}

export default ViewCart;