import React, {Component} from 'react';
import { Container, Row, Col, Table, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { Button } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle} from 'reactstrap';
import AppointmentTable from './AppointmentTableComponent';
import axios from 'axios';
import { FaPencilAlt } from "react-icons/fa";



class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: 943693315,
            show: false,

            treatment_turn:[],
            work_schedule:[],         
            system_user:[],

            treatment_turns:[],
            work_schedules:[],
            system_users:[],

            counter: 0,
            bug: [],
            registered:[]//"08:00:00-08:30:00","09:00:00-09:30:00","10:30:00-11:00:00","13:30:00-14:00:00","14:30:00-15:00:00","15:00:00-15:30:00","15:30:00-16:00:00","16:30:00-17:00:00"
            
        }
        this.handleClick=this.handleClick.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleInsertSubmit = this.handleInsertSubmit.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    handleClick =({target})=>{    
        const begin = "Mon, 5 Jul 2021";
        const end = "Sun, 11 Jul 2021";
        const new_Work_schedule=this.state.work_schedules.filter(w=>w.work_day==target.value);//&&(Number(w.turn_time.split(' ').splice(1,1))>=5&&Number(w.turn_time.split(' ').splice(1,1))<=11))
        let new_Treatment_turn=this.state.treatment_turns.filter(w=>new_Work_schedule.filter(nw=>w.doctor_phone==nw.doctor_phone)).flat()//w=>w.doctor_phone==new_Work_schedule[0].doctor_phone||new_Work_schedule[1]!==undefined&&w.doctor_phone==new_Work_schedule[1].doctor_phone
        if(target.value==2)
        {
            new_Treatment_turn=new_Treatment_turn.filter(nw=> nw.turn_time.split(' ')[1]=='5');
        }
        else if(target.value==3)
        {
            new_Treatment_turn=new_Treatment_turn.filter(nw=> nw.turn_time.split(' ')[1]=='6');
        }
        else if(target.value==4)
        {
            new_Treatment_turn=new_Treatment_turn.filter(nw=> nw.turn_time.split(' ')[1]=='7');
        }
        else if(target.value==5)
        {
            new_Treatment_turn=new_Treatment_turn.filter(nw=> nw.turn_time.split(' ')[1]=='8');
        }
        else if(target.value==6)
        {
            new_Treatment_turn=new_Treatment_turn.filter(nw=> nw.turn_time.split(' ')[1]=='9');
        }
        else if(target.value==7)
        {
            new_Treatment_turn=new_Treatment_turn.filter(nw=> nw.turn_time.split(' ')[1]=='10');
        }
        else if(target.value==8)
        {
            new_Treatment_turn=new_Treatment_turn.filter(nw=> nw.turn_time.split(' ')[1]=='11');
        }
        const new_System_user=this.state.system_users.filter(w=>new_Work_schedule.filter(nw=>w.phone==nw.doctor_phone));//w=>w.phone==new_Work_schedule[0].doctor_phone||new_Work_schedule[1]!==undefined&&w.phone==new_Work_schedule[1].doctor_phone
        this.setState({ counter: 0, treatment_turn: new_Treatment_turn, work_schedule: new_Work_schedule, system_user:new_System_user });

        

         //alert(this.state.work_schedule.map(turn=>turn.doctor_phone))
         //alert(this.state.treatment_turn.map(turn=>turn.start_time))
         //alert(new_System_user.map(turn=>turn.firstname))


        // const new_Work_schedule=this.state.work_schedules.filter(w=>w.work_day==2);
        // const new_Treatment_turn=this.state.treatment_turns;
        // const new_System_user=this.state.system_users.filter(w=>w.phone==new_Work_schedule[0].doctor_phone||w.phone==new_Work_schedule[1].doctor_phone)
        // this.setState({treatment_turn: new_Treatment_turn, work_schedule: new_Work_schedule, system_user: new_System_user });
        // alert(this.state.work_schedule.map(turn=>turn.doctor_phone))
        // alert(this.state.treatment_turn.map(turn=>turn.start_time))
        // alert(this.state.system_user.map(turn=>(turn.firstname+' '+turn.lastname)))
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
    };

    handleInsertSubmit = (event) => {
        event.preventDefault();
        const newItem = {
            id: Math.floor(Math.random() * 10000000), 
            turn_time: event.target.value.split(' ').splice(0,4).join(' ')+' '+event.target.value.split(' ').splice(-1,1).join().split('-')[0],
            health_issue: ' ', 
            blood_pressure: 1, 
            heart_beat: 1, 
            therapy: ' ', 
            diagnose: ' ', 
            start_time: event.target.value.split(' ').splice(0,4).join(' ')+' '+event.target.value.split(' ').splice(-1,1).join().split('-')[0], 
            end_time: event.target.value.split(' ').splice(0,4).join(' ')+' '+event.target.value.split(' ').splice(-1,1).join().split('-')[1],
            patient_phone: this.state.phone, 
            doctor_phone: event.target.name
        };
    
        axios.post('/api/insert/treatment_turns', newItem)
        .then(res => {
            let news = this.state.treatment_turns;
            news = [newItem,...news];
            this.setState({ treatment_turns: news });
        })
        .catch(error => console.log(error));
        
      };

    render(){
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
        const listMorning=["8:00:00-8:30:00","8:30:00-9:00:00","9:00:00-9:30:00","9:30:00-10:00:00","10:00:00-10:30:00","10:30:00-11:00:00"];
        const listAfternoon=["13:00:00-13:30:00","13:30:00-14:00:00","14:00:00-14:30:00","14:30:00-15:00:00","15:00:00-15:30:00","15:30:00-16:00:00","16:00:00-16:30:00","16:30:00-17:00:00"];
        const S=this.state.work_schedule.filter(turn=>turn.work_session=='S');
        const C=this.state.work_schedule.filter(turn=>turn.work_session=='C');
        let dem=0;
        const listS=S.map(curr=>listMorning.map((x,index)=>(
                    <tr>
                    <th scope="row">
                        {++dem}
                    </th>
                    <td>
                        {this.state.system_user.map(turn=>{if(curr.doctor_phone==turn.phone) {return turn.firstname+' '+turn.lastname}})}
                    </td>
                    <td>
                        {curr.doctor_phone}
                    </td>
                    <td>
                        {this.state.treatment_turn.length!==0&&this.state.treatment_turn[0].turn_time.split(' ').splice(1,3).join('/')||curr.work_day+2+"/Jul/2021"}
                    </td>
                    <td>
                        {x}
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
                                
                                <button type="button" value={(this.state.treatment_turn.length!==0&&this.state.treatment_turn[0].turn_time.split(' ').splice(0,4).join(' ')||curr.work_day+2+"/Jul/2021")+' '+x} name={curr.doctor_phone} onClick={(e)=>{this.hideModal(); this.handleInsertSubmit(e)}}>
                                    Xác nhận                                   
                                </button>
                                    
                            </section>
                        </div>       
                        {this.state.treatment_turn.filter(t=> t.doctor_phone==curr.doctor_phone &&t.turn_time.split(' ').splice(-1,1).join()==x.split('-')[0]).length!==0?<FaPencilAlt />:<button class='dung-button-dangky' type="button" onClick={this.showModal}>Đăng ký</button>}               
                    </td>
                </tr>
                ))
                ).flat()

                const listC=C.map(curr=>listAfternoon.map((x,index)=>(
                    <tr>
                    <th scope="row">
                        {++dem}
                    </th>
                    <td>
                        {this.state.system_user.map(turn=>{if(curr.doctor_phone==turn.phone) {return turn.firstname+' '+turn.lastname}})}
                    </td>
                    <td>
                        {curr.doctor_phone}
                    </td>
                    <td>
                        {this.state.treatment_turn.length!==0&&this.state.treatment_turn[0].turn_time.split(' ').splice(1,3).join('/')||curr.work_day+2+"/Jul/2021"}
                    </td>
                    <td>
                        {x}
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
                                <button type="button" value={(this.state.treatment_turn.length!==0&&this.state.treatment_turn[0].turn_time.split(' ').splice(0,4).join(' ')||curr.work_day+2+"/Jul/2021")+' '+x} name={curr.doctor_phone} onClick={(e)=>{this.hideModal(); this.handleInsertSubmit(e)}}>
                                    Xác nhận                                   
                                </button>
                                    
                            </section>
                        </div>                     
                        {this.state.treatment_turn.filter(t=> t.doctor_phone==curr.doctor_phone &&t.turn_time.split(' ').splice(-1,1).join()==x.split('-')[0]).length!==0?<FaPencilAlt />:<button class='dung-button-dangky' type="button" onClick={this.showModal}>Đăng ký</button>}               
                    </td>
                </tr>
                ))
                ).flat()
            
        
        return(
            <Container id='dung-appointment'>
                <div class='dung-title'> 
                    <h1>Đặt lịch khám</h1>
                    <hr />
                </div>

                <div class='dung-thu'>
                    <button class='dung-button-thu' value={2} onClick={this.handleClick}>Monday</button>
                    <button class='dung-button-thu' value={3} onClick={this.handleClick}>Tuesday</button>
                    <button class='dung-button-thu' value={4} onClick={this.handleClick}>Wednesday</button>
                    <button class='dung-button-thu' value={5} onClick={this.handleClick}>Thursday</button>
                    <button class='dung-button-thu' value={6} onClick={this.handleClick}>Friday</button>
                    <button class='dung-button-thu' value={7} onClick={this.handleClick}>Saturday</button>
                    <button class='dung-button-thu' value={8} onClick={this.handleClick}>Sunday</button>
                </div>
                <div class='dung-appointment-table'>
                    <Table hover>
                    <thead className="dung-table">
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
                    {listS}
                    {listC}
                    </tbody>
                </Table>
                </div>
            </Container>
        )
    }
}

export default Appointment;

//                    <AppointmentTable />


        // const counterListS = this.state.work_schedule.filter(turn=>turn.work_session=='S');
        // const listS = () =>{
        //     counterListS.length!==0&& return(

        //     )
        // }




        // this.state.work_schedule.filter(turn=>turn.work_session=='C').length!==0&&["13:00:00-13:30:00","13:30:00-14:00:00","14:00:00-14:30:00","14:30:00-15:00:00","15:00:00-15:30:00","15:30:00-16:00:00","16:00:00-16:30:00","16:30:00-17:00:00"].map((x,index)=>(
        //     <tr>
        //     <th scope="row">
        //         {++this.state.counter}
        //     </th>
        //     <td>
        //         {this.state.system_user.map((turn,index)=>{if(index===1) {return turn.firstname+' '+turn.lastname}})}
        //     </td>
        //     <td>
        //         {this.state.work_schedule.map((turn,index)=>{if(index===1) {return turn.doctor_phone}})}
        //     </td>
        //     <td>
        //         xxx
        //     </td>
        //     <td>
        //         {x}
        //     </td>
        //     <td>
        //         <Modal show={this.state.show} handleClose={this.hideModal}>
        //             <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
        //         </Modal>                      
        //         {this.state.unregistered.filter(curr=>curr==x).length==0?<FaPencilAlt />:<button class='dung-button-dangky' type="button" onClick={this.showModal}>Đăng ký</button>}                     
        //     </td>
        // </tr>
        // ))