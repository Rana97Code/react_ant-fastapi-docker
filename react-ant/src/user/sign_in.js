import React, { useState, useEffect } from "react";
import { LockOutlined,InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card, Tooltip, Space, Tag  } from 'antd';
import { useNavigate } from 'react-router-dom';


function Signin() {
  const [user_email,setEmail]=useState("");
  const [user_password,setPass]=useState("");

  const navigate = useNavigate(); //for redirect

  useEffect(()=>{
    
    const auth= JSON.parse(localStorage.getItem('user'));
    if(auth){
      navigate("/home")
    }

  })

    const handleLogin = async ()=>{
      console.warn("user_email,user_password", user_email, user_password)
      let result = await fetch('http://127.0.0.1:8000/signin',{
          method: 'post',
          body:JSON.stringify({user_email,user_password}),
          headers:{
              // 'Access-Control-Allow-Methods': 'PUT, POST, PATCH, DELETE, GET',
              'Content-type':'application/json'
          }
      });
      result = await result.json();
      console.warn(result)
      if(result.access_token){         //check full input
         localStorage.setItem("user",JSON.stringify(result.user_email));
         localStorage.setItem("usertoken",JSON.stringify(result.access_token));   //For user login token storage

         navigate("/home")
      }else{
          alert("Please Enter Correct Email & Password")
      }
  }





  return (
      <Card bordered={false} style={{width: 500, height: 300, marginTop: 150, marginLeft: 800, display: 'flex', justifyContent:'center', textAlign: 'center' }} >
            <Space style={{ marginBottom: 30 }}>
              <Tag color="blue" style={{ width: 80, height: 25, textAlign: 'center'}}> Log In </Tag>
            </Space>
        <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >

            <Row>
              <Col>
                <Form.Item  name="username"  rules={[{ required: true,  message: 'Please input your Username!', }, ]} >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                  suffix={ <Tooltip title="Enter Your Orginal User Name">
                      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip> }
                    onChange={(e)=>setEmail(e.target.value)} placeholder="Username" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!', }, ]} >
                  <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />}  type="password" onChange={(e)=>setPass(e.target.value)} placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>


            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="/signup">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleLogin} className="login-form-button">
                Log in
              </Button>
              Or <a href="/signup">register now!</a>
            </Form.Item>
        </Form>
      </Card>
  );
}

export default Signin;
