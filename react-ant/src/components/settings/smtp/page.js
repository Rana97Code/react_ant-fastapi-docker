import React, { useState, useEffect } from "react";
import { Layout, theme,Table,Button ,Space  } from 'antd';
import Headers from '../../dashboard/header';
import Sidebar from '../../dashboard/sidebar';

// const { Link } = Anchor;
const { Content } = Layout;

const SMTP = ()=> {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [Smtp, setSmtp]= useState([]);

  const columns = [ { title: 'ID',dataIndex: 'id' }, { title: 'URL',dataIndex: 'url'}, { title: 'Port ',dataIndex: 'port'}, { title: 'Email',dataIndex: 'email'},  
  {
    title: 'Action',
    dataIndex: 'did',
    key: 'did',
    render: (did) => (
      <Space size="middle">
        <Button href={"http://localhost:3000/edit_smtp/"+did}>Edit</Button> 
        <Button danger onClick={()=>deleteProduct(did)}>Delete</Button>
      </Space>
     ),
  },];
  
  const data = [];
  Smtp.map((smtp) =>[ data.push({id:smtp.id,url:smtp.smtp_url, port:smtp.port_num, email:smtp.email, did:smtp.id})]);
  //  console.warn(data);


  const deleteProduct =async (did)=>{
    let result =await fetch(`http://127.0.0.1:8000/delete_smtp/${did}`,{
      method:"Delete",

    });
    result = await result.json()
    if(result)
    {
      getSmtp();
    }
  }


useEffect(()=>{
  getSmtp();
},[])  


const getSmtp = async () => {

  const data = await fetch(`http://127.0.0.1:8000/smtp`);
  
    if (!data.ok){
      throw new Error('Could not data exist');
    }
    //return data.json();
    let res = await data.json();
    // console.warn(res);
    setSmtp(res);
  };
  
    return (
        <Layout style={{ minHeight: '100vh'}}>
         <Sidebar />
          <Layout>
            <Headers />

            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, overflow: "hidden" }} >
              <Button style={{ float: 'right', margin: 20}} type="primary" href="http://localhost:3000/add_smtp">Add SMTP</Button>

              <Table  columns={columns}  dataSource={data}  scroll={{ x: 1500, y: 600, }} />
            </Content>


          </Layout>
        </Layout>  
  );

}
  
export default SMTP;




