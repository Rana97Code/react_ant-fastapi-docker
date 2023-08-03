import React, { useState, useEffect } from "react";
import { InfoCircleOutlined, ArrowLeftOutlined,HistoryOutlined,DiffOutlined  ,PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input,Tooltip, Col, Row, Card, Space,Checkbox , Layout, theme, Tag ,Select } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
import _ from 'lodash';


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
  const [notify_time,setNtime]=useState("");
  const [notify_type,setNotifTyp]=useState("");
  const [sms_id,setSmstitl]=useState("");
  const [email_id,setEmltitl]=useState("");
 
  const [Unit, setUnit]= useState([]); 
  const [Customer, setCustomer]= useState([]); 
  // const [Servicet, setServicTime]= useState([]); 
  const [Emlcontent, setEmlcontent]= useState([]); 
  const [Smscontent, setSmscontent]= useState([]); 

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const params = useParams();   ///FOR Parameter Pass
  const navigate = useNavigate();

  // const notification_type= notify_type.toString();
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
    getServDetails();   //create this function
},[])  //Use array

const getServDetails = async()=>{
let result = await fetch( `http://127.0.0.1:8000/get_Provided_service/${params.id}`,{
  method: 'get',
  headers:{
      'Content-type':'application/json',
      // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
  }
});
if(result.ok){
const data = await result.json();
// console.warn(data);
setCust(data.customer_id)    
setPro(data.product_name)
setQty(data.p_qty)
setUnt(data.unit_id)
setDate(data.purchase_date)
setTime(data.service_time)
setNtime(data.notify_time)
setNotifTyp(data.notification_type)
setSmstitl(data.sms_id)
setEmltitl(data.email_id)
}
 
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

  // const servtime = await fetch(`http://127.0.0.1:8000/servicetime`);
  
  // if (!servtime.ok){
  //   throw new Error('Could not data exist');
  // }else{
  //   let res = await servtime.json();
  //   setServicTime(res);
  // }


  const content = await fetch(`http://127.0.0.1:8000/allmail_content`);
  
    if (!content.ok){
      throw new Error('Could not data exist');
    }else{
    //return data.json();
    let resc = await content.json();
    // console.warn(resc);
    const sms = _.filter(resc, {'mail_type':'SMS'});
    const email = _.filter(resc, {'mail_type':'EMAIL'});

    setEmlcontent(email);
    setSmscontent(sms);
    // console.warn(sms);
    }


}

const onSubmit = async (e)=>{
    // validate() ? console.log('Submitted') : console.log('Validation Failed');
    //  //console.warn(!product_name );
    // if(!product_id || !customer || !service_details )  ///from validation
    // {
    //     setErrors(true)
    //     return false;
    // }
   

    console.warn(customer_id,product_name,p_qty,unit_id,purchase_date,service_time,notify_time);
    // const user_id= JSON.parse(localStorage.getItem('user'))._id;   //for get logedin userid
    let result = await fetch(`http://127.0.0.1:8000/update_Provided_service`,{
        method: 'put',
        body:JSON.stringify({customer_id, product_name, p_qty, unit_id, purchase_date, service_time,notify_time }),
        headers:{
            'Content-type':'application/json',
            // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
        }
    });
    if(result.ok){
        const data = await result.json();
        console.warn(data );
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

const [isChecked, setRcheck] = useState("");
// console.warn(notify_type);

const setCheck = (e) => {
  if(notify_type=='SMS'){
  setRcheck(e.target.checked);
  }else{
  setRcheck(e.target.unchecked);
  }
};
// checked={setCheck}
// const smscheck = (e) => {
//   console.log(`checked = ${e.target.checked}`);
  // if(notify_type=='SMS'){
  //   setCheck(isChecked);
  // }
// };


  return (

<Layout style={{ minHeight: '100vh'}}>
<Sidebar />
 <Layout>
   <Headers />


   <Content style={{ margin: '24px 16px', padding: 24, minHeight: 350, background: colorBgContainer, }} >
    <Card bordered={false} style={{width: 500, height: 600, background: '#b5f5ec', marginTop: 50, marginLeft: 550, display: 'flex', justifyContent:'center', textAlign: 'center' }} >
      <Space style={{ marginBottom: 30 }}>
        <Tag color="blue" style={{ width: 140, height: 25, textAlign: 'center'}}> Edit Service </Tag>
      </Space>
      <Form  name="normal_login"  className="login-form"  initialValues={{ remember: true, }}  >
          <Row>
              <Col>
                <Select style={{width: 280 }} placeholder="Select Customer " value={customer_id} onChange={(e)=>setCust(e)} optionLabelProp="label"  >
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
            {/* <Form.Item style={{width: 280 }} name="service_name"  rules={[{ required: true,  message: 'Please input Service Name!', }, ]} > */}
              <Input style={{width: 280 }} prefix={<DiffOutlined className="site-form-item-icon" />} 
              suffix={ <Tooltip title="Enter Service Name">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip> }
               value={product_name} onChange={(e)=>setPro(e.target.value)}  />
            {/* </Form.Item> */}
          </Col>
        </Row>

        <br />

        <Row>
          <Col>
            {/* <Form.Item style={{width: 140, position: 'relative', display: 'block' }} name="service_qty"  rules={[{ required: true,  message: 'Please input Service Name!', }, ]} > */}
                <Input style={{width: 180 }} prefix={<PlusOutlined className="site-form-item-icon" />} 
                value={p_qty} onChange={(e)=>setQty(e.target.value)} placeholder="Service Quantity" />

                 <Select showSearch style={{width: 100 }}  value={unit_id}  onChange={(e)=>setUnt(e)} optionLabelProp="label"  >
                  <Option ><Space> Select Unit </Space> </Option>
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
            {/* <Form.Item style={{width: 280 }} name="service_start"  rules={[{ required: true, message: 'Please input Service Date!', }, ]} > */}
              <Input type="date" style={{width: 280 }} placeholder={purchase_date}
                onChange={(e)=>setDate(e.target.value)}  />
            {/* </Form.Item> */}
          </Col>
        </Row>

    <br />

        <Row>
            <Col>
                <Select  showSearch style={{width: 280 }} value={service_time} onChange={(e)=>setTime(e)} optionLabelProp="label"  >
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
                <Select showSearch style={{width: 280 }} value={notify_time} onChange={(e)=>setNtime(e)} optionLabelProp="label"  >
                  <Option selected ><Space> Notify Before </Space> </Option>
                  <Option value="7" label="7 Days"><Space> 7 Days </Space> </Option>
                  <Option value="15" label="15 Days"><Space> 15 Days </Space> </Option>
                  <Option value="30" label="1 Month"><Space> 1 Month </Space> </Option>
                </Select>
            </Col>
          </Row>

          <br />

          <Row>
            <Col>
              <Checkbox.Group onChange={(e)=>setNotifTyp(e)} >
                              {/* Notify Via: */}
                <Row>
                  <Col span={12} >
                    <Checkbox onClick={smscheck}  value="SMS">SMS </Checkbox>
                    <hr />
                    <Select disabled={smsdisabled} style={{width: 140 }} showSearch placeholder="SMS Title" value={parseInt(sms_id)} onChange={(e)=>setSmstitl(e)} optionLabelProp="label" >
                      <Option selected ><Space> Select </Space> </Option>
                      {Smscontent.map(content => (
                        <Option key={content.value} value={content.id} label={content.mail_title}><Space> {content.mail_title} </Space> </Option>
                      )) }
                    </Select>
                  </Col>

                <br />
                <br />


                  <Col span={12} >
                    <Checkbox onClick={emlcheck} value="EMAIL">EMAIL</Checkbox>
                    <hr />
                    <Select disabled={emaildisabled} style={{width: 140 }} showSearch placeholder="Email Title" value={parseInt(email_id)} onChange={(e)=>setEmltitl(e)} optionLabelProp="label" >
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
              <Checkbox onChange={(e)=>setCheck(e)} checked={isChecked} value="SMS"> Auto Renew </Checkbox>
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
</Content>


</Layout>
</Layout>  

  );
}
