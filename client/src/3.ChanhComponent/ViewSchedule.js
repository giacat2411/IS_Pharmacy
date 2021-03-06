import React, { Component } from 'react';
import { Button, Container, ModalBody, Table, ModalHeader, ModalFooter } from 'reactstrap';
import { FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import ToastServive from 'react-material-toast';
import addDays from 'date-fns/addDays';
import HeaderDefine from '../5.Share Component/Context';
import { Switch, Redirect } from 'react-router';
import { Input, Modal, Row, Col } from 'reactstrap';
import DoctorSideBar from '../5.Share Component/SideBar/DoctorSideBarComponent';
import { Spinner } from 'reactstrap';

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
            doctors_phone: [],

            work_schedule: [],
            work_schedules: [],
            registering: {},
            curr: {},
            toDelete:{},
            current_day: (new Date((+(new Date())) + 3600000 * 7)).toUTCString(),
            thu: 2,
            curr_thu: 2,
            add: false,
            confirm: false,
        }
        this.temp = {phone: '', day: '2', session: 'S'}
    }
    toggleAdd() {
        this.setState({ add: !this.state.add })
    }
    toggleConfirm() {
        this.setState({ confirm: !this.state.confirm })
    }
    componentDidMount() {
        this.setState({ phone: this.context.phone })
        axios.get('https://mysql-healthcare.herokuapp.com/api/get/work_schedules')
            .then(res => {
                const work_schedules = res.data;
                console.log(work_schedules);
                this.setState({ work_schedules: work_schedules.work_schedules.filter(x => { return x.end_day === null }) });
                this.setState({ work_schedule: work_schedules.work_schedules.filter(x => { return x.end_day === null }).filter(w => w.work_day == 2) });

                const today = new Date();
                this.setState({ current_day: new Date(today.getTime() - 86400000*(today.getDay()-1))})
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

        axios.get('https://mysql-healthcare.herokuapp.com/api/get/doctors')
            .then(res => {
                const system_users = res.data.doctors.map(x => { return x.phone });
                this.setState({ doctors_phone: system_users });
                console.log(system_users)
            })
            .catch(error => console.log(error));
    }
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

    setEnd = (x) => {
        axios.post('https://mysql-healthcare.herokuapp.com/api/set/end-schedule', { params: x }).then(
            res=>{if(res.data.msg){toast.success("Th??nh c??ng");console.log(x);
            const newSchedules = this.state.work_schedules.filter(y => { return this.state.work_schedules.indexOf(x) !== this.state.work_schedules.indexOf(y) })
    
            const newSchedule = this.state.work_schedule.filter(y => { return this.state.work_schedule.indexOf(x) !== this.state.work_schedule.indexOf(y) })
    
            this.setState({ work_schedules: newSchedules, work_schedule: newSchedule })
            }
            else toast.error("Th???t b???i")}
        )

    }

    addSche() {
        console.log(this.temp)
        console.log(this.state.work_schedules);
        if (!this.state.doctors_phone.includes(this.temp.phone.toString()))
            toast.error('Kh??ng t???n t???i b??c s??');
        else if (this.state.work_schedules.filter(x => {
            return (x.doctor_phone.toString() === this.temp.phone.toString()
                && x.work_day.toString() === this.temp.day.toString()
                && x.work_session.toString() === this.temp.session.toString())
        }).length !== 0)
            toast.error('???? t???n t???i l???ch l??m vi???c');
        else {
            axios.post('https://mysql-healthcare.herokuapp.com/api/insert/schedule', { params: this.temp })
            axios.get('https://mysql-healthcare.herokuapp.com/api/get/work_schedules')
            .then(res => {
                const work_schedules = res.data;
                console.log(work_schedules);
                this.setState({ work_schedules: work_schedules.work_schedules.filter(x => { return x.end_day === null }) });
                this.setState({ work_schedule: work_schedules.work_schedules.filter(x => { return x.end_day === null }) });
            })
            .catch(error => console.log(error));
            this.toggleAdd();
        }
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
                    {(new Date(this.state.current_day)).toISOString().split('T')[0].split("-").reverse().join("/")}
                </td>
                <td>
                    {x.work_session}
                </td>
                <td>
                    <Button color='danger' hidden={this.context.role !== "Doctor"}  onClick={(e) => this.setState({show:true,toDelete:x})}>X??a l???ch n??y</Button>

                </td>
            </tr>
        )
        )
    };
    render() {
        // if (this.context.role !== "Doctor") return <Switch> <Redirect to={`/${this.context.role}`} /></Switch>
        const spinner = <Row style={{textAlign: 'center'}}> <Col><Spinner></Spinner></Col> </Row>
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";
    
        return (
            <>
                {this.context.role === "Doctor" ? <DoctorSideBar /> : <span></span>}
                <Container id='dung-appointment'>
                    <Row>
                        <Col class='dung-title' style={{ textAlign: 'center' }}>
                            <h1>L???ch l??m vi???c</h1>
                            <hr />
                        </Col>
                    </Row>

                    <Row style={{ textAlign: 'center' }}>
                        <Col class='dung-thu'>
                            <button class='dung-button-thu' value={2} onClick={this.handleClick}>Monday</button>
                            <button class='dung-button-thu' value={3} onClick={this.handleClick}>Tuesday</button>
                            <button class='dung-button-thu' value={4} onClick={this.handleClick}>Wednesday</button>
                            <button class='dung-button-thu' value={5} onClick={this.handleClick}>Thursday</button>
                            <button class='dung-button-thu' value={6} onClick={this.handleClick}>Friday</button>
                            <button class='dung-button-thu' value={7} onClick={this.handleClick}>Saturday</button>
                            <button class='dung-button-thu' value={8} onClick={this.handleClick}>Sunday</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col class='dung-appointment-table'>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>
                                            B??c s??
                                        </th>
                                        <th>
                                            S??? ??i???n tho???i
                                        </th>
                                        <th>
                                            Ng??y/Th??ng/N??m
                                        </th>
                                        <th>
                                            Bu???i
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
                            {this.listWork().length === 0 ? spinner : <span />}
                            <Row style={{ textAlign: 'center' }}>
                                <Col>
                                    <Button class='chanh-button-view' hidden={this.context.role !== "Doctor"}
                                        onClick={(e) => this.toggleAdd()}
                                        style={{
                                            backgroundColor: '#62AFFC',
                                            border: '0px'
                                        }}>
                                        Th??m b??c s??? tr???c
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                    <Modal isOpen={this.state.add} toggle={(e) => this.toggleAdd()}>
                        <ModalHeader> L???ch tr???c </ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row style={{ marginBottom: '15px' }}>
                                    <Col md="4"> S??? ??i???n tho???i </Col>
                                    <Col md="8">
                                        <Input name="phone" onChange={(e) => { this.temp.phone = e.target.value }} required />
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '15px' }}>
                                    <Col md="4">
                                        Ng??y tr???c T??? 2-8
                                    </Col>
                                    <Col md="8">
                                        <Input onChange={(e) => { this.temp.day = e.target.value }} required
                                            id="exampleSelect"
                                            name="select"
                                            type="select"
                                        >
                                            <option>
                                                2
                                            </option>
                                            <option>
                                                3
                                            </option>
                                            <option>
                                                4
                                            </option>
                                            <option>
                                                5
                                            </option>
                                            <option>
                                                6
                                            </option>
                                            <option>
                                                7
                                            </option>
                                            <option>
                                                8
                                            </option>
                                        </Input>
                                        {/* <Input name="day" defaultValue={this.state.curr_thu} onChange={(e) => { this.temp.day = e.target.value }} required /> */}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '15px' }}>
                                    <Col md="4">
                                        Bu???i S/C
                                    </Col>
                                    <Col md="4">
                                        <FormGroup check>
                                            <Input onClick={() => { this.temp.session = "S" }}
                                                name="radio2"
                                                type="radio"
                                            />
                                            {' '}
                                            <Label check>
                                                S
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md="4">
                                        <FormGroup check>
                                            <Input onClick={() => { this.temp.session = "C" }}
                                                name="radio2"
                                                type="radio"
                                            />
                                            {' '}
                                            <Label check>
                                                C
                                            </Label>
                                        </FormGroup>
                                        {/* <DropdownMenu/> */}
                                        {/* <Input name="session" onChange={(e) => { this.temp.session = e.target.value }} required /> */}
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Container>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col md="6">
                                        <button style={{
                                            backgroundColor: '#62AFFC',
                                            border: '0px', color: 'white'
                                        }} 
                                            class='chanh-button-view' type="button" onClick={(e) => this.addSche()}>Th??m</button>
                                    </Col>
                                    <Col md="6">
                                        <button style={{
                                            backgroundColor: '#62AFFC',
                                            border: '0px', color: 'white'
                                        }}
                                            class='chanh-button-view' type="button" onClick={(e) => this.toggleAdd()}>H???y</button>
                                    </Col>
                                </Row>
                            </Container>
                        </ModalFooter>
                    </Modal>
                </Container>
                <div className={showHideClassName}>
                        <section className="modal-main">
                            <div class='dung-logomini'>
                                <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
                            </div>      
                            <p>X??c nh???n x??a</p>
                            <button type="button" onClick={(e) => { this.setState({show:false}) }}>
                                H???y
                            </button>

                            <button type="button" onClick={(e) => {this.setState({show:false}); this.setEnd(this.state.toDelete); }}>
                                X??c nh???n
                            </button>

                        </section>
                    </div>
            </>
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
        <p>B???n c?? ch???c ch???n v??? s??? l???a ch???n c???a m??nh?</p>
        <button type="button" onClick={props.toggle}>
            H???y
        </button>

        <button type="button" onClick={(e) => { props.submit(); props.toggle(); }}>
            X??c nh???n
        </button>
    </section>
}
