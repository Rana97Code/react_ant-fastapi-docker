import React, { useState, useEffect } from "react";
import { Layout,Anchor, theme,Table,Button ,Space  } from 'antd';
import Sidebar from '../dashboard/sidebar';
import Headers from '../dashboard/header';
// const { Link } = Anchor;
const { Content } = Layout;

const Customer = ()=> {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [Customers, setCustomer]= useState([]);

  const columns = [ { title: 'ID',dataIndex: 'id' }, { title: 'Customers Name',dataIndex: 'name'}, { title: 'Customers Email',dataIndex: 'email'}, { title: 'Customers Phone',dataIndex: 'phone'}, { title: 'Customers Address',dataIndex: 'address'}, { title: 'Customers Company',dataIndex: 'company'},  
  {
    title: 'Action',
    dataIndex: 'did',
    key: 'did',
    render: (did) => (
      <Space size="middle">
        <Button href={"http://localhost:3000/edit_customer/"+did}>Edit</Button> 
        <Button danger onClick={()=>deleteProduct(did)}>Delete</Button>
      </Space>
     ),
  },];
  
  const data = [];
   Customers.map((customer) =>[ data.push({id:customer.id,name:customer.customer_name, email:customer.customer_email, phone:customer.customer_phone, address:customer.customer_address,company:customer.company_name, did:customer.id})]);
  //  console.warn(data);


  const deleteProduct =async (did)=>{
    let result =await fetch(`http://127.0.0.1:8000/delete_customer/${did}`,{
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

  const data = await fetch(`http://127.0.0.1:8000/customers`);
  
    if (!data.ok){
      throw new Error('Could not data exist');
    }
    //return data.json();
    let res = await data.json();
    // console.warn(res);
    setCustomer(res);
  };
  
    return (
        <Layout style={{ minHeight: '100vh'}}>
         <Sidebar />
          <Layout>
            <Headers />

            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, }} >
              <Button style={{ float: 'right', margin: 20}} type="primary" href="http://localhost:3000/add_customer">Add Customer</Button>

              <Table  columns={columns}  dataSource={data}  scroll={{ x: 1500, y: 600, }} />
            </Content>


          </Layout>
        </Layout>  
  );

}
  
export default Customer;




