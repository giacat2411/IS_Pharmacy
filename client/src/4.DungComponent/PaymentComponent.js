import React, { Component } from 'react';
import { Container, Row, Col, Button, Table } from 'reactstrap';
import Modal from './Modal.js';

class Payment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show: false,

        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    

    render(){
        let dem=0;
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";

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
            <div class='dung-title'> 
                <h1>Thanh toán</h1>
                <hr />
            </div>
            <Row>
                <h4>1. Thuốc theo đơn của bác sĩ:</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>
                                STT
                            </th>
                            <th>
                                Tên thuốc/hàm lượng
                            </th>
                            <th>
                                Đơn vị tính
                            </th>
                            <th>
                                Đơn giá
                            </th>
                            <th>
                                Số lượng
                            </th>
                            <th>
                                Thành tiền
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">
                            {++dem}
                        </th>
                        <td>
                            Efferalgan 500mg
                        </td>
                        <td>
                            Viên
                        </td>
                        <td>
                            3.000đ
                        </td>
                        <td>
                            5
                        </td>
                        <td>
                            15.000đ              
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            {++dem}
                        </th>
                        <td>
                            Efferalgan 500mg
                        </td>
                        <td>
                            Viên
                        </td>
                        <td>
                            3.000đ
                        </td>
                        <td>
                            5
                        </td>
                        <td>
                            15.000đ              
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" colspan="5">
                            Tổng cộng
                        </th>
                        
                        <td>
                            30.000đ              
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Row>
            <Row>
                <h4>2. Thuốc khác:</h4>
                {list}
            </Row>
            <Row>
                <h4>3. Tổng chi phí: {(total*1000).toLocaleString('vi-VN')}đ</h4>
            </Row>

                <div class='dung-phuongthuc'>
                <h4>Phương thức thanh toán</h4>
                <input type="radio" id="momo" name="wallet" value="Ví Momo" required />
                <label for="momo">Ví Momo</label>
                <input type="radio" id="zalopay" name="wallet" value="Ví ZaloPay" required />
                <label for="zalopay">Ví ZaloPay</label>
                </div>     

            <Row>    
            <div className={showHideClassName}>
                                    <section className="modal-main">
                                        <div class='dung-logomini'>
                                            <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                                        </div>
                                        <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                                        <button type="button" onClick={this.hideModal}>
                                            Hủy
                                        </button>
                                        
                                        <button type="button" onClick={this.hideModal}>
                                            Xác nhận                                   
                                        </button>
                                            
                                    </section>
                                </div>        
                <Button className="dung cart-button" onClick={this.showModal}> 
                    Thanh toán 
                </Button>
            </Row>

        </Container>
        )}
}

export default Payment;

{/* <input class='dung-button-vi' type="checkbox" onClick={this.showModal}>Ví Momo</input>    
<input class='dung-button-vi' type="radio" onClick={this.showModal}>Ví ZaloPay</input>   */}