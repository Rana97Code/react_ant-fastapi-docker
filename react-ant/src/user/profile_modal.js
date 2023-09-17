
import React, { Component, useState, useEffect  } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import {  Form, Input, Col, Row, Button, Modal, Upload, Image  } from "antd";
import { UserOutlined, MailOutlined ,MobileOutlined, AreaChartOutlined  } from '@ant-design/icons';
// import pro_pic from '../../../FastSMS/app/img/man.jpg';

export default class ProfileModal extends Component {
  constructor(props) {
  super(props);
}

render(){
    return (
    <Modal
        title="My Modal"
        visible={this.props.visible}
        onOk={() => this.props.handleModal(false)}
        onCancel={() => this.props.handleModal(false)}
    >
        <Profil />        {/* Call the fucnction */}

    </Modal>
    )
}
}


function Profil() {

    const [profile, setProfile] = useState()
    const [id,setId]=useState("");
    const [user_img,setImg]=useState("");
    const [user_name,setName]=useState("");
    const [user_email,setEmail]=useState("");
    const [user_phone,setPhone]=useState("");

    const params = useParams();   ///FOR Parameter Pass
    const navigate = useNavigate(); //for redirect


      const u_id = id;
  
      const onSubmit = async (e)=>{
        let form_data = new FormData();
            form_data.append('user_img', user_img);               
                        
        let result = await fetch(`http://127.0.0.1:8000/file_upload/${u_id}`,{
            method: 'put',
            body:form_data,
            // headers:{ 'Content-type': 'multipart/form-data' }         
        });
        if(result.ok){
            const data = await result.json();
            navigate('/')
          }
      }
  
    useEffect(() =>{
  
      const auth= JSON.parse(localStorage.getItem('user'));
      setProfile(auth)

      const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/get_me/${auth}`,{
          method: 'get',
          headers:{
              'Content-type':'application/json',
          }})
        const newData = await response.json();
        // console.log(newData);
        setImg(newData.user_img)    
        setName(newData.user_name)    
        setEmail(newData.user_email)
        setPhone(newData.user_phone)
        setId(newData.id)

      };
    
      fetchData();
      // onSubmit();
    }, [])



    return (
      <>

           <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >
              <Row style={{ textAlign: "center", float: 'right'}}>
                <Col>
                  <Image style={{ width: 110, height: 120, textAlign: "center", margin: 25}} src={'/images/'+user_img} alt={user_img} />
                </Col>
              </Row>

              <br />

              <Row>
                <Col>
                    <Input className="inputWi" prefix={<AreaChartOutlined className="site-form-item-icon" />} type="file" 
                    accept=".jpeg, .png, .jpg, .PNG" onChange={(e)=>setImg(e.target.files[0])} />
                </Col>
              </Row>

              <br />

              <Row>
                <Col>
                    <Input className="inputWi" prefix={<UserOutlined className="site-form-item-icon" />}  value={user_name}
                      onChange={(e)=>setName(e.target.value)} placeholder="User Name" />
                </Col>
              </Row>

              <br />


              <Row>
                <Col>
                    <Input className="inputWi" prefix={<MailOutlined className="site-form-item-icon" />} value={user_email}
                      onChange={(e)=>setEmail(e.target.value)} placeholder="User Emails" />
                </Col>
              </Row>

              <br />
              <Row>
                <Col>
                    <Input className="inputWi" prefix={<MobileOutlined className="site-form-item-icon" />}  value={user_phone}
                      onChange={(e)=>setPhone(e.target.value)} placeholder="User Phone" />
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