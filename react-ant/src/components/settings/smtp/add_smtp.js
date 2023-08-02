import React, { useState, useEffect } from "react";
import { DeploymentUnitOutlined,InfoCircleOutlined,  ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Card, Tooltip, Space, Layout, theme, Tag  } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../dashboard/sidebar';
import Headers from '../../dashboard/header';
const { Content } = Layout;



export default function Addcustomer() {
  const { token: { colorBgContainer }, } = theme.useToken();


  const [smtp_url,setUrl]=useState("");
  const [port_num,setPort]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPass]=useState("");
 

  const navigate = useNavigate(); //for redirect
  // for validation
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  

  const validate = () => {
    if (formData.smtp_url === undefined) {
      setErrors({ ...errors,
        smtp_url: 'Name is required'
      });
      return false;
    } else if (formData.smtp_url.length < 2) {
      setErrors({ ...errors,
        smtp_url: 'Name is too short'
      });
      return false;
    }

    return true;
  };


  useEffect(()=>{
    onSubmit();   //create this function
},[])  //Use array

const onSubmit = async (e)=>{
    validate() ? console.log('Submitted') : console.log('Validation Failed');
     //console.warn(!product_name );
    if(!smtp_url || !port_num || !email || !password )  ///from validation
    {
        setErrors(true)
        return false;
    }

    console.warn(smtp_url,port_num,);
    // const user_id= JSON.parse(localStorage.getItem('user'))._id;   //for get logedin userid
    let result = await fetch(`http://127.0.0.1:8000/add_smtp`,{
        method: 'post',
        body:JSON.stringify({smtp_url,port_num,email,password}),
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
    });
    if(result.ok){
        // const data = await result.json();
        // alert("Add Successfully")
        navigate('/smtp')
      }else{
        navigate('/add_smtp')
      }
  
}



  return (
    <Layout style={{ minHeight: '100vh'}}>
    <Sidebar />
     <Layout>
       <Headers />

       <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, }} >


        <Card bordered={false} style={{width: 500, height: 500, background: '#b5f5ec', marginTop: 50, marginLeft: 550, display: 'flex', justifyContent:'center', textAlign: 'center' }} >
          <Space style={{ marginBottom: 30 }}>
            <Tag color="blue" style={{ width: 140, height: 25, textAlign: 'center'}}> Insert New SMTP </Tag>
          </Space>
          <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >

            <Row>
                <Col>
                  <Form.Item  name="smtp_url"  rules={[{ required: true,  message: 'Please input Url!', }, ]} >
                    <Input prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal URL">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setUrl(e.target.value)} placeholder="SMTP URL" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="port_num"  rules={[{ required: true,  message: 'Please input port number!', }, ]} >
                    <Input prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal Port Number">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setPort(e.target.value)} placeholder="Port Number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="email"  rules={[{ required: true,  message: 'Please input Email!', }, ]} >
                    <Input prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal Email">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="password"  rules={[{ required: true,  message: 'Please input Password!', }, ]} >
                    <Input type="password" prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal Password">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setPass(e.target.value)} placeholder="Password" />
                  </Form.Item>
                </Col>
              </Row>

        
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onSubmit} className="login-form-button">
                  Submit
                </Button>
              </Form.Item>
              <a href="/smtp"><ArrowLeftOutlined />  SMTP API List</a>
          </Form>
        </Card>

        
    </Content>


</Layout>
</Layout>  
 
 );
}