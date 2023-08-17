import React, { useState, useEffect } from "react";
import { Layout, theme,Table,Button ,Space  } from 'antd';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
// const { Link } = Anchor;
const { Content } = Layout;

const Unit = ()=> {
  const { token: { colorBgContainer }, } = theme.useToken();


    const [Units, setUnit]= useState([]);
    // console.warn(Units);

    const columns = [ { title: 'ID',dataIndex: 'id' }, { title: 'Unit Name',dataIndex: 'name'}, { title: 'Unit Details',dataIndex: 'details'},
    {
      title: 'Action',
      dataIndex: 'did',
      key: 'did',
      render: (did) => (
        <Space size="middle">
          <Button href={"http://localhost:3000/edit_unit/"+did}>Edit</Button> 
          <Button danger onClick={()=>deleteProduct(did)}>Delete</Button>
        </Space>
       ),
    },];
    
    const data = [];
    Units.map((unit) =>[ data.push({id:unit.id,name:unit.unit_name, details:unit.unit_details, did:unit.id})]);
    //  console.warn(data);
    const deleteProduct =async (did)=>{
      let result =await fetch(`http://127.0.0.1:8000/delete_unit/${did}`,{
        method:"Delete",
  
      });
      result = await result.json()
      if(result)
      {
        getUnit();
      }
    }

    useEffect(()=>{
    getUnit();
    },[])  

const getUnit = async () => {
    const data = await fetch(`http://127.0.0.1:8000/units`);
  
    if (!data.ok){
      throw new Error('Could not data exist');
    }
    let res = await data.json();
    setUnit(res);
  };
  
  return (
    <Layout style={{ minHeight: '100vh'}}>
     <Sidebar />
      <Layout>
        <Headers />

        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, overflow: "hidden" }} >
          <Button style={{ float: 'right', margin: 20}} type="primary" href="http://localhost:3000/add_unit">Add Unit</Button>

          <Table  columns={columns}  dataSource={data}  scroll={{ x: 1500, y: 600, }} />
        </Content>


      </Layout>
    </Layout>  
);

}
  
export default Unit;