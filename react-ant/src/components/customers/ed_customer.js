import React, { useState, useEffect } from "react";
import { InfoCircleOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button,  Form, Input, Col, Row, Card, Tooltip, Space, Layout, theme, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
const { Content } = Layout;


export default function Edit_customer() {

  const { token: { colorBgContainer }, } = theme.useToken();

  const [customer_name,setName]=useState("");
  const [customer_email,setEmail]=useState("");
  const [customer_phone,setPhone]=useState("");
  const [customer_address,setAddr]=useState("");
  const [company_name,setCom]=useState("");

  const params = useParams();   ///FOR Parameter Pass
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
    getCustomerDetails();   //create this function
},[])  //Use array

const getCustomerDetails = async()=>{
let result = await fetch( `http://127.0.0.1:8000/get_customer/${params.id}`,{
  method: 'get',
  headers:{
      'Content-type':'application/json',
      // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
  }
});
if(result.ok){
const data = await result.json();

setName(data.customer_name)    
setEmail(data.customer_email)
setPhone(data.customer_phone)
setAddr(data.customer_address)
setCom(data.company_name)
}
}

// console.warn(customer_name);


const onSubmit = async (e)=>{
    validate() ? console.log('Submitted') : console.log('Validation Failed');
     //console.warn(!product_name );
    if(!customer_name || !customer_email || !customer_phone || !customer_address  )  ///from validation
    {
        setErrors(true)
        return false;
    }

    console.warn(customer_name,customer_email,customer_phone,customer_address,company_name);
    // const user_id= JSON.parse(localStorage.getItem('user'))._id;   //for get logedin userid
    let result = await fetch( `http://127.0.0.1:8000/update_customer/${params.id}`,{
        method: 'put',
        body:JSON.stringify({customer_name,customer_email,customer_phone,customer_address,company_name}),
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
    });
    if(result.ok){
      // const data = await result.json();
      // alert("Add Successfully")
      navigate('/customer')
    }else{
      navigate('/edit_customer/'+params.id)
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
            <Tag color="blue" style={{ width: 140, height: 25, textAlign: 'center'}}> Edit Customer </Tag>
          </Space>
          <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >

            <Row>
                <Col>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> } value={customer_name}
                      onChange={(e)=>setName(e.target.value)}  />
                </Col>
              </Row>

              <br />

              <Row>
                <Col>
                  
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setEmail(e.target.value)} value={customer_email} />
                
                </Col>
              </Row>

              <br />

              <Row>
                <Col>
                 
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setPhone(e.target.value)} value={customer_phone} />
                
                </Col>
              </Row>

              <br />

              <Row>
                <Col>
                 
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setAddr(e.target.value)} value={customer_address} />
                 
                </Col>
              </Row>

              <br />
              
              <Row>
                <Col>
                 
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Your Orginal User Name">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> }
                      onChange={(e)=>setCom(e.target.value)} value={company_name} />
                 
                </Col>
              </Row>

              <br />

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onSubmit} className="login-form-button">
                  Submit
                </Button>
              </Form.Item>
              <a href="/customer"><ArrowLeftOutlined />  Customer List</a>
          </Form>
        </Card>

        
    </Content>


</Layout>
</Layout>  
 
 );
}