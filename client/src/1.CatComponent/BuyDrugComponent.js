import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import axios from 'axios';

class BuyDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugs : [],
            carts: []
        }
    }

    componentDidMount() {
        axios.get('/api/get/drugs')
             .then(res => {
                const drugs = res.data;
                this.setState({ drugs: drugs.drugs });
                console.log(this.state.drugs)
              })
             .catch(error => console.log(error));
      };

      render(){
          const drug_list = this.state.drugs.map(drug => {
              return(
                <Col lg="2" md="3" sm="4">
                <Card className="drug-item">
                <img className="drug-img" width="91.98px" height="90px" src="/assets/images/view-home.png" alt = "Xem hồ sơ bệnh án"></img>
                <CardBody>
                <CardTitle tag="h5" className="drug-text">{drug.drug_name}</CardTitle>
                <CardSubtitle tag="h6" className="drug-title">500mg, Viên sủi</CardSubtitle>
                <CardText className="drug-price">{drug.price*1000}đ 
                    <span className="drug-add-item"> 
                        <img width="45.67px" height="45.67px" src="/assets/images/add-item.png" /> 
                    </span>
                </CardText> 
                
                </CardBody>
                </Card>
                </Col>
              )
          })
          return(
              <Container>
                  <Row>
                      {drug_list}
                  </Row>
              </Container>
          )
      }
}

export default BuyDrug;
