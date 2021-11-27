import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


function CreateAnAppointment() {
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    return (
        <Container>
            <div class='dung-title'> 
                <h1>Tạo lịch khám</h1>
                <hr />
            </div>
            <div class='dung-button-createappointment'>
                <Link to='/instant_appointment'>
                    <Button className="dung cart-button"> 
                        Lịch khám tức thời
                    </Button>
                </Link>     
            </div>
            <div class='dung-button-createappointment aa'>
                <Link to='/re-examination_schedule'>
                    <Button className="dung cart-button"> 
                        Lịch tái khám
                    </Button>
                </Link>
            </div>
        </Container>
    );
}

export default CreateAnAppointment;