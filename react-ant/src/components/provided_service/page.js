import React, { useState, useEffect } from "react";
import { Layout,Anchor, theme,Table,Button ,Space  } from 'antd';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
// const { Link } = Anchor;
const { Content } = Layout;

const Service = ()=> {
  const { token: { colorBgContainer }, } = theme.useToken();



  const [ServiceProd, setContent]= useState([]);

    const columns = [ { title: 'ID',dataIndex: 'id' }, { title: 'Service Name',dataIndex: 's_name'}, { title: 'Customers Name',dataIndex: 'c_name'}, { title: 'Quantity',dataIndex: 'qty'},
       { title: 'Service Start Date',dataIndex: 's_date'}, { title: 'Deuration',dataIndex: 'deuration'}, { title: 'Expire Date',dataIndex: 'exp'}, { title: 'Notify Before',dataIndex: 'nb'},
       { title: 'Notify Date',dataIndex: 'nfd'},{ title: 'Notification Type',dataIndex: 'notf_typ'},{ title: 'SMS/Email Title',dataIndex: 'm_title'},
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
        },];

        const data = [];
        ServiceProd.map((service) =>[ data.push({id:service.id, s_name:service.product_name, c_name:service.customer_name,qty:service.p_qty + service.unit_name,
          s_date:service.purchase_date, deuration:service.service_time + 'Months', exp:service.expiry_date,  nb:service.notify_time + 'Days', nfd:service.renew_date,
          notf_typ:service.notification_type, m_title:service.mail_title, did:service.id})]);

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
    let res = await data.json();
    setContent(res);
  };
  
  return (
    <Layout style={{ minHeight: '100vh'}}>
     <Sidebar />
      <Layout>
        <Headers />

        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, }} >
          <Button style={{ float: 'right', margin: 20}} type="primary" href="http://localhost:3000/add_service">Add Service</Button>

          <Table  columns={columns}  dataSource={data}  scroll={{ x: 1500, y: 600, }} />
        </Content>


      </Layout>
    </Layout>  
);

}
  
export default Service;



