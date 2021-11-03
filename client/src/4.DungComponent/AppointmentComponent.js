import React, {Component} from 'react';
import { Container, Row, Col, Table, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { Button } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle} from 'reactstrap';
import AppointmentTable from './AppointmentTableComponent';

class Appointment extends Component {
    render(){
        function open(){
            
        }
        return(
            <Container id='dung-appointment'>
                <div class='dung-title'> 
                    <h1>Đặt lịch khám</h1>
                    <hr />
                </div>

                <div class='dung-button-thu'>
                    <Button
                        color="primary"
                        outline
                    >
                        Monday
                    </Button>
                    {' '}
                    <Button 
                        color="primary"
                        outline
                    >
                        Tuesday
                    </Button>
                    {' '}
                    <Button
                        color="primary"
                        outline
                    >
                        Wednesday
                    </Button>
                    {' '}
                    <Button
                        color="primary"
                        outline
                    >
                        Thursday
                    </Button>
                    {' '}
                    <Button
                        color="primary"
                        outline
                    >
                        Friday
                    </Button>
                    {' '}
                    <Button
                        color="primary"
                        outline
                    >
                        Saturday
                    </Button>
                    {' '}
                    <Button
                        color="primary"
                        outline
                    >
                        Sunday
                    </Button>
                </div>
                <div class='dung-appointment-table'>
                    <AppointmentTable />
                </div>
            </Container>
        )
    }
}

export default Appointment;