import React, {Component} from 'react';
import { Container, Table,} from 'reactstrap';
import axios from 'axios';
import { data } from 'jquery';
import { Modal } from 'reactstrap';

class HR extends Component {
    constructor() {
        super();
        this.state = {
          doctor:[],
          nurse:[],
          newphone:"",
          newspec:"",
          newexp:"",
          modalDoctor:false,
          modalNurse:false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteModal= this.deleteModal.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.delete=this.delete.bind(this);
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
    
    }
toggleDoctor(){
    this.setState({modalDoctor:!this.state.modalDoctor})
}
toggleNurse(){
    this.setState({modalNurse:!this.state.modalNurse})
}
    componentDidMount() {

        axios.get('/api/get/doctors')
        .then(res => {
        this.setState({ doctor:res.data.doctors});
        console.log(this.state.doctor);
        })
        .catch(error => console.log(error));
        
        axios.get('/api/get/nurse')
        .then(res => {
        this.setState({ nurse:res.data.nurse});
        })
        .catch(error => console.log(error));
    };

    handleInsertSubmit = (event) => {
        // axios.post('/api/insert/treatment_turns', newItem)
        // .then(res => {
        //     let news = this.state.treatment_turns;
        //     // news = [newItem,...news];
        //     this.setState({ treatment_turns: news });
        // })
        // .catch(error => console.log(error)); 
    };

    setDoctor=()=>{
        this.toggleDoctor();
axios.post('/api/new/doctor',{params: {phone:this.state.newphone,specialism: this.state.newspec,
experience_year: this.state.newexp}})
    }
    setNurse=()=>{
        this.toggleNurse();
axios.post('/api/new/nurse',{params: {phone:this.state.newphone}})
    }
    delete=(phone,role)=>{
        if(role==="DOCTOR") this.setState({doctor:this.state.doctor.filter(row=>row.phone!==phone)})
        else this.setState({nurse:this.state.nurse.filter(row=>row.phone!==phone)})
        axios.post('/api/delete/HR',{params:{phone: phone,role:role}});
    }
    render(){
        
        return(
            <Container id='dung-appointment'>
                <div class='dung-title'> 
                    <h1>Danh sách nhân sự</h1>
                    <hr />
                </div>

                <div class='dung-appointment-table'>
                    <Table Schedule>
                    <thead className="dung-table">
                        <tr>
                            <th>
                                Bác sĩ
                            </th>
                            <th>Chuyên ngành
                            </th>
                            <th>
                                Kinh nghiệm
                            </th>
                            <th>Xóa quyền</th>
                        </tr>
                    </thead>
                    <tbody className="dung-table-body">
                        {this.state.doctor.map(row=> {//console.log(row);
                            return(
                            <tr>
                    <td>
                        {row.phone}
                    </td>
                    <td>
                        {row.specialism}
                    </td>
                    <td>
                        {row.experience_year}
                    </td>
                    <td> <button class='chanh-button-view' type="button" onClick={(e)=>this.delete(row.phone,"DOCTOR")}>X</button>               
                    </td>
                </tr>
                        ); } )  }                               
                    </tbody>
                </Table>
                <button class='chanh-button-view' type="button" onClick={(e)=>this.toggleDoctor()}>X</button>               
                    
                </div>


                <div class='dung-appointment-table'>
                    <Table Schedule>
                    <thead className="dung-table">
                        <tr>
                            <th>
                                Điều dưỡng
                            </th>
                        </tr>
                    </thead>
                    <tbody className="dung-table-body">
                    
                        {this.state.nurse.map(nurse=> <tr> <td> {nurse.phone}</td><td> <button class='chanh-button-view' type="button" onClick={(e)=>this.delete(nurse.phone,"NURSE")}>X</button>               
                    </td></tr>)}
                        {/* <View show={this.state.show} handleClose={this.hideModal}>
                                    <SaveSchedule>
                                    </SaveSchedule>
                                </View>                      
                                <button class='chanh-button-view' type="button" onClick={this.showModal}>Xem chi tiết</button>
                                <Deleted deleted={this.state.deleted} handleClose={this.hideModal}>
                                    <p>Bạn có chắc chắn về sự lựa chọn của mình?</p>
                                </Deleted>  */}
                                
                    </tbody>
                </Table>
                </div>


                <Modal isOpen={this.state.modalDoctor}toggle={this.toggleDoctor}>
                    <input type='phone' onChange={(event)=>this.setState({newphone:event.target.value})} >Số điện thoại</input>
                <input type='text' onChange={(event)=>this.setState({newspec:event.target.value})} >Chuyên ngành</input>
                <input type='number' onChange={(event)=>this.setState({newexp:event.target.value})} >Kinh nghiệm</input>
                <button class='chanh-button-view' type="button" onClick={(e)=>this.setDoctor()}>Thêm một bác sỹ</button> 
                </Modal>
                <Modal isOpen={this.state.modalNurse}toggle={this.toggleNurse}>
                    <input type='phone' onChange={(event)=>this.setState({newphone:event.target.value})} >Số điện thoại</input>
                <button class='chanh-button-view' type="button" onClick={(e)=>this.setNurse()}>Thêm một bác sỹ</button> 
                </Modal>
            </Container>
        )
    }
}

export default HR;