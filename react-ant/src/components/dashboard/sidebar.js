import React, { useState  } from 'react';
import { AppstoreOutlined ,  MenuFoldOutlined , MenuUnfoldOutlined, PlusOutlined,SettingOutlined, CreditCardOutlined ,UsergroupAddOutlined,DeploymentUnitOutlined  } from '@ant-design/icons';
import { Layout, Menu,Anchor, Button, Image  } from 'antd';

const { Link } = Anchor;
const { Sider } = Layout;

function getItem(label, key, icon, children, type) { return {  key, icon, children, label, type, };}


const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(false);


  return (
      <Sider trigger={null} collapsible collapsed={collapsed} >
          <Image  width={200} height={65} style={{}} src="/images/logo.jpg" />
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{  fontSize: '16px',  width: 64,  height: 64, color: 'white', float: 'right' }}
          />
          

          <Menu theme="dark" mode="inline"
            items={[
              
              { key: '1',icon: <Link href="/"> <AppstoreOutlined /> &emsp;  Dashboard </Link> },
              { key: '2',icon: <Link href="/notification"> <CreditCardOutlined /> &emsp;  Notification Template </Link>},
              { key: '3',icon: <Link href="/customer"> <UsergroupAddOutlined /> &emsp;  Customers </Link>},
              { key: '3',icon: <Link href="/units"> <DeploymentUnitOutlined /> &emsp;  Units </Link>},
              { key: '4',icon: <Link  href="/service" > <PlusOutlined /> &emsp;  Services </Link >},
              getItem('Settings', 'sub4',  <SettingOutlined />, [
                getItem( <Link  href="/sms" >SMS API</Link >),
                getItem(<Link  href="/smtp" >SMTP</Link >),
              
              ]),

            ]}
          />

      </Sider>


  );
};
export default Sidebar;