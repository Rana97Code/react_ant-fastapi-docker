import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row } from 'antd';

function App() {
  return (
    <>
      <div class="w-full flex justify-center pt-52">
      {/* <div class="self-center"> */}
        <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >
            <Row>
              <Col>
                <Form.Item  name="username"  rules={[{ required: true,  message: 'Please input your Username!', }, ]} >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!', }, ]} >
                  <Input  prefix={<LockOutlined className="site-form-item-icon" />}  type="password"  placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>


          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
      </Form>
    {/* </div> */}
    </div>
  </>
  );
}

export default App;
