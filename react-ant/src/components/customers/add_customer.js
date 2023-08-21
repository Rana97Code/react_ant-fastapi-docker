import React, { useState, useEffect } from "react";
import { InfoCircleOutlined, UserOutlined, ArrowLeftOutlined, MailOutlined,MobileOutlined,BankOutlined ,AimOutlined,HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Card, Tooltip, Space, Layout, theme, Tag  } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
const { Content } = Layout;


export default function Add_customer() {

  const { token: { colorBgContainer }, } = theme.useToken();

  const [customer_name,setName]=useState("");
  const [customer_email,setEmail]=useState("");
  const [customer_phone,setPhone]=useState("");
  const [customer_address,setAddr]=useState("");
  const [company_name,setCom]=useState("");

  const navigate = useNavigate(); //for redirect
  // for validation
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});


  const validate = () => {
    if (formData.customer_name === undefined) {
      setErrors({ ...errors,
        customer_name: 'Name is required'
      });
      return false;
    } else if (formData.customer_name.length < 3) {
      setErrors({ ...errors,
        customer_name: 'Name is too short'
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
    if(!customer_name || !customer_email || !customer_phone || !customer_address )  ///from validation
    {
        setErrors(true)
        return false;
    }

    console.warn(customer_name,customer_email,customer_phone,customer_address,company_name);
    // const user_id= JSON.parse(localStorage.getItem('user'))._id;   //for get logedin userid
    let result = await fetch( `http://127.0.0.1:8000/customer_add`,{
        method: 'post',
        body:JSON.stringify({customer_name,customer_email,customer_phone,customer_address,company_name}),
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
    });
    if(result.ok){
      const data = await result.json();
      // alert("Add Successfully")
      navigate('/customer')
    }else{
      navigate('/add_customer')
    }
}



  return (
    <Layout style={{ minHeight: '100vh'}}>
    <Sidebar />
     <Layout>
       <Headers />

       <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, overflow: "hidden" }} >

       <Space   style={{width: '100%', justifyContent: 'center'}}>
        <Card className="myCard" bordered={false}  >
          <Space style={{ marginBottom: 30 }}>
            <Tag color="blue" style={{ width: 140, height: 25, textAlign: 'center'}}> Insert New Customer </Tag>
          </Space>
          <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >

            <Row>
                <Col>
                  <Form.Item  name="customer_name"  rules={[{ required: true,  message: 'Please input your Customer Name!', }, ]} >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setName(e.target.value)} placeholder="Customer Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="customer_email"  rules={[{ required: true,  message: 'Please input your Customer Email!', }, ]} >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setEmail(e.target.value)} placeholder="Customer Email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="customer_pho"  rules={[{ required: true,  message: 'Please input your Customer Phone!', }, ]} >
                    <Input prefix={<MobileOutlined  className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setPhone(e.target.value)} placeholder="Customer Phone" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="customer_addr"  rules={[{ required: true,  message: 'Please input your Customer Address!', }, ]} >
                    <Input prefix={<AimOutlined  className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setAddr(e.target.value)} placeholder="Customer Address" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item  name="company"  rules={[{ required: true,  message: 'Please input your Company!', }, ]} >
                    <Input prefix={<BankOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setCom(e.target.value)} placeholder="Customer Company" />
                  </Form.Item>
                </Col>
              </Row>


              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onSubmit} className="login-form-button">
                  Submit
                </Button>
              </Form.Item>
              <a href="/customer"><ArrowLeftOutlined />  Customer List</a>
          </Form>
        </Card>
      </Space> 
    </Content>


</Layout>
</Layout>  
 
 );
}