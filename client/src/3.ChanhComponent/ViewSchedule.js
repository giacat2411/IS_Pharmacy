import React, {Component} from 'react';
import { Container, Table,} from 'reactstrap';
import View from './View.js';
import Deleted from './delete.js';
import SaveSchedule from './SaveSchedule.js';
import axios from 'axios';

class ScheduleTable extends Component {
    constructor() {
        super();
        this.state = {
          show: false,
          deleted:false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteModal= this.deleteModal.bind(this);
        this.handleClick=this.handleClick.bind(this);
      }
    
      showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false, deleted: false, });
      };
      deleteModal = () => {
        this.setState({ deleted: true });
      };
      handleClick =({target})=>{   
        const new_Work_schedule=this.state.work_schedules.filter(w=>w.work_day==target.value);
        let new_Treatment_turn=this.state.treatment_turns.filter(w=>new_Work_schedule.filter(nw=>w.doctor_phone==nw.doctor_phone)).flat()
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
        return(
            <Container id='dung-appointment'>
                <div class='dung-title'> 
                    <h1>Lịch Làm việc</h1>
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
                    <Table Schedule>
                    <thead className="dung-table">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Bác sĩ
                            </th>
                            <th>
                                Ngày/Tháng/Năm
                            </th>
                            <th>
                                Thời gian
                            </th>
                            <th>
                                Tên bệnh nhân   
                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody className="dung-table-body">
                        <tr>
                            <th scope="row">
                                1
                            </th>
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                            <td>

                            </td>
                            <td>
                                
                            </td>
                            <td>
                                <View show={this.state.show} handleClose={this.hideModal}>
                                    <SaveSchedule>
                                    </SaveSchedule>
                                </View>                      
                                <button class='chanh-button-view' type="button" onClick={this.showModal}>Xem chi tiết</button>
                                <Deleted deleted={this.state.deleted} handleClose={this.hideModal}>
                                    <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                                </Deleted> 
                                <button class='chanh-button-view' type="button" onClick={this.deleteModal}>Hủy lịch</button>           
                            </td>
                            

                        </tr>
                    </tbody>
                </Table>
                </div>
            </Container>
        )
    }
}

export default ScheduleTable;