import React, { Component } from 'react';
import { Container, PaginationLink, PaginationItem, Pagination } from 'reactstrap';
import axios from 'axios';
import ToastServive from 'react-material-toast';

import { Link } from 'react-router-dom';
import { Input, Button } from 'reactstrap';
// import HeaderDefine from '../5.Share Component/Context'
// import { spacing } from 'react-select/dist/declarations/src/theme';

//curr_thu: i+3 
//current_day: addDays(new Date(), 1).toUTCString(),
const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});


class ViewMedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: localStorage.getItem("med_phone"),// this.props.phone,
            treatment_turn: [{}],
            system_user: {},
            // treatment_turns:[],
            // system_users:[],
        }

    }

    componentDidMount() {
        axios.get('/api/get/mytreatment', { params: { phone: this.state.phone } }).then(
            res => { this.setState({ treatment_turn: res.data }); console.log(this.state.treatment_turn) }
        )
            .catch(error => console.log(error));

        // await  axios.get('/api/get/treatment_turns')
        // .then(res => {
        // const treatment_turns = res.data;
        // this.setState({ treatment_turns: treatment_turns.treatment_turns});
        // })
        // .catch(error => console.log(error));


        axios.get('/api/get/info', { params: { phonenum: this.state.phone } }).then(res => this.setState({ system_user: res.data.user }))
            .catch(error => console.log(error));

        // axios.get('/api/get/system_users')
        // .then(res => {
        // const system_users = res.data;
        // this.setState({ system_users: system_users.system_users});

        // let new_Treatment_turn=this.state.treatment_turns.filter(x=> x.patient_phone==this.state.phone);

        // const new_System_user=this.state.system_users.filter(x=> x.phone == this.state.phone);
        // this.setState({ treatment_turn: new_Treatment_turn, system_user:new_System_user });
        // })
        // .catch(error => console.log(error));
    };



    render() {

        return (
            <Container id='dung-benhan'>
                <div class='dung-title'>
                    <h1>Bệnh án</h1>
                    <hr />
                </div>

                <div class=''>
                    {
                        this.state.treatment_turn.map((x, index) => {
                            if ((+(new Date(x.start_time))) < (+(new Date()))) {
                                return (
                                    <div class='dung-tachdiv'>
                                        <h2>ID: {x.id}</h2>
                                        <h4 class='dung-benhnhan'>Bệnh nhân: {this.state.system_user.lastname + this.state.system_user.firstname}</h4>
                                        <div class='dung-thongtin'>
                                            <p>Ngày sinh: {this.state.system_user.dateofbirth}</p>
                                            <p>Lịch hẹn: {x.turn_time}</p>
                                            <p>Vấn đề sức khỏe: {x.health_issue}</p>
                                            <p>Huyết áp: {x.blood_pressure}</p>
                                            <p>Nhịp tim: {x.heart_beat}</p>
                                            <p>Chẩn đoán: {x.diagnose}</p>
                                            <p>Phương pháp điều trị: {x.therapy}</p>
                                            <p>Thời điểm bắt đầu {x.start_time}</p>
                                            <p>Thời điểm kết thúc:{x.end_time}</p>
                                            <p>Bác sĩ khám bệnh: {x.doctor_phone}</p>
                                            <Link to={`/prescribe-med/${JSON.stringify(x.prescribe_id)}/${JSON.stringify(this.state.system_user.phone)}`}>
                                                <Button className='order-button' >
                                                    Đơn thuốc đã kê: {x.prescribe_id}
                                                </Button>
                                            </Link>

                                        </div>

                                    </div>
                                )
                            }
                        }
                        )
                    }
                </div>
            </Container>
        )
    }
}

export default ViewMedicalRecord;
