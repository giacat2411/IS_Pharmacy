import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Input, Button } from 'reactstrap';
import { Table } from 'reactstrap';
import { FaSearch } from 'react-icons/fa';
import { XAxis, YAxis, Tooltip, Legend, Line, LineChart, CartesianGrid } from 'recharts'
import './manage_order.css';
import axios from 'axios';
import NurseSideBar from '../../../5.Share Component/SideBar/NurseSideBarComponent';
import HeaderDefine from '../../../5.Share Component/Context';
import { Switch, Redirect } from 'react-router-dom';

class StatisticOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_filter: [],
            orders_statistic: [],
            orders_prescribe_statistic: [],
            orders_not_payment: [],
            not_pay: []
        }
        this.onInputTime = this.onInputTime.bind(this);
    }

    componentDidMount() {
        axios.get('https://mysql-healthcare.herokuapp.com/api/get/total_value')
            .then(res => {
                const orders = res.data.data_statistic.map(order => {
                    const newOrder = order;
                    newOrder.created_date = new Date(order.created_date);
                    return newOrder;
                })
                this.setState({ orders_statistic: orders });
                console.log(this.state.orders_statistic)
            })
            .catch(error => console.log(error));

        axios.get('https://mysql-healthcare.herokuapp.com/api/get/total_prescribe_value')
            .then(res => {
                const orders = res.data.data_statistic.map(order => {
                    const newOrder = order;
                    newOrder.created_date = new Date(order.created_date);
                    return newOrder;
                })
                this.setState({ orders_prescribe_statistic: orders });
                console.log(this.state.orders_prescribe_statistic)
            })
            .catch(error => console.log(error));

        axios.get('https://mysql-healthcare.herokuapp.com/api/get/not_total_prescribe_value')
            .then(res => {
                const orders = res.data.data_statistic.map(order => {
                    const newOrder = order;
                    newOrder.created_date = new Date(order.created_date);
                    return newOrder;
                })
                this.setState({ orders_not_payment: orders });
                console.log(this.state.orders_not_payment)
            })
            .catch(error => console.log(error));
    }

    onInputTime() {
        // console.log(this.state.orders_statistic)
        const start_time = this.convertDate2(this.start_time.value);
        const end_time = this.convertDate2(this.end_time.value);

        // console.log(this.state.orders_statistic)
        const data = this.state.orders_statistic.filter(order => {
            const day = this.convertDate(order.created_date)
            if (this.compareDay(day, start_time) === true && this.compareDay(end_time, day) === true) return true;
            else return false
        })

        const data2 = this.state.orders_prescribe_statistic.filter(order => {
            const day = this.convertDate(order.created_date)
            if (this.compareDay(day, start_time) === true && this.compareDay(end_time, day) === true) return true;
            else return false
        })

        const data3 = this.state.orders_not_payment.filter(order => {
            const day = this.convertDate(order.created_date)
            if (this.compareDay(day, start_time) === true && this.compareDay(end_time, day) === true) return true;
            else return false
        })

        const newData = data.map(order => { return { ...order, created_date: this.convertDate(order.created_date) } })
        const newData2 = data2.map(order => { return { ...order, created_date: this.convertDate(order.created_date) } })
        const newData3 = data3.map(order => { return { ...order, created_date: this.convertDate(order.created_date) } })
        // console.log(this.state.orders_statistic)

        let day = [];

        for (let i = 0; i < newData.length; i++)
            if (!day.includes(newData[i].created_date)) day.push(newData[i].created_date);

        for (let i = 0; i < newData2.length; i++)
            if (!day.includes(newData2[i].created_date)) day.push(newData2[i].created_date);
        // day = (newData.concat(newData2)).filter(x => {return !day.includes(x)}).map(x => x.created_date);

        const _order_filter = day.map(date => {
            const idx1 = newData.map(x => x.created_date).indexOf(date);
            const idx2 = newData2.map(x => x.created_date).indexOf(date);

            if (idx1 != -1 && idx2 != -1)
                return { created_date: date, "????n thu???c mua": newData[idx1].total, "????n thu???c k??": newData2[idx2].total }
            else if (idx1 == -1 && idx2 != -1)
                return { created_date: date, "????n thu???c mua": 0, "????n thu???c k??": newData2[idx2].total }
            else if (idx1 != -1 && idx2 == -1)
                return { created_date: date, "????n thu???c mua": newData[idx1].total, "????n thu???c k??": 0 }
            else return { created_date: date, "????n thu???c mua": 0, "????n thu???c k??": 0 }
        })

        console.log(_order_filter)
        // const total_data = newData.map(x => {
        //     const k = newD
        // })
        this.setState({ order_filter: _order_filter, not_pay: newData3 })
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
                        {(order["????n thu???c mua"]).toLocaleString('vi-VN')}??
                    </td>
                    <td>
                        {(order["????n thu???c k??"]).toLocaleString('vi-VN')}??
                    </td>
                    <td>
                        {(order["????n thu???c mua"] + order["????n thu???c k??"]).toLocaleString('vi-VN')}??
                    </td>
                </tr>
            )
        });

        let total_money = 0, prescribe = 0, purchase = 0;
        this.state.order_filter.map(order => {
            total_money += (order["????n thu???c k??"] + order["????n thu???c mua"]);
            prescribe += (order["????n thu???c k??"]);
            purchase += (order["????n thu???c mua"]);
            return order;
        })

        let money = 0;
        this.state.not_pay.map(order => {money += order.total; return order})
        

        const DataFormater = (number) => {
            return (number.toString().toLocaleString('vi-VN') + '??')
        }
        if (this.context.role !== "Nurse") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        return (
            <>
                <NurseSideBar />
                <Container>
                    <Row className="statistic-order-heading">
                        <Col md="4" className='statistic-order-header'> Th???ng k?? ????n h??ng </Col>
                        <Col md="8">
                            <Row>
                                <Col md="4">
                                    <Input className="search-box" id="startTime" name="date" placeholder="B???t ?????u" type="date"
                                        innerRef={(input) => this.start_time = input} />
                                </Col>
                                <Col md="4">
                                    <Input className="search-box" id="endTime" name="date" placeholder="K???t th??c" type="date"
                                        innerRef={(input) => this.end_time = input} />
                                </Col>
                                <Col md="4">
                                    <Button className="search-statistic-button" style={{ marginTop: '0px' }} onClick={this.onInputTime}>
                                        <FaSearch /> T??m <span style={{ textTransform: 'lowercase' }}> ki???m </span>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="total-money"> T???ng doanh thu: {total_money.toLocaleString('vi-VN')}?? </Col>
                        <Col className="total-money"> ????n thu???c mua: {purchase.toLocaleString('vi-VN')}?? </Col>
                        <Col className="total-money"> ????n thu???c k??: {prescribe.toLocaleString('vi-VN')}?? </Col>
                    </Row>
                    {this.state.not_pay.length !== 0 &&
                    <Row style={{marginTop: '-10px'}}>
                        <Col className="total-money"> C?? {this.state.orders_not_payment.length} ????n thu???c k?? ch??a thanh to??n, t???ng {money.toLocaleString('vi-VN')}?? </Col>
                    </Row>}

                    <Row className="total-money-chart">
                        <LineChart width={730} height={250} data={this.state.order_filter}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="created_date" />
                            <YAxis tickFormatter={DataFormater} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="????n thu???c mua" stroke="#8884d8" />
                            <Line type="monotone" dataKey="????n thu???c k??" stroke="#82ca9d" />
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
                                            Ng??y
                                        </th>
                                        <th>
                                            ????n thu???c mua
                                        </th>
                                        <th>
                                            ????n thu???c k??
                                        </th>
                                        <th>
                                            T???ng ti???n
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
StatisticOrder.contextType = HeaderDefine;
export default StatisticOrder;