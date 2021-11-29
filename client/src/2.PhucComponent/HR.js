import React, {Component} from 'react';
import { Container, Table,} from 'reactstrap';
import axios from 'axios';
import { data } from 'jquery';
import { Modal } from 'reactstrap';
import { Input } from 'reactstrap';
import { CardHeader } from 'reactstrap';
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
        this.toggleDoctor=this.toggleDoctor.bind(this);
        this.toggleNurse=this.toggleNurse.bind(this);
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
    };

    setDoctor=()=>{
axios.post('/api/new/doctor',{params: {phone:this.state.newphone,specialism: this.state.newspec,
experience_year: this.state.newexp}})
var doc=this.state.doctor.push({phone:this.state.newphone, specialism:this.state.newspec,experience_year:this.state.newexp,activate:1});
        this.toggleDoctor();

    }
    setNurse=()=>{
        this.toggleNurse();
axios.post('/api/new/nurse',{params: {phone:this.state.newphone}})
    }
    delete=(phone,role)=>{
        axios.post('/api/delete/HR',{params:{phone: phone,role:role}});
        if(role==="DOCTOR") this.setState({doctor:this.state.doctor.filter(row=>row.activate===1)});
        else this.setState({nurse:this.state.nurse.filter(row=>row.activate===1)})
        
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
                        {this.state.doctor.filter(row=>row.activate===1).map(row=> {//console.log(row);
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
                    <td> <button class='chanh-button-view' type="button" onClick={(e)=>{row.activate=false; this.delete(row.phone,"DOCTOR")}}>X</button>               
                    </td>
                </tr>
                        ); } )  }                               
                    </tbody>
                </Table>
                <button class='chanh-button-view' type="button" onClick={this.toggleDoctor}>Thêm bác sỹ</button>               
                    
                <Modal isOpen={this.state.modalDoctor}toggle={(e)=>this.toggleDoctor()}>
                    <CardHeader>Thêm bác sỹ </CardHeader>
                Số điện thoại
                <Input name="phone" onChange={(e)=>{this.setState({newphone:e.target.value})}} required />
                Chuyên ngành
                <Input name="spec" onChange={(e)=>{this.setState({newspec:e.target.value})}} required />
                Kinh nghiệm
                <Input name="exp" onChange={(e)=>{this.setState({newexp:e.target.value})}} required />
                        
                {/* <Input name="phone" innerRef={(input) => this.setState({newphone:input})} required />
                <Input name="text" innerRef={(input) => this.setState({newspec:input})} required />
                <Input name="number" innerRef={(input) => this.setState({newexp:input})} required /> */}
                 <button class='chanh-button-view' type="button" onClick={(e)=>this.setDoctor()}>Xác nhận</button> 
                </Modal>
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
                    
                        {this.state.nurse.map(nurse=> <tr> <td> {nurse.phone}</td><td> <button class='chanh-button-view' type="button" onClick={(e)=>{nurse.activate=false; this.delete(nurse.phone,"NURSE")}}>X</button>               
                    </td></tr>)}
                                
                    </tbody>
                </Table>
                </div>
                <button class='chanh-button-view' type="button" onClick={(e)=>this.toggleNurse()}>Thêm điều dưỡng</button>               
                
                <Modal isOpen={this.state.modalNurse}toggle={(e)=>this.toggleNurse()}>
                    <input type='phone' onChange={(event)=>this.setState({newphone:event.target.value})} >Số điện thoại</input>
                <button class='chanh-button-view' type="button" onClick={(e)=>this.setNurse()}>Thêm một bác sỹ</button> 
                </Modal>
            </Container>
        )
    }
}

export default HR;