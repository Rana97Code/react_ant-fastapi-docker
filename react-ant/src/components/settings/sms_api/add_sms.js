import React, { useState, useEffect } from "react";
import { DeploymentUnitOutlined,InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Card, Tooltip, Space, Layout, theme, Tag  } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../dashboard/sidebar';
import Headers from '../../dashboard/header';
const { Content } = Layout;



export default function Addcustomer() {
  const { token: { colorBgContainer }, } = theme.useToken();


  const [sms_url,setUrl]=useState("");
  const [user_name,setName]=useState("");
  const [api_key,setKey]=useState("");
  const [password,setPass]=useState("");
 

  const navigate = useNavigate(); //for redirect
  // for validation
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  

  const validate = () => {
    if (formData.sms_url === undefined) {
      setErrors({ ...errors,
        sms_url: 'Name is required'
      });
      return false;
    } else if (formData.sms_url.length < 2) {
      setErrors({ ...errors,
        sms_url: 'Name is too short'
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
    if(!sms_url || !user_name || !api_key || !password )  ///from validation
    {
        setErrors(true)
        return false;
    }

    console.warn(sms_url,user_name,api_key);
    // const user_id= JSON.parse(localStorage.getItem('user'))._id;   //for get logedin userid
    let result = await fetch(`http://127.0.0.1:8000/add_sms`,{
        method: 'post',
        body:JSON.stringify({sms_url,user_name,api_key,password}),
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
    });
    if(result.ok){
        const data = await result.json();
        // alert("Add Successfully")
        navigate('/sms')
      }else{
        navigate('/add_sms')
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
            <Tag color="blue" style={{ width: 140, height: 25, textAlign: 'center'}}> Insert New SMS </Tag>
          </Space>
          <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >

            <Row>
                <Col>
                  <Form.Item  name="url"  rules={[{ required: true,  message: 'Please Inpur Url!', }, ]} >
                    <Input prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setUrl(e.target.value)} placeholder="SMS URL" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="unit_name"  rules={[{ required: true,  message: 'Please input Unit Name!', }, ]} >
                    <Input prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setName(e.target.value)} placeholder="User Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="api_key"  rules={[{ required: true,  message: 'Please input API Key!', }, ]} >
                    <Input prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setKey(e.target.value)} placeholder="API Key" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="password"  rules={[{ required: true,  message: 'Please input valid password!', }, ]} >
                    <Input type="password" prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
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
              <a href="/sms"><ArrowLeftOutlined />  SMS API List</a>
          </Form>
        </Card>

        
    </Content>


</Layout>
</Layout>  
 
 );
}