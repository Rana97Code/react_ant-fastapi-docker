
import React, { Component, useState, useEffect  } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import {  Form, Input, Col, Row, Button, Modal, Upload, Typography  } from "antd";
import { UserOutlined, MailOutlined ,MobileOutlined, AreaChartOutlined  } from '@ant-design/icons';
const { Title } = Typography;

export default class RollModal extends Component {
  constructor(props) {
  super(props);
}

render(){
    return (
    <Modal
        title="My Modal"
        visible={this.props.visible}
        onOk={() => this.props.rollModal(false)}
        onCancel={() => this.props.rollModal(false)}
    >
        <Roll />        {/* Call the fucnction */}

    </Modal>
    )
}
}


function Roll() {

    const [roll,setRoll]=useState("");
    const [roll_details,setDetail]=useState("");


    const params = useParams();   ///FOR Parameter Pass
    const navigate = useNavigate(); //for redirect


  
      const onSubmit = async (e)=>{
        let form_data = new FormData();
            form_data.append('roll', roll);               
            form_data.append('roll_details', roll_details);               
                        
        let result = await fetch(`http://127.0.0.1:8000/roll_add`,{
            method: 'post',
            body:form_data,
            // headers:{ 'Content-type': 'multipart/form-data' }         
        });
        if(result.ok){
            const data = await result.json();
            navigate('/user_roll')
          }
      }
  
    useEffect(() =>{
      
      // onSubmit();
    }, [])



    return (
      <>

           <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >
         

              <Row>
                <Col style={{width: 100}}>
                    <Title level={5}> Roll Tag</Title>
                </Col>
                <Col>
                    <Input className="inputWi" prefix={<UserOutlined className="site-form-item-icon" />}  value={roll}
                      onChange={(e)=>setRoll(e.target.value)} placeholder="Roll Tag" />
                </Col>
              </Row>

              <br />


              <Row>
                <Col style={{width: 100}}>
                    <Title level={5}> Roll Details</Title>
                </Col>
                <Col>
                    <Input className="inputWi" prefix={<MailOutlined className="site-form-item-icon" />} value={roll_details}
                      onChange={(e)=>setDetail(e.target.value)} placeholder="Roll Details" />
                </Col>
              </Row>

              <br />

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onSubmit} className="login-form-button">
                  Submit
                </Button>
              </Form.Item>
          </Form>

      </>
    );
  }

// export default ProfileModal;