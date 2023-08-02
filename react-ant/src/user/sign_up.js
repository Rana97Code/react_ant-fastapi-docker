import React from 'react';
import { LockOutlined,InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card, Tooltip, Space, Tag  } from 'antd';

function SignUp() {
  return (
    <Card type="inner" bordered={false} style={{width: 500, height: 500, marginTop: 150, marginLeft: 800, display: 'flex', justifyContent:'center', textAlign: 'center' }} >
      <Space style={{ marginBottom: 30 }}>
        <Tag color="blue" style={{ width: 80, height: 25, textAlign: 'center'}}> Register </Tag>
      </Space>
        <Form  name="normal_login"  className="login-form "  initialValues={{ remember: true, }}  >
            <Row>
              <Col>
                <Form.Item  name="username"  rules={[{ required: true,  message: 'Please input your Username!', }, ]} >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                   suffix={ <Tooltip title="Enter Your Orginal User Name">
                      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip> }
                   placeholder="Username" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item  name="useremail"  rules={[{ required: true,  message: 'Please input your User Email!', }, ]} >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                   suffix={ <Tooltip title="Enter Your Orginal User Name">
                      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip> }
                   placeholder="User Email" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item  name="userphone"  rules={[{ required: true,  message: 'Please input your User Phone!', }, ]} >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                  suffix={ <Tooltip title="Enter Your Orginal User Name">
                      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip> }
                   placeholder="Userphone" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!', }, ]} >
                  <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />}  type="password"  placeholder="Password" />
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
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
          </Form.Item>
          <p>Or</p>
          <a href="/signin">I have already an account</a>

      </Form>
    </Card>

  );
}

export default SignUp;
