import React, { useState, useEffect } from "react";
import { ArrowLeftOutlined ,InsertRowAboveOutlined, InfoCircleOutlined} from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Card, Space, Layout, theme, Tooltip, Tag ,Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
const { TextArea } = Input;
const { Content } = Layout;

const { Option } = Select;


export default function Add_notification() {
  const { token: { colorBgContainer }, } = theme.useToken();


  const [mail_type,setType]=useState("");
  const [mail_title,setTitle]=useState("");
  const [mail_content,setContent]=useState("");

 
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const params = useParams();   ///FOR Parameter Pass
  const navigate = useNavigate(); //for redirect


  const validate = () => {
    if (formData.mail_content === undefined) {
      setErrors({ ...errors,
        mail_content: 'Name is required'
      });
      return false;
    } else if (formData.mail_content.length < 3) {
      setErrors({ ...errors,
        mail_content: 'Name is too short'
      });
      return false;
    }

    return true;
  };

        useEffect(()=>{
          getNotificationDetails();   //create this function
        })  //Use array

        const getNotificationDetails = async()=>{
        let result = await fetch( `http://127.0.0.1:8000/get_mail_content/${params.id}`,{
        method: 'get',
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
        });
        if(result.ok){
        const data = await result.json();

        setType(data.mail_type)    
        setTitle(data.mail_title)    
        setContent(data.mail_content)

        }
        }

const onSubmit = async (e)=>{

      validate() ? console.log('Submitted') : console.log('Validation Failed');
    if(!mail_type || !mail_content || !mail_title )  ///from validation
    {
        setErrors(true)
        return false;
    }

    console.warn(mail_type,mail_content);
    let result = await fetch(`http://127.0.0.1:8000/update_content/${params.id}`,{
        method: 'put',
        body:JSON.stringify({mail_type,mail_title,mail_content}),
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
    });
    if(result.ok){
        const data = await result.json();
        // alert("Add Successfully")
        navigate('/notification')
      }else{
        navigate('/add_notification')
      }

}


  return (
    <Layout style={{ minHeight: '100vh'}}>
    <Sidebar />
     <Layout>
       <Headers />

       <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, overflow: "hidden" }} >
       <Space   style={{width: '100%', justifyContent: 'center'}}>

        <Card bordered={false} className="myCard" >
          <Space style={{ marginBottom: 30 }}>
            <Tag color="blue" style={{ width: 140, height: 25, textAlign: 'center'}}> Edit Notification </Tag>
          </Space>
          <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >
              <Row>
                  <Col>
                  {/* <Form.Item  label=" Notification Type" > */}

                    <Select showSearch className="inputWi"  value={mail_type}  onChange={(e)=>setType(e)} optionLabelProp="label"  >
                      <Option selected ><Space> Select Notification Type </Space> </Option>
                      <Option value="SMS" label="SMS"><Space> SMS </Space> </Option>
                      <Option value="EMAIL" label="EMAIL"><Space> EMAIL </Space> </Option>
                    </Select>
                  {/* </Form.Item> */}
                </Col>
              </Row>
              <br />

            <Row>
                  <Col>
                  {/* <Form.Item  label=" Notification Type" > */}
                  <Input className="inputWi" prefix={<InsertRowAboveOutlined className="site-form-item-icon" />} 
                    suffix={ <Tooltip title="Enter Mail Title">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                      </Tooltip> } value={mail_title}
                      onChange={(e)=>setTitle(e.target.value)} />
      
                  {/* </Form.Item> */}
                </Col>
              </Row>


            <br />

              <Row>
                <Col>
                  {/* <Form.Item  label="Notification Content" > */}
                    <Form.Item  name="notification_content" >
                      <Input type="hidden" value={mail_content} />
                      <TextArea className="inputWi" value={mail_content} autoSize={{ minRows: 2, maxRows: 12,  }} onChange={(e)=>setContent(e.target.value)} />
                    </Form.Item>
                  {/* </Form.Item> */}
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onSubmit} className="login-form-button">
                  Submit
                </Button>
              </Form.Item>
              <a href="/notification"><ArrowLeftOutlined />  Notification List</a>
          </Form>
        </Card>
      </Space>

    </Content>


  </Layout>
</Layout>  
 
  );
}