import React, { useState, useEffect } from "react";
import { InfoCircleOutlined, ArrowLeftOutlined,DiffOutlined  ,PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input,Tooltip, Col, Row, Card, Space,Checkbox , Layout, theme, Tag ,Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
import _ from 'lodash';
import { relativeTimeRounding } from "moment/moment";


const { Content } = Layout;

const { Option } = Select;



export default function AddServicetime() {
  const { token: { colorBgContainer }, } = theme.useToken();


  const [customer_id,setCust]=useState("");
  const [product_name,setPro]=useState("");
  const [p_qty,setQty]=useState("");
  const [unit_id,setUnt]=useState("");
  const [purchase_date,setDate]=useState("");
  const [service_time,setTime]=useState("");
  const [notify_time,setNotif]=useState("");
  const [notify_type,setNotifTyp]=useState("");
  const [sms_id,setSmstitl]=useState("");
  const [email_id,setEmltitl]=useState("");
  const [auto_renewal,setAutorenew]=useState("");

  // const m_id = [sms_title , email_title];
  // const mail_id = m_id;
  // const mail_id = m_id.toString();
 
  const [Unit, setUnit]= useState([]); 
  const [Customer, setCustomer]= useState([]); 
  // const [Servicet, setServicTime]= useState([]); 
  const [Emlcontent, setEmlcontent]= useState([]); 
  const [Smscontent, setSmscontent]= useState([]); 

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  
  const navigate = useNavigate();

  const notification_type= notify_type.toString();
  const auto_renew= auto_renewal.toString();
  // console.warn(no_type);


  // const validate = () => {
  //   if (formData.product_id === undefined) {
  //     setErrors({ ...errors,
  //       product_id: 'Name is required'
  //     });
  //     return false;
  //   } else if (formData.year.length < null) {
  //     setErrors({ ...errors,
  //       product_id: 'Name is too short'
  //     });
  //     return false;
  //   }

  //   return true;
  // };


  useEffect(()=>{
     getDetails();   //create this function
},[])  //Use array

const getDetails = async (e)=>{
  const pdata = await fetch(`http://127.0.0.1:8000/units`);
  
  if (!pdata.ok){
    throw new Error('Could not data exist');
  }else{
  let res = await pdata.json();
  setUnit(res)
  // console.warn(res)
  }

  const cdata = await fetch( `http://127.0.0.1:8000/customers`);

  if (!cdata.ok){
    throw new Error('Could not data exist');
  }else{
  let res = await cdata.json();
  setCustomer(res)
  // console.warn(res)
  }



  const content = await fetch(`http://127.0.0.1:8000/allmail_content`);
  
    if (!content.ok){
      throw new Error('Could not data exist');
    }
    //return data.json();
    let resc = await content.json();
    const sms = _.filter(resc, {'mail_type':'SMS'});
    const email = _.filter(resc, {'mail_type':'EMAIL'});

    setEmlcontent(email);
    setSmscontent(sms);

}

const onSubmit = async (e)=>{
    // validate() ? console.log('Submitted') : console.log('Validation Failed');
    //  //console.warn(!product_name );
    // if(!product_id || !customer || !service_details )  ///from validation
    // {
    //     setErrors(true)
    //     return false;
    // }
   

    console.warn(customer_id,product_name,p_qty,unit_id,purchase_date,service_time,notify_time,notification_type,sms_id,email_id,auto_renew);
    // const user_id= JSON.parse(localStorage.getItem('user'))._id;   //for get logedin userid
    let result = await fetch(`http://127.0.0.1:8000/add_Provided_service`,{
        method: 'post',
        body:JSON.stringify({customer_id, product_name, p_qty, unit_id, purchase_date, service_time,notify_time,notification_type,sms_id,email_id,auto_renew}),
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
    });
    if(result.ok){
        const data = await result.json();
        // console.warn(data );
        navigate('/service')
      }else{
        navigate('/add_service')
      }
  
}

const [smsdisabled, setDisabled] = useState(true);
const [emaildisabled, setEmdisabled] = useState(true);
const emlcheck = async (e)=>{
  setEmdisabled(!emaildisabled);
}
const smscheck = async (e)=>{
  setDisabled(!smsdisabled);
}



  return (

<Layout style={{ minHeight: '100vh'}}>
<Sidebar />
 <Layout>
   <Headers />


   <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, overflow: "hidden" }} >

    <Space style={{width: '100%', justifyContent: 'center'}}>
      <Card className="myServiceCard" bordered={false} >
        <Space style={{ marginBottom: 30 }}>
          <Tag color="blue" style={{ width: 140, height: 25, textAlign: 'center'}}> Add New Service </Tag>
        </Space>
        <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >
            <Row>
                <Col>
                  <Select showSearch className="inputWi" placeholder="Select Customer "  onChange={(e)=>setCust(e)} optionLabelProp="label"  >
                    <Option selected ><Space> Select Customer Name </Space> </Option>
                    {Customer.map(customer => (
                      <Option key={customer.value} value={customer.id} label={customer.customer_name}><Space> {customer.customer_name} </Space> </Option>
                    )) }
                  </Select>
                {/* </Form.Item> */}
              </Col>
            </Row>

          <br />

          <Row>
            <Col>
              <Form.Item className="inputWi" name="service_name"  rules={[{ required: true,  message: 'Please input Service Name!', }, ]} >
                <Input prefix={<DiffOutlined className="site-form-item-icon" />} 
                suffix={ <Tooltip title="Enter Service Name">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip> }
                  onChange={(e)=>setPro(e.target.value)} placeholder="Service Name" />
              </Form.Item>
            </Col>
          </Row>


          <Row>
            <Col>
              {/* <Form.Item style={{width: 140, position: 'relative', display: 'block' }} name="service_qty"  rules={[{ required: true,  message: 'Please input Service Name!', }, ]} > */}
                  <Input className="inputQuant" prefix={<PlusOutlined className="site-form-item-icon" />} 
                  onChange={(e)=>setQty(e.target.value)} placeholder="Service Quantity" />

                  <Select showSearch style={{width: 100 }} placeholder="Units"  onChange={(e)=>setUnt(e)} optionLabelProp="label"  >
                    <Option selected ><Space> Select Unit </Space> </Option>
                    {Unit.map(unit => (
                      <Option key={unit.value} value={unit.id} label={unit.unit_name}><Space> {unit.unit_name} </Space> </Option>
                    )) }
                  </Select>
                  
              {/* </Form.Item> */}
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Form.Item className="inputWi" name="service_start"  rules={[{ required: true, message: 'Please input Service Date!', }, ]} >
                <Input type="date" 
                  onChange={(e)=>setDate(e.target.value)}  />
              </Form.Item>
            </Col>
          </Row>


          <Row>
              <Col>
                  <Select  showSearch className="inputWi" placeholder="Service Duration" onChange={(e)=>setTime(e)} optionLabelProp="label"  >
                    <Option selected ><Space> Select Duration </Space> </Option>
                    <Option value="1" label="1 Month"><Space> 1 Month </Space> </Option>
                    <Option value="3" label="3 Month"><Space> 3 Month </Space> </Option>
                    <Option value="6" label="6 Month"><Space> 6 Month </Space> </Option>
                    <Option value="12" label="1 Year"><Space> 1 Year </Space> </Option>
                    <Option value="24" label="2 Year"><Space> 2 Year </Space> </Option>
                    <Option value="36" label="3 Year"><Space> 3 Year </Space> </Option>
                    <Option value="60" label="5 Year"><Space> 5 Year </Space> </Option>
                  </Select>
              </Col>
            </Row>

              <br />

          <Row>
              <Col>
                  <Select showSearch className="inputWi" placeholder="Notify Before Expire"  onChange={(e)=>setNotif(e)} optionLabelProp="label"  >
                    <Option selected ><Space> Notify Before </Space> </Option>
                    <Option value="7" label="7 Days"><Space> 7 Days </Space> </Option>
                    <Option value="15" label="15 Days"><Space> 15 Days </Space> </Option>
                    <Option value="30" label="1 Month"><Space> 1 Month </Space> </Option>
                  </Select>
              </Col>
            </Row>
            <br />

            <Row >
              <Col>
              <Checkbox.Group  onChange={(e)=>setNotifTyp(e)} >
                                {/* Notify Via: */}
                  <Row >
                    <Col span={12} >
                      <Checkbox onClick={smscheck} value="SMS">SMS </Checkbox>
                      <hr />
                      <Select disabled={smsdisabled} className="mTitle" showSearch placeholder="SMS Title"  onChange={(e)=>setSmstitl(e)} optionLabelProp="label" >
                        <Option selected ><Space> Select </Space> </Option>
                        {Smscontent.map(content => (
                          <Option key={content.value} value={content.id} label={content.mail_title}><Space> {content.mail_title} </Space> </Option>
                        )) }
                      </Select>
                    </Col>
                  {/* </Row>
                  <Row> */}
                  <br />
                  <br />


                    <Col span={12} >
                      <Checkbox onClick={emlcheck} value="EMAIL">EMAIL</Checkbox>
                      <hr />
                      <Select disabled={emaildisabled} className="mTitle" showSearch placeholder="Email Title"  onChange={(e)=>setEmltitl(e)} optionLabelProp="label" >
                        <Option selected ><Space> Select </Space> </Option>
                        {Emlcontent.map(content => (
                          <Option key={content.value} value={content.id} label={content.mail_title}><Space> {content.mail_title} </Space> </Option>
                        )) }
                      </Select>
                    </Col>
                  
                  </Row>
              </Checkbox.Group>
              </Col>
          </Row>
          <br />

            <Row>
            <Col>
              <Checkbox.Group  onChange={(e)=>setAutorenew(e)} >
                <Checkbox value="YES" > Auto-Renewal </Checkbox>
                <Checkbox value="NO" > Not Auto-Renewal </Checkbox>
              </Checkbox.Group>
            </Col>
            </Row>


            <br />

            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={onSubmit} className="login-form-button">
                Submit
              </Button>
            </Form.Item>
            <a href="/service"><ArrowLeftOutlined />  Service List</a>
        </Form>
      </Card>
    </Space>

</Content>


</Layout>
</Layout>  

  );
}

