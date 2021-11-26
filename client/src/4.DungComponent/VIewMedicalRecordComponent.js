import React, {Component} from 'react';
import { Container, Row, Col, Table, Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Label} from 'reactstrap';
import { Button } from 'reactstrap';
import { Input, Card, CardText, CardBody, CardTitle} from 'reactstrap';
import AppointmentTable from './AppointmentTableComponent';
import axios from 'axios';
import { FaPencilAlt } from "react-icons/fa";
import { MdLockClock } from "react-icons/md";
import ToastServive from 'react-material-toast';
import addDays from 'date-fns/addDays';
import { Link } from 'react-router-dom';

const toast = ToastServive.new({
    place:'bottomLeft',
    duration:2,
    maxCount:8
  });

class MedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: 943693315,
            show: true,

            system_user:[],
            system_users:[],
            
            showtable: false
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get/system_users')
        .then(res => {
        const system_users = res.data;
        this.setState({ system_users: system_users.system_users});
        })
        .catch(error => console.log(error));
    };

    showModal = () => {
        this.setState({ showtable: true, show: false });
    };
    
    hideModal = () => {
        this.setState({ showtable: false, show: true });
    };

    handleChangePhone = (event) => {
        this.setState({phone : event.target.value});
      };

    handleSubmit = (event) => {

        if(this.state.system_users.filter(x=>x.phone==this.state.phone).length!==0)
        {
            const id = toast.success('Phone: ' + this.state.phone,()=>{
            });
            this.setState({showtable: true })
            this.showModal();
        }
        else
        {
            const id = toast.error('Not found phone: ' + this.state.phone,()=>{
            });
            this.setState({showtable: false })
        }
        event.preventDefault();
    };

    render(){
        const showButton = this.state.show? "display-block" : "display-none";
        const showTable = this.state.showtable? "display-block" : "display-none";
        return(
            <Container id='dung-viewmedicalrecord'>
                <div class='dung-title'> 
                    <h1>Xem hồ sơ bệnh án</h1>
                    <hr />
                </div>

                <div class='dung-form-taolich'>
    
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="examplePhone">
                            Nhập số điện thoại bệnh nhân:
                            </Label>
                            <Input
                            id="examplephone"
                            name="phone"
                            type="number"
                            onChange={this.handleChangePhone} required
                            />
                        </FormGroup>                     
                        <div className={showButton}>
                            <Button>
                                Tìm kiếm
                            </Button>
                        </div>

                        <div className={showTable}>
                            <div class='dung-button-createappointment'>
                                <Link to={`/profile/${JSON.stringify(this.state.phone)}`}>
                                    <Button className="dung cart-button benhan"> 
                                        Thông tin cá nhân
                                    </Button>
                                </Link>
                                <Link to='/'>
                                    <Button className="dung cart-button benhan nd"> 
                                        Bệnh án
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>

            </Container>
        )
    }
}


export default MedicalRecord;