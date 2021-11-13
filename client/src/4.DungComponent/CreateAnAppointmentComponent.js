import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Row, Col, Button } from 'reactstrap';
import Modal from './Modal.js';

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
                <a href='/appointment'>
                    <Button className="dung cart-button"> 
                        Lịch khám tức thời
                    </Button>
                </a>     
            </div>
            <div class='dung-button-createappointment aa'>
                <a href='/re-examination_schedule'>
                    <Button className="dung cart-button"> 
                        Lịch tái khám
                    </Button>
                </a>
            </div>
        </Container>
    );
}

export default CreateAnAppointment;