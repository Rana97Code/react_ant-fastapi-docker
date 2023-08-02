import React, { useState, useEffect } from "react";
import { Layout, theme,Table,Button ,Space  } from 'antd';
import Headers from '../../dashboard/header';
import Sidebar from '../../dashboard/sidebar';

// const { Link } = Anchor;
const { Content } = Layout;

const SMS = ()=> {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [Sms, setSMS]= useState([]);

  const columns = [ { title: 'ID',dataIndex: 'id' }, { title: 'URL',dataIndex: 'url'}, { title: 'User Name',dataIndex: 'name'}, { title: 'API Key',dataIndex: 'key'},  
  {
    title: 'Action',
    dataIndex: 'did',
    key: 'did',
    render: (did) => (
      <Space size="middle">
        <Button href={"http://localhost:3000/edit_sms/"+did}>Edit</Button> 
        <Button danger onClick={()=>deleteProduct(did)}>Delete</Button>
      </Space>
     ),
  },];
  
  const data = [];
  Sms.map((sms) =>[ data.push({id:sms.id,url:sms.sms_url, name:sms.user_name, key:sms.api_key,  did:sms.id})]);
  //  console.warn(data);


  const deleteProduct =async (did)=>{
    let result =await fetch(`http://127.0.0.1:8000/delete_sms/${did}`,{
      method:"Delete",

    });
    result = await result.json()
    if(result)
    {
      getCustomer();
    }
  }


useEffect(()=>{
  getCustomer();
},[])  


const getCustomer = async () => {

  const data = await fetch(`http://127.0.0.1:8000/sms`);
  
    if (!data.ok){
      throw new Error('Could not data exist');
    }
    //return data.json();
    let res = await data.json();
    // console.warn(res);
    setSMS(res);
  };
  
    return (
        <Layout style={{ minHeight: '100vh'}}>
         <Sidebar />
          <Layout>
            <Headers />

            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, }} >
              <Button style={{ float: 'right', margin: 20}} type="primary" href="http://localhost:3000/add_sms">Add SMS API</Button>

              <Table  columns={columns}  dataSource={data}  scroll={{ x: 1500, y: 600, }} />
            </Content>


          </Layout>
        </Layout>  
  );

}
  
export default SMS;




