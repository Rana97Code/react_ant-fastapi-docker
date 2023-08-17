import React, { useState, useEffect } from "react";
import { DeploymentUnitOutlined,InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Card, Tooltip, Space, Layout, theme, Tag  } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
const { Content } = Layout;



export default function Addcustomer() {
  const { token: { colorBgContainer }, } = theme.useToken();


  const [unit_name,setName]=useState("");
  const [unit_details,setDetail]=useState("");
 

  const navigate = useNavigate(); //for redirect
  // for validation
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  

  const validate = () => {
    if (formData.unit_name === undefined) {
      setErrors({ ...errors,
        unit_name: 'Name is required'
      });
      return false;
    } else if (formData.unit_name.length < 2) {
      setErrors({ ...errors,
        unit_name: 'Name is too short'
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
    if(!unit_name || !unit_details )  ///from validation
    {
        setErrors(true)
        return false;
    }

    console.warn(unit_name,unit_details);
    // const user_id= JSON.parse(localStorage.getItem('user'))._id;   //for get logedin userid
    let result = await fetch(`http://127.0.0.1:8000/add_unit`,{
        method: 'post',
        body:JSON.stringify({unit_name,unit_details}),
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
    });
    if(result.ok){
        // const data = await result.json();
        // alert("Add Successfully")
        navigate('/units')
      }else{
        navigate('/add_unit')
      }
  
}



  return (
    <Layout style={{ minHeight: '100vh'}}>
    <Sidebar />
     <Layout>
       <Headers />

      <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, overflow: "hidden" }} >

          <Space style={{width: '100%', justifyContent: 'center'}}>
            <Card className="myCard" bordered={false} >
              <Space style={{ marginBottom: 30 }}>
                <Tag color="blue" style={{ width: 140, height: 25, textAlign: 'center'}}> Insert New Unit </Tag>
              </Space>
              <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >

                <Row>
                    <Col>
                      <Form.Item  name="unit_name"  rules={[{ required: true,  message: 'Please input Unit Name!', }, ]} >
                        <Input prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                        suffix={ <Tooltip title="Enter Your Orginal User Name">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip> }
                          onChange={(e)=>setName(e.target.value)} placeholder="Unit Name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Item  name="unit_details"  rules={[{ required: true,  message: 'Please input unit details!', }, ]} >
                        <Input prefix={<DeploymentUnitOutlined className="site-form-item-icon" />} 
                        suffix={ <Tooltip title="Enter Your Orginal User Name">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip> }
                          onChange={(e)=>setDetail(e.target.value)} placeholder="Unit Details" />
                      </Form.Item>
                    </Col>
                  </Row>

            
                  <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={onSubmit} className="login-form-button">
                      Submit
                    </Button>
                  </Form.Item>
                  <a href="/units"><ArrowLeftOutlined />  Unit List</a>
              </Form>
            </Card>
          </Space>

        
      </Content>


</Layout>
</Layout>  
 
 );
}