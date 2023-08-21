import React from 'react';
import { useState, useEffect } from "react";
import { LockOutlined,InfoCircleOutlined,  MailOutlined,MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card, Tooltip, Space, Tag,Typography, Image  } from 'antd';
import { useNavigate } from 'react-router-dom';


const {Title, Text, Link } = Typography;


function SignUp() {

    const [user_name,setName]=useState("");
    const [user_email,setEmail]=useState("");
    const [user_phone,setPhone]=useState("");
    const [user_password,setPass]=useState("");
    // const [confirm_password,setCpass]=useState("");
  
    // for validation
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
  
  
    const navigate = useNavigate();
  
  
    const validate = () => {
      if (formData.user_email === undefined) {
        setErrors({ ...errors,
          user_email: 'Name is required'
        });
        return false;
      } else if (formData.user_password.length < 3) {
        setErrors({ ...errors,
          user_password: 'Name is too short'
        });
        return false;
      }
  
      return true;
    };
  
  
      useEffect(()=>{
      //   const auth= localStorage.getItem('user');
        // onSubmit();   //create this function
    },[])  //Use array
  
  const onSubmit = async (e)=>{
      validate() ? console.log('Submitted') : console.log('Validation Failed');
       //console.warn(!product_name );
      if(!user_name || !user_email || !user_phone || !user_password )  ///from validation
      {
          setErrors(true)
          return false;
      }
  
      // console.warn(user_name,user_email,user_phone,user_password);
      let result = await fetch('http://127.0.0.1:8000/create_user',{
          method: 'post',
          body:JSON.stringify({user_name,user_email,user_phone,user_password}),
          headers:{
              'Content-type':'application/json',
          }
      });
  
      if(result.ok){
        const data = await result.json();
        alert("Your Registration Successfull")
        // sessionStorage.setItem("user",JSON.stringify(data));  //for storing data in localStoreg for checking user log in or not and create field "user" to store data
        // sessionStorage.setItem("usertoken",data.access_token);
        // localStorage.setItem("user",JSON.stringify(data));
        navigate('/signin')
      }else{
        navigate('/signup')
      }
  
      // }
  }
  
  return (
    <Space style={{width: '100%',paddingTop: 60, justifyContent: 'center'}}>
       <Card className="myCard" bordered={false} >   
            {/* <Title level={3} type="success">Welcome To Service Management</Title> */}
            <Image  width={160} height={65} src="/images/logo1.png" />
            <br />
            <Space style={{ marginBottom: 30, marginTop: 15 }}>
              <Tag color="blue" style={{ width: 90, height: 25, textAlign: 'center'}}> Register Now</Tag>
            </Space>
            <Form  name="normal_login"  className="login-form "  initialValues={{ remember: true, }}  >
                <Row>
                  <Col>
                    <Form.Item  name="username"  rules={[{ required: true,  message: 'Please input your Username!', }, ]} >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                      suffix={ <Tooltip title="Enter Your Orginal User Name">
                          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip> }
                      placeholder="Username"  onChange={(e)=>setName(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Item  name="useremail"  rules={[{ required: true,  message: 'Please input your User Email!', }, ]} >
                      <Input prefix={<MailOutlined className="site-form-item-icon" />} 
                      suffix={ <Tooltip title="Enter Your Orginal User Name">
                          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip> }
                      placeholder="User Email"  onChange={(e)=>setEmail(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Item  name="userphone"  rules={[{ required: true,  message: 'Please input your User Phone!', }, ]} >
                      <Input prefix={<MobileOutlined className="site-form-item-icon" />} 
                      suffix={ <Tooltip title="Enter Your Orginal User Name">
                          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip> }
                      placeholder="User Phone"  onChange={(e)=>setPhone(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!', }, ]} >
                      <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />}  type="password"  placeholder="Password"
                       onChange={(e)=>setPass(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>


              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                {/* <a className="login-form-forgot" href="">
                  Forgot password
                </a> */}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onSubmit} className="login-form-button">
                  Register
                </Button>
              </Form.Item>
              <p>Or</p>
              <Link  href="/signin">I have already an account</Link >

          </Form>
        </Card>
  </Space>

  );
}

export default SignUp;
