import React, { Component } from 'react';
import { Button, Container, DropdownMenu, Table } from 'reactstrap';
import axios from 'axios';
import { FaPencilAlt } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";
import ToastServive from 'react-material-toast';
import addDays from 'date-fns/addDays';
import HeaderDefine from '../5.Share Component/Context';
import { Switch, Redirect } from 'react-router';
import { Input, Modal } from 'reactstrap';
const toast = ToastServive.new({
    place: 'bottomLeft',
    duration: 2,
    maxCount: 8
});

class ScheduleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            show: false,

            work_schedule: [],
            work_schedules: [],
            registering: {},
            curr: {},

            current_day: (new Date((+(new Date())) + 3600000 * 7)).toUTCString(),
            thu: 2,
            curr_thu: 2,
            add: false,
            confirm: false,
        }
        this.temp = {}
    }
    toggleAdd() {
        this.setState({ add: !this.state.add })
    }
    toggleConfirm() {
        this.setState({ confirm: !this.state.confirm })
    }
    componentDidMount() {
        this.setState({ phone: this.context.phone })
        axios.get('/api/get/work_schedules')
            .then(res => {
                const work_schedules = res.data;
                this.setState({ work_schedules: work_schedules.work_schedules });
                this.setState({ work_schedule: work_schedules.work_schedules });
            })
            .catch(error => console.log(error));
        let currentDay = (new Date((+(new Date())) + 3600000 * 7)).toUTCString().split(' ');
        const days = ['Mon,', 'Tue,', 'Wed,', 'Thu,', 'Fri,', 'Sat,', 'Sun,'];
        for (let i = 0; i < days.length; ++i) {
            if (days[i] == currentDay[0]) {
                this.setState({ thu: i + 2, curr_thu: i + 2 });
                break;
            }
        }
    }
    componentDidUpdate(){
        axios.get('/api/get/work_schedules')
            .then(res => {
                const work_schedules = res.data;
                this.setState({ work_schedules: work_schedules.work_schedules });
            })
            .catch(error => console.log(error));
    }
    // showModal = () => {
    //     this.setState({ show: true });
    // };

    // hideModal = () => {
    //     this.setState({ show: false });
    // };
    checkDate = (nw, curr) => {
        return nw.split(' ')[1] == curr.split(' ')[1] && nw.split(' ')[2] == curr.split(' ')[2] && nw.split(' ')[3] == curr.split(' ')[3]
    }



    handleClick = (event) => {
        const begin = "Mon, 5 Jul 2021";
        const end = "Sun, 11 Jul 2021";
        const new_Work_schedule = this.state.work_schedules.filter(w => w.work_day == event.target.value);//&&(Number(w.turn_time.split(' ').splice(1,1))>=5&&Number(w.turn_time.split(' ').splice(1,1))<=11))
        const curr = addDays(new Date((new Date((+(new Date())) + 3600000 * 7))), (event.target.value - this.state.thu)).toUTCString()
        this.setState({ current_day: curr })

        this.setState({ work_schedule: new_Work_schedule, curr_thu: event.target.value });
    }
    // handleDeleteInsert = (event) =>{
    //     event.preventDefault();
    //     this.setState({registering:{}});
    // }

    // handleInsertSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post('/api/insert/treatment_turns', this.state.registering)
    //     .then(res => {
    //         let news = this.state.treatment_turns;
    //         news = [this.state.registering,...news];
    //         this.setState({ treatment_turns: news });
    //         this.setState({registering:{}});


    //         const new_Work_schedule=this.state.work_schedules.filter(w=>w.work_day==this.state.thu);//&&(Number(w.turn_time.split(' ').splice(1,1))>=5&&Number(w.turn_time.split(' ').splice(1,1))<=11))
    //         })
    //     .catch(error => console.log(error));

    //   };
    //   onClickSuccess = () => {
    //     const id = toast.success('Đăng ký thành công!',()=>{
    //     });
    // };
    setEnd = (x) => {
        axios.post('/api/set/end-schedule', { params: x })
    }
    addSche() {
        axios.post('/api/insert/schedule', { params: this.temp })
        this.toggleAdd();
    }

    listWork = () => {

        return this.state.work_schedule.map((x, index) => (
            <tr>
                <th scope="row">
                    {/* {++dem} */}
                    {index + 1}
                </th>
                <td>
                    {x.lastname + ' ' + x.firstname}
                </td>
                <td>
                    {x.doctor_phone}
                </td>
                <td>
                    {this.state.current_day.split(' ').splice(1, 3).join('/')}
                </td>
                <td>
                    {x.session}
                </td>
                <td>
                    <Modal isOpen={this.state.confirm} toggle={this.state.toggleConfirm}>
                        <Confirm submit={(this.state.add) ? this.addSche : this.setEnd} toggle={this.state.toggleConfirm} />
                    </Modal>
                    {/* </div> */}
                    {this.state.curr_thu >= this.state.thu ?
                        <FaPencilAlt /> : <MdLockClock />}
                    <Button onClick={(e) => this.setEnd(x)}>Xóa lịch này</Button>
                </td>
            </tr>
        )
        )
    };
    render() {
        // if (this.context.role !== "Doctor") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        
        return (
            <Container id='dung-appointment'>
                <div class='dung-title'>
                    <h1>Lịch làm việc</h1>
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
                                    Buổi
                                </th>
                                <th>

                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {this.listWork().flat()}
                            {console.log(this.state.current_day)}
                        </tbody>
                    </Table>



                    <button class='chanh-button-view' type="button" onClick={(e) => this.toggleAdd()}>Thêm bác sỹ trực</button>
                    <Modal isOpen={this.state.add} toggle={(e) => this.toggleAdd()}>
                        Số điện thoại
                        <Input name="phone" onChange={(e) => { this.temp.phone = e.target.value }} required />
                        Ngày trực Từ 2-8
                        <Input name="day" defaultValue={this.state.curr_thu} onChange={(e) => { this.temp.day = e.target.value }} required />
                        Buổi S/C
                        {/* <DropdownMenu/> */}
                        <Input name="session" onChange={(e) => { this.temp.session = e.target.value }} required />
                        <button class='chanh-button-view' type="button" onClick={(e) => this.addSche()}>Thêm</button>
                        <button class='chanh-button-view' type="button" onClick={(e) => this.toggleAdd()}>Hủy</button>
                    </Modal>
                </div>
            </Container>
        )
    }
}
ScheduleTable.contextType = HeaderDefine;

export default ScheduleTable;



const Confirm = (props) => {
    <section className="modal-main">
        <div class='dung-logomini'>
            <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
        </div>
        <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
        <button type="button" onClick={props.toggle}>
            Hủy
        </button>

        <button type="button" onClick={(e) => { props.submit(); props.toggle(); }}>
            Xác nhận
        </button>
    </section>
}
