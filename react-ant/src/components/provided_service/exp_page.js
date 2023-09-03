import React, { useState, useEffect, Fragment } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { Layout,Input, theme,Table,Button ,Space, Col, Row,  } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';

// for moment duration format
require("moment-duration-format");


const { Content } = Layout;

const Service = ()=> {
  const { token: { colorBgContainer }, } = theme.useToken();

  const [ServiceProd, setContent]= useState([]);
  const [serchText, setSerchtext]= useState("");


    const columns = [
        { title: 'Service Name',dataIndex: 's_name', filteredValue:[serchText],
           onFilter:(value,record) => {return String(record.s_name).toLocaleLowerCase().includes(value.toLocaleLowerCase()) || String(record.c_name).toLocaleLowerCase().includes(value.toLocaleLowerCase())}
        },
        { title: 'Customers Name',dataIndex: 'c_name'}, { title: 'Quantity',dataIndex: 'qty'},{ title: 'Service Start Date',dataIndex: 's_date'},
        { title: 'Duration',dataIndex: 'duration'}, { title: 'Expire Date',dataIndex: 'exp'}, { title: 'SMS/Email Title',dataIndex: 'm_title'},
        {
          title: 'Action',
          dataIndex: 'did',
          key: 'did',
          render: (did) => (
            <Space size="middle">
              <Button style={{background:"#389e0d"}} href={"http://localhost:3000/edit_service/"+did}>Renew</Button> 
              <Button danger onClick={()=>deleteItem(did)}>Delete</Button>
            </Space>
          ),
        }
      ];


      const data = [];
      ServiceProd.map((service) =>[ data.push({s_name:service.product_name, c_name:service.customer_name,qty:service.p_qty + service.unit_name,
          s_date:service.purchase_date, duration:(moment.duration(service.service_time, 'months').format()), 
          exp:service.expiry_date, m_title:service.mail_title, did:service.id})]);

    const options = {
        filterType: 'checkbox',
      };

    useEffect(()=>{
      getService();
    },[])  


    const deleteItem =async (did)=>{
      let result =await fetch(`http://127.0.0.1:8000/delete_Provided_service/${did}`,{
        method:"Delete",
  
      });
      result = await result.json()
      if(result)
      {
        getService();
      }
    }

const getService = async () => {
    const data = await fetch( `http://127.0.0.1:8000/Provided_services`,{
      headers:{
        'Content-Type': 'application/json',
        // 'Authorization':`bearer ${JSON.parse(localStorage.getItem('access_token'))}`
      }
    });
  
    if (!data.ok){
      // throw new Error('Could not data exist');
      alert("There is no data")
    }
    // let res = await data.json();



    let servc = await data.json();

    const now = new Date();
    const date =moment(now).format('YYYY-MM-DD');
    const addmonth =moment(date).add(1, 'M');
    const nextmonth = addmonth.format('YYYY-MM-DD');

    const filtered = _.filter(servc, (o) => {
      return moment(o.expiry_date, 'YYYY-MM-DD')
        .isBetween(moment(date), moment(nextmonth));
    });

    // console.log(date, nextmonth);

    // setExpireserv(filtered);


    setContent(filtered);
  };
  
  return (
    <Layout style={{ minHeight: '100vh'}}>
     <Sidebar />
      <Layout>
        <Headers />
        <Fragment>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, overflow: "hidden" }} >
          <Row style={{ float: "right", margin: 20}}>
            <Col>            
                <Input.Search  placeholder="Search Services" onSearch={(value)=>{setSerchtext(value)}} onChange={(e) =>{setSerchtext(e.target.value)}} />
            </Col>
            {/* <Col>
                <Button  type="primary" href="http://localhost:3000/add_service" >Add Service</Button>
            </Col> */}
          </Row>
          <Table  columns={columns}  dataSource={data}  scroll={{ x: 1500, y: 600, }} />
        </Content>
        </Fragment>
      </Layout>
    </Layout>  
);

}
  
export default Service;



