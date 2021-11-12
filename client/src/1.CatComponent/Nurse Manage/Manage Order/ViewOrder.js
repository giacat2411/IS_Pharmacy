import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Table } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import Pagination from "pagination-component";
import NurseSideBar from '../../NurseSideBarComponent';
import './manage_order.css';

import axios from 'axios';

class ViewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orders_search: [],
            activePage: 1,
            nums_page: 1
        }
        this.onInputOrderID = this.onInputOrderID.bind(this);
        this.onToggleModal = this.onToggleModal.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get/orders')
            .then(res => {
                const orders = res.data.orders.map(order => {
                    const newOrder = order;
                    newOrder.created_date = new Date(order.created_date);
                    return newOrder;
                })
                this.setState({orders: orders, orders_search: orders});
            })
        .catch(error => console.log(error));
    }

    changePage(page) {
        this.setState({activePage: page});
    }

    onToggleModal(orderID, flag) {

    }

    onInputOrderID() {
        let id = this.state.orders.filter(order => {
            return order.id.toString().includes(this.search_item.value.toString())
        });
        let name = this.state.orders.filter(order => {
            return (order.full_name.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
            .replace(/Đ/g, 'D').toLowerCase()
            .includes(this.search_item.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase())) && !id.includes(order)
        });

        let search = [];

        if (id.length !== 0) 
        {
            search = id;
            if (name.length !== 0) search.push(name);
        } else if (name.length !== 0) 
        {
            search = name;
            if (id.length !== 0) search.push(id);
        }

        this.setState({orders_search: search, nums_page: Math.ceil(search.length/10)});
    }

    convertDate(day) {
        let date = day.getDate();
        let month = day.getMonth() + 1;
        let year = day.getYear() + 1900;

        if (date < 10) date = "0" + date.toString();
        if (month < 10) month = "0" + month.toString();

        return date + "/" + month + "/" + year;
    }

    render() {
        if (this.state.orders_search.length !== 0) 
        {
            let nums_page = Math.ceil(this.state.orders_search.length/10);
            if (nums_page !== this.state.nums_page)
                this.setState({nums_page: nums_page});
        }

        const display_order = this.state.orders_search.map((order) => {
            return (
                <tr>
                <th scope="row">
                    {this.state.orders_search.indexOf(order) + 1}
                </th>
                <td>
                    {order.full_name}
                </td>
                <td>
                    {order.id}
                </td>
                <td>
                    {this.convertDate(order.created_date)}
                </td>
                <td>
                    {(order.total).toLocaleString('vi-VN')}đ
                </td>
                <td>
                    <Button className='order-button' 
                            onClick={() => {this.onToggleModal(order.id, true);}}> 
                            Xem 
                    </Button>
                </td>
                </tr>
        )}); 

        let not_Found = <span></span>;
        if (display_order.length === 0) not_Found = <div className="not-found-search"> Không tìm thấy kết quả </div>
        else not_Found = <span></span>;
        
        let total = 0;

        // const details_open = this.props.model.orderDetailsOpen.map(detail => {
        //     total += detail.productPrice * detail.quantity;
        //     return (
        //         <tr>
        //         <th scope="row" style={{textAlign: 'center'}}>
        //             {this.props.model.orderDetailsOpen.indexOf(detail) + 1}
        //         </th>
        //         <td>
        //             {detail.itemName}
        //         </td>
        //         <td style={{textAlign: 'center'}}>
        //             {(detail.productPrice*23000).toLocaleString('vi-VN')}đ
        //         </td>
        //         <td style={{textAlign: 'center'}}>
        //             {detail.quantity}
        //         </td>
        //         <td style={{textAlign: 'right'}}>
        //             {(detail.total()*23000).toLocaleString('vi-VN')}đ
        //         </td>
        //         </tr>
        //     );
        // });

        // const order = this.props.model.orderOpen;

        const pageStyle = `{ size: 2.5in 4in }`;

        const containerStyle = (count) => {
            if (count > 100) return {marginLeft: '25vh'} 
            else if (count > 30) return {marginLeft: '34%'}
            else if (count > 20) return {marginLeft: '37.5%'}
            else return {marginLeft: '45%'}
            };
        
        const itemStyle = {
            float: "left",
            marginLeft: "5px",
            marginRight: "5px",
            backgroundColor: "#FFFAF7",
            color: "black",
            cursor: "pointer",
            width: "50px",
            textAlign: "center",
            borderRadius: "5px"
            };
        return (
            <>
            <NurseSideBar />
            <Container>
                    <Row className="manage-order-heading">
                        <Col className='manage-order-header'> Danh sách đơn hàng </Col>
                        <Col> 
                        <Row>
                            <Form className="search-bar" onSubmit={e => {e.preventDefault(); this.onInputOrderID()}}>
                                <FormGroup>
                                    <Input className="search-box" id="search" name="search-drugs" placeholder="Nhập đơn hàng"
                                    innerRef={(input) => this.search_item = input} />
                                </FormGroup>
                            </Form> 
                            <Button className="search-button" onClick={this.onInputOrderID}>
                                <FaSearch /> Tìm <span style={{textTransform: 'lowercase'}}> kiếm </span>
                            </Button>
                        </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {not_Found}
                            <Table responsive hover striped>
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Tên khách hàng
                                </th>
                                <th>
                                    Mã đơn hàng
                                </th>
                                <th>
                                    Ngày tạo đơn
                                </th>
                                <th>
                                    Tổng tiền
                                </th>
                                <th>
                                    Hành động
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_order.slice((this.state.activePage - 1) * 10,
                                    (this.state.activePage * 10))}
                            </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '10px', paddingBottom: '20px'}}>
                        <Col style={containerStyle(this.state.orders_search.length)}>
                        <Pagination className="health-panigation"
                            initialPage={1} show={10} 
                            pageCount={this.state.nums_page} 
                            onChange={page => this.changePage(page)}>
                        {({ setPage, page, index, currentPage, isPrev, isNext, isCurrentPage }) => {
                            if (isPrev)
                            return (
                                <div style={itemStyle} onClick={() => setPage({ prev: true })}>
                                {"<"}
                                </div>
                            );

                            if (isNext)
                            return (
                                <div style={itemStyle} onClick={() => setPage({ next: true })}>
                                {">"}
                                </div>
                            );

                            return (
                            <div className="healthcare-pagination-button"
                                key={index}
                                style={{ ...itemStyle, backgroundColor: isCurrentPage ? "#62AFFC" : "white" }}
                                onClick={() => {
                                console.log(`Navigating from page ${currentPage} to page ${page}`);
                                setPage({ page });
                                }}>
                                <h1 className="healthcare-pagination-number">{page}</h1>
                            </div>
                            );
                        }}
                        </Pagination>
                        </Col>
                    </Row>             
                {/* <Modal isOpen={this.props.model.isModalOpen} toggle={this.toggleModal} fullscreen ref={(el) => {this.componentRef = el}}>
                    <ModalBody>
                        <Container>
                            <Row style={{marginBottom: '30px'}}>
                                <Col md="8">
                                <img width="120px" height="41px" src='/assets/images/brand.png'/>
                                </Col>
                                <Col md="4" className="ms-auto">
                                <Button className="out-bill-button" onClick={() => this.toggleModal('1', false)}> X </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '30px'}}>
                                    HÓA ĐƠN
                                </Col>
                            </Row>
                            <Row> 
                                <Col>
                                    <span style={{fontWeight: 'bold'}}> Mã đơn hàng: </span>
                                    {order.orderID} 
                                </Col>
                            </Row>
                            <Row style={{marginTop: '8px'}}>
                                <Col> 
                                    <span style={{fontWeight: 'bold'}}> Tên khách hàng: </span> 
                                    Nguyễn Khoa Gia Cát {order.customerName}
                                </Col>
                                <Col>
                                    <span style={{fontWeight: 'bold'}}>Ngày đặt hàng: </span>
                                    {order.orderDate}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Table responsive hover striped style={{marginTop: '10px'}}>
                                <thead>
                                    <tr>
                                    <th style={{textAlign: 'center'}}>
                                        #
                                    </th>
                                    <th>
                                        Tên món ăn
                                    </th>
                                    <th style={{textAlign: 'center'}}>
                                        Đơn giá
                                    </th>
                                    <th style={{textAlign: 'center'}}>
                                        Số lượng
                                    </th>
                                    <th style={{textAlign: 'right'}}>
                                        Thành tiền
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details_open}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan="4" style={{textAlign: 'center'}}>
                                            Tổng cộng
                                        </th>
                                        <th style={{textAlign: 'right'}}>
                                            {(total*23000).toLocaleString('vi-VN')}đ
                                        </th>
                                    </tr>
                                </tfoot>
                                </Table>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col md="3" className='ms-auto'>
                                <ReactToPrint 
                                    trigger={() => <Button className="print-bill-button"> In hóa đơn </Button>}
                                    content={() => this.componentRef}
                                    pageStyle={pageStyle} />
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal> */}
            </Container> 
            </>
        )
    }
}

export default ViewOrder;