import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button,Container, Row, Col, Table, Nav, NavItem, NavLink, TabContent, TabPane, Form, Input, FormGroup, Label,FormText} from 'reactstrap';


function Re_examinationSchedule() {
    const [value1, onChange] = useState(new Date());
    const [value, setValue] = useState('');

    const handleChange = (event)=>{
        setValue(event.target.value)
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
    }

    return (
        <Container>
            <div class='dung-title'> 
                <h1>Lịch tái khám</h1>
                <hr />
            </div>
            <div class='dung-form-taolich'>

                <Form>

                    <FormGroup>
                        <Label for="examplePhone">
                        Phone
                        </Label>
                        <Input
                        id="examplephone"
                        name="phone"
                        type="phone"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleDate">
                        Date
                        </Label>
                        <Input
                        id="exampleDate"
                        name="date"
                        placeholder="date placeholder"
                        type="date"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleTime">
                        Time
                        </Label>
                        <Input
                        id="exampleTime"
                        name="time"
                        placeholder="time placeholder"
                        type="time"
                        />
                    </FormGroup>
                    <Button>
                        Submit
                    </Button>
                    </Form>
            </div>
        </Container>
    );
}

export default Re_examinationSchedule;



{/* <form onSubmit={handleSubmit}>
    <label>
    Số điện thoại:
    <input type="text" value={''} onChange={handleChange} />
    </label>
    <br />
    <label>
    Ngày/Tháng/Năm:
    <input type="text" value={''} onChange={handleChange} />
    </label>
    <br />
    <label>
    Thời gian:
    <input type="text" value={''} onChange={handleChange} />
    </label>
    <br />
    <input type="submit" value="Submit" />
</form> */}




{/* <FormGroup>
<Label for="exampleSelect">
Select
</Label>
<Input
id="exampleSelect"
name="select"
type="select"
>
<option>
    1
</option>
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
</Input>
</FormGroup> */}