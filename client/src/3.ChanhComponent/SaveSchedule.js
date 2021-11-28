import React, {Component} from 'react';
import { Container,Button} from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
class SaveSchedule extends Component {
  constructor() {
    super();
    this.state = {
      show:false,

      name:'Tran Duy Chanh',
      phoneNumber:'0900000000',
      date:'2022-01-01',
      time_start:'8:30 SA',
      time_end:'9:30 CH',


      patient:[],
      treatment_turn:[],
      work_schedule:[],         
      system_user:[],

      patient:[],
      treatment_turns:[],
      work_schedules:[],
      system_users:[],
      
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.Submit=this.Submit.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  hideModal = () => {
    this.setState({ show: false });
  };
  handleAdd=({evt})=> {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  }
  Submit=()=>{
    axios.post('/api/uplate/treatment_turns',{
      params:this.state
  })
  }
    render(){
      return(
        
        <Container>
          <label>
              Học và Tên:
              <input type='text' defaultValue={this.state.name} onChange={this.handleAdd} required/>
          </label>
          <br />
          <label>
              Số điện thoại:
              <input type='text' defaultValue={this.state.phoneNumber} onChange={this.handleAdd} required/>
          </label>
          <br />
          <label>
              Ngày/Tháng/Năm:
              <input type='date' defaultValue={'2022-01-01'} onChange={this.handleAdd} required/>
          </label>
          <br />
          <label>
              Thời gian bắt đầu:
              <input type='time' defaultValue={'08:30:00'} onChange={this.handleAdd} required/>
              
          </label>
          <br />
          <label>
              Thời gian kết thúc:
              <input type='time' defaultValue={'15:30:00'} onChange={this.handleAdd} required/>
          </label>
          <br />
          <Button  onClick={this.hideModal}> Hủy </Button>
          <Button onClick={this.Submit} type='submit' color="primary"> <NavLink className="detail-name" to='/Save'>Lưu thay đổi</NavLink></Button>
          </Container>
        )
    }
}
export default SaveSchedule;