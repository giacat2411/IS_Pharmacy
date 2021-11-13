import React, {Component} from 'react';
import { Container, Row, Col, Table, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { Button } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle} from 'reactstrap';
import Modal from './Modal.js';
import axios from 'axios';

class CancelAppointment extends Component {
    constructor() {
        super();
        this.state = {
            phone: 943693315,
            show: false,
            
            treatment_turn:[],
            work_schedule:[],         
            system_user:[],

            treatment_turns:[],
            work_schedules:[],
            system_users:[],
            register:[],
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }
    
      showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };

      handleClick=()=>{
        this.setState({treatment_turn: this.state.treatment_turns.filter(t=>t.patient_phone==this.state.phone)}); 
      }

      
      componentDidMount() {
        axios.get('/api/get/treatment_turns')
        .then(res => {
        const treatment_turns = res.data;
        this.setState({ treatment_turns: treatment_turns.treatment_turns});
        })
        .catch(error => console.log(error));


        axios.get('/api/get/work_schedules')
        .then(res => {
        const work_schedules = res.data;
        this.setState({ work_schedules: work_schedules.work_schedules});
        })
        .catch(error => console.log(error));


        axios.get('/api/get/system_users')
        .then(res => {
        const system_users = res.data;
        this.setState({ system_users: system_users.system_users});
        })
        .catch(error => console.log(error));

        this.setState({treatment_turn: this.state.treatment_turns.filter(t=>t.patient_phone==this.state.phone)}); 

    };

    handleDelete = (item) => {
        const newsId = {
          id: item.id
        };
      
        axios.post('/api/delete/treatment_turns', newsId)
        .then(res => {
          this.setState(prevState => ({
            treatment_turns: prevState.treatment_turns.filter(el => el.id !== item.id )
          }));
        })
        .catch(error => console.log(error));
      }

    render(){
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
        return(
            <Container>
                <div class='dung-title'> 
                    <h1>Hủy lịch khám</h1>
                    <hr />
                </div>
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
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.treatment_turn.map((x,index)=>(
                            <tr>
                            <th scope="row">
                                {index+1}
                            </th>
                            <td>
                                {this.state.system_users.map(turn=>{if(x.doctor_phone==turn.phone) {return turn.firstname+' '+turn.lastname}})}
                            </td>
                            <td>
                                {x.doctor_phone}
                            </td>
                            <td>
                                {x.turn_time.split(' ').splice(1,3).join('/')}
                            </td>
                            <td>
                                {x.start_time.split(' ').splice(-1,1).join()+'-'+x.end_time.split(' ').splice(-1,1).join()}
                            </td>
                            <td>  

                                <div className={showHideClassName}>
                                    <section className="modal-main">
                                        <div class='dung-logomini'>
                                            <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                                        </div>
                                        <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                                        <button type="button" onClick={this.hideModal}>
                                            Hủy
                                        </button>
                                        
                                        <button type="button" onClick={()=>{this.hideModal(); this.handleDelete(x)}}>
                                            Xác nhận                                   
                                        </button>
                                            
                                    </section>
                                </div>               
                                <button class='dung-button-dangky' type="button" onClick={this.showModal}>Hủy</button>          
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <div id='clickhere' class='hidden'>
                    <button class='dung cart-button btn btn-secondary' type="button" onClick={this.handleClick}>Click Here</button>
                </div>          
            </Container>
        )
    }
}

export default CancelAppointment;