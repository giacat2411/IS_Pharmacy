import React, {Component} from 'react';
import { Container, Row, Col, Table, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { Button } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle} from 'reactstrap';
import Modal from './Modal.js';

class AppointmentTable extends Component {
    constructor() {
        super();
        this.state = {
          show: false
        };
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
        return(
            <Container>
                <Table hover>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Bác sĩ
                            </th>
                            <th>
                                Số điện thoại
                            </th>
                            <th>
                                Ngày/Tháng/Năm
                            </th>
                            <th>
                                Thời gian
                            </th>
                            <th>
                                Trạng thái
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                1
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <Modal show={this.state.show} handleClose={this.hideModal}>
                                    <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                                </Modal>                      
                                <button class='dung-button-dangky' type="button" onClick={this.showModal}>Đăng ký</button>            
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                2
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <Modal show={this.state.show} handleClose={this.hideModal}>
                                    <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                                </Modal>                      
                                <button class='dung-button-dangky' type="button" onClick={this.showModal}>Đăng ký</button> 
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                3
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <Modal show={this.state.show} handleClose={this.hideModal}>
                                    <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                                </Modal>                      
                                <button class='dung-button-dangky' type="button" onClick={this.showModal}>Đăng ký</button> 
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                4
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                5
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                6
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                7
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                8
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                9
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                10
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                11
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                12
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                13
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                14
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                @mdo
                            </td>
                            <td>
                                <button class='dung-button-dangky'>Đăng ký</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default AppointmentTable;