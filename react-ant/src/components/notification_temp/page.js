
import React, { useState, useEffect } from "react";
import { Layout, theme,Table,Button ,Space  } from 'antd';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
const { Content } = Layout;

const Notification = ()=> {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [MailContent, setContent]= useState([]);

  const columns = [ { title: 'ID',dataIndex: 'id' }, { title: 'Mail Type',dataIndex: 'type'}, { title: 'Mail Title',dataIndex: 'title'},{ title: 'Mail Content',dataIndex: 'content'},  
  {
    title: 'Action',
    dataIndex: 'did',
    key: 'did',
    render: (did) => (
      <Space size="middle">
        <Button href={"http://localhost:3000/edit_notification/"+did}>Edit</Button> 
        <Button danger onClick={()=>deleteItem(did)}>Delete</Button>
      </Space>
     ),
  },];
  
  const data = [];
  MailContent.map((content) =>[ data.push({id:content.id,type:content.mail_type, title:content.mail_title, content:content.mail_content, did:content.id})]);
  //  console.warn(data);


  const deleteItem =async (did)=>{
    let result =await fetch(`http://127.0.0.1:8000/delete_content/${did}`,{
      method:"Delete",

    });
    result = await result.json()
    if(result)
    {
      getItem();
    }
  }


useEffect(()=>{
  getItem();
},[])  


const getItem = async () => {

  const data = await fetch(`http://127.0.0.1:8000/allmail_content`);
  
    if (!data.ok){
      throw new Error('Could not data exist');
    }
    //return data.json();
    let res = await data.json();
    // console.warn(res);
    setContent(res);
  };
  
    return (
        <Layout style={{ minHeight: '100vh'}}>
         <Sidebar />
          <Layout>
            <Headers />

            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, }} >
              <Button style={{ float: 'right', margin: 20}} type="primary" href="http://localhost:3000/add_notification">Add Notification</Button>

              <Table  columns={columns}  dataSource={data}  scroll={{ x: 1500, y: 600, }} />
            </Content>


          </Layout>
        </Layout>  
  );

}
  
export default Notification;