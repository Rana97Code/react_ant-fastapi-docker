import React, { useState, useEffect } from "react";
import { LockOutlined,InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Table ,Card, Space, theme, Row } from 'antd';
import Sidebar from './sidebar';
import Headers from './header';
import { useParams,useNavigate } from 'react-router-dom';

import _ from 'lodash';
import moment from 'moment';

// const { Link } = Anchor;
const {  Content } = Layout;


function Dashb() {
  const params = useParams();   ///FOR Parameter Pass
  const { token: { colorBgContainer }, } = theme.useToken();
  const navigate = useNavigate(); //for redirect

  const [ExpServicen, setExpireservn]= useState([]); 
  const [ExpService, setExpireserv]= useState([]); 
  const [Servi, setService]= useState([]); 
  const [serviceco, setServiceco]= useState([]); 
  const [Custom, setCustomer]= useState([]); 
  const [Customco, setCustomerco]= useState([]); 

  const getData = async () => {
    const service = await fetch( `http://127.0.0.1:8000/Provided_services`);
    const customer = await fetch( `http://127.0.0.1:8000/customers`);
  
    if (!service.ok & !customer.ok){
      alert("There is no data")
    }
    let servc = await service.json();

    const now = new Date();
    const date =moment(now).format('YYYY-MM-DD');
    const addmonth =moment(date).add(1, 'M');
    const nextmonth = addmonth.format('YYYY-MM-DD');

    const filtered = _.filter(servc, (o) => {
      return moment(o.expiry_date, 'YYYY-MM-DD')
        .isBetween(moment(date), moment(nextmonth));
    });

    // console.log(date, nextmonth);
    // console.log(filtered);
    const exsrvc = _.size(filtered);
    setExpireservn(exsrvc);
    setExpireserv(filtered);


    const srvc = _.size(servc);
    setServiceco(srvc);
    setService(servc);


    let cust = await customer.json();
    const cstmr = _.size(cust);
    setCustomerco(cstmr);
    setCustomer(cust);


    // For Recursion
    const recurs = _.filter(servc, {'expiry_date':date , 'auto_renew':'YES'});
    const s_id = _.map(recurs, 'id');
    const auto_id= s_id.toString();
    // const test = auto_id.replace("\\'", " ");
    console.log({auto_id});
    if(auto_id){
      let resu = await fetch(`http://127.0.0.1:8000/update_service/${auto_id}`,{
          method: 'put',
      });
      if(resu.ok){
        navigate('/')
      }
    }


  };



  useEffect(()=>{
    getData();
    
    },[])  


    const excolumns = [ { title: 'ID',dataIndex: 'id' }, { title: 'Service Name',dataIndex: 'sname'}, { title: 'Expiry Date',dataIndex: 'ed'} , { title: 'Renew Date',dataIndex: 'rd'}];
    const edata = [];
    ExpService.map((esrv) =>[ edata.push({id:esrv.id, sname:esrv.product_name, ed:esrv.expiry_date, rd:esrv.renew_date})]);

    const scolumns = [ { title: 'ID',dataIndex: 'id' }, { title: 'Service Name',dataIndex: 'sname'}, { title: 'Notification Type',dataIndex: 'nt'} ];
    const sdata = [];
    Servi.map((srv) =>[ sdata.push({id:srv.id, sname:srv.product_name, nt:srv.notification_type})]);

    const ccolumns = [ { title: 'ID',dataIndex: 'id' }, { title: 'Customer Name',dataIndex: 'name'}, { title: 'Company Name',dataIndex: 'com'} ];
    const cdata = [];
    Custom.map((cus) =>[ cdata.push({id:cus.id, name:cus.customer_name, com:cus.company_name})]);

  return (
    <Layout style={{ minHeight: '100vh'}}>
        <Sidebar />
        <Layout>
          <Headers />

          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, overflow: "hidden" }} >
           
            <Space direction="horizonal" >
              <Row>
                <Card className="dCard" title="Services will Expire Soon"  extra={<a style={{color: 'black'}} href="/service">More</a>}  style={{ background: '#08979c', overflow: 'hidden' }} >
                  <h3 style={{color: 'white', paddingBottom: 8}}>Services will be Expired: {ExpServicen}</h3>
                  <Table className="dTable" columns={excolumns}  dataSource={edata}  scroll={{ x: 400, y: 150, }} />
                </Card>
                <Card className="dCard" title="Service List"  extra={<a style={{color: 'black'}} href="/service">More</a>}  style={{ background: '#096dd9', overflow: 'hidden' }} >
                  <h3 style={{color: 'white', paddingBottom: 8}}>Number Of Service : {serviceco}</h3>
                  <Table className="dTable" columns={scolumns}  dataSource={sdata}  scroll={{ x: 400, y: 150, }} />

                </Card>
                <Card className="dCard" title="Customer List"  extra={<a  style={{color: 'black'}} href="/customer">More</a>}  style={{ background: '#3f6600', overflow: 'hidden' }} >
                  <h3 style={{color: 'white', paddingBottom: 8}}>Number Of Customer : {Customco}</h3>
                  <Table className="dTable" columns={ccolumns}  dataSource={cdata}  scroll={{ x: 400, y: 150, }} />
                </Card>
              </Row>
            </Space>

          </Content>

     
        </Layout>
    </Layout>  );
}

export default Dashb;
