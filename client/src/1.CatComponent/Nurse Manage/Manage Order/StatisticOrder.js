import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Input, Button } from 'reactstrap';
import { Table } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { XAxis, YAxis, Tooltip, Legend, Line, LineChart, CartesianGrid } from 'recharts'
import './manage_order.css';
import axios from 'axios';
import NurseSideBar from '../../NurseSideBarComponent';

class StatisticOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_filter: [],
            orders_statistic: []
        }
        this.onInputTime = this.onInputTime.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get/total_value')
            .then(res => {
                const orders = res.data.data_statistic.map(order => {
                    const newOrder = order;
                    newOrder.created_date = new Date(order.created_date);
                    return newOrder;
                })
                this.setState({orders_statistic: orders});
            })
        .catch(error => console.log(error));
    }

    onInputTime() {
        const start_time = this.convertDate2(this.start_time.value);
        const end_time = this.convertDate2(this.end_time.value);

        const data = this.state.orders_statistic.filter(order => {
            const day = this.convertDate(order.created_date)
            if (this.compareDay(day, start_time) == true && this.compareDay(end_time, day) == true) return true;
            else return false
        })
        this.setState({order_filter: data.map(order => {order.created_date = this.convertDate(order.created_date); return order})})
    }

    compareDay(day1, day2) {
        day1 = day1.split("/").map(x => parseInt(x));
        day2 = day2.split("/").map(x => parseInt(x));

        if (parseInt(day1[2]) > parseInt(day2[2])) return true;
        else if (parseInt(day1[2]) < parseInt(day2[2])) return false;
        else if (parseInt(day1[1]) > parseInt(day2[1])) return true;
        else if (parseInt(day1[1]) < parseInt(day2[1])) return false;
        else if (parseInt(day1[0]) >= parseInt(day2[0])) return true;
        else return false;
    }

    convertDate(day) {
        let date = day.getDate();
        let month = day.getMonth() + 1;
        let year = day.getYear() + 1900;

        if (date < 10) date = "0" + date.toString();
        if (month < 10) month = "0" + month.toString();

        return date + "/" + month + "/" + year;
    }

    convertDate2(day) {
        day = day.split('-');
        return day[2] + "/" + day[1] + "/" + day[0];
    }

    render() {
        const orders_statistic = this.state.order_filter.map((order) => {
            return (
                <tr>
                <th scope="row">
                    {this.state.order_filter.indexOf(order) + 1}
                </th>
                <td>
                    {order.created_date}
                </td>
                <td>
                    {(order.total).toLocaleString('vi-VN')}đ
                </td>
                </tr>
        )}); 

        let total_money = 0;
        this.state.order_filter.map(order => {
            total_money += order["total"];
            return order;
        })

        const DataFormater = (number) => {
            return (number.toString().toLocaleString('vi-VN')+'đ')
          }

        return (
            <>
            <NurseSideBar />
            <Container>
                    <Row className="statistic-order-heading">
                        <Col md="4" className='statistic-order-header'> Thống kê đơn hàng </Col>
                        <Col md="8">
                        <Row>
                            <Col md="4">
                                <Input className="search-box" id="startTime" name="date" placeholder="Bắt đầu" type="date"
                                    innerRef={(input) => this.start_time = input} />
                            </Col>
                            <Col md="4">
                                <Input className="search-box" id="endTime" name="date" placeholder="Kết thúc" type="date"
                                    innerRef={(input) => this.end_time = input} />
                            </Col>
                            <Col md="4">
                                <Button className="search-statistic-button" style={{marginTop: '0px'}} onClick={this.onInputTime}>
                                    <FaSearch /> Tìm <span style={{textTransform: 'lowercase'}}> kiếm </span>
                                </Button>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Row> 
                        <Col className="total-money"> Tổng doanh thu: {total_money.toLocaleString('vi-VN')}đ </Col>
                    </Row>
                    
                    <Row className="total-money-chart">                
                        <LineChart width={730} height={250} data={this.state.order_filter}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="created_date" />
                            <YAxis tickFormatter={DataFormater}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#8884d8" />
                        </LineChart>
                        
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
                                    Ngày 
                                </th>
                                <th>
                                    Tổng tiền
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders_statistic}
                            </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default StatisticOrder;