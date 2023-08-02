import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommentOutlined,MenuFoldOutlined,AppstoreOutlined , MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined,SettingOutlined  } from '@ant-design/icons';
import { Layout, Menu,Anchor, Dropdown,  Button, theme,Space } from 'antd';
const { Link } = Anchor;
const { Header, Sider, Content } = Layout;


const AppLayout = () => {
  const [profile, setProfile] = useState()


  const [collapsed, setCollapsed] = useState(false);

  const { token: { colorBgContainer }, } = theme.useToken();

  const navigate = useNavigate(); //for redirect

  useEffect(() =>{
    const auth= JSON.parse(localStorage.getItem('user'));
    setProfile(auth)
    if(!auth){
      navigate("/signin")
    }

  })


  const items = [
    { label: 'User Name',  key: '3', icon: <UserOutlined />, danger: true, },
    { label: 'User Email',  key: '4',  icon: <UserOutlined />,  danger: true,disabled: true, },
    { label: 'Log Out',  key: '4', icon: <UserOutlined />, danger: true, },
  ];
  
  // const handleMenuClick = (e) => {
  //   message.info('Click on menu item.');
  //   console.log('click', e);
  // };

  const logout=()=>{
    localStorage.clear();
    navigate("/signin");
    }

  const menuProps = {
    items,
    onClick: logout,
  };



  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
          items={[
            {  icon:<CommentOutlined /> },
            { key: '1', icon: <Link href="/dashboard"> <AppstoreOutlined /> &emsp;  Dashboard </Link> },
            { key: '3',icon: <Link href="/customer"> <UploadOutlined /> &emsp;  Customers </Link>},
            { key: '2', icon: <Link  href="/service" > <VideoCameraOutlined /> &emsp;  Services </Link >},
            { key: '4',icon: <Link  href="/setting" > <SettingOutlined  />  &emsp;  Settings </Link> },
          ]}
        />
      </Sider>

  

      <Layout>
        <Header style={{ padding: 0,  background: colorBgContainer,  }}  >
          <Button  type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{  fontSize: '16px',  width: 64,  height: 64 }}
          />
          <Space wrap style={{ float: 'right', margin: 14, marginRight: 40}}> 
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}  > 
              {profile}
            </Dropdown.Button>
          </Space>
        </Header>


        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, }} >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;