import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LogoutOutlined  } from '@ant-design/icons';
import { Layout, Dropdown,  Button, Modal , theme, Space, Spin } from 'antd';
import '../../App.css';
import jwtDecode from 'jwt-decode'


// const { Link } = Anchor;
const { Header } = Layout;


const Headers = () => {
  const [profile, setProfile] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { token: { colorBgContainer }, } = theme.useToken();

  const navigate = useNavigate(); //for redirect

  useEffect(() =>{

    const auth= JSON.parse(localStorage.getItem('user'));
    setProfile(auth)


    // For Auto Refresh
    const interval = setInterval(() => {

      const user= JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('usertoken');
      if(token&&user){
        const jwt = jwtDecode(token);
        var current_time = Date.now() / 1000;
        if ( jwt.exp < current_time) {
          localStorage.clear();
        }else{
          console.log("Token is Valid")
        }
      }else{
        navigate("/signin")
      }
     },60*1000);
     return () => clearInterval(interval);


    
  }, [])


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logout=()=>{
    localStorage.clear();
    navigate("/signin");
    }

  const items = [
    { icon: <Button style={{ width: 130 }} onClick={showModal} ><Spin />Edit Profile</Button>},
    { label: 'User Name',  key: '3', icon: <UserOutlined />, danger: true,disabled: true },
    { label: profile,  key: '4',  icon: <MailOutlined />,disabled: false, },
    { key: '5', icon: <Button style={{ width: 130, background: 'red' }} onClick={logout} ><LogoutOutlined />Log Out</Button>, danger: true },
  ];
  

  const menuProps = {
    items,
    // onClick: logout,
  };



  return (

        <Header style={{ padding: 0,  background: "#006d75", display: 'block', overflow: "hidden" }}  >
          <Space wrap style={{ float: 'right', margin: 14, marginRight: 40 }}> 
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}  > 
              {profile}
            </Dropdown.Button>
          </Space>


          {/* User Profile Modal */}
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
              <Button key="back" onClick={handleCancel}> Return </Button>,
              <Button key="submit" type="primary" onClick={handleOk}> Submit </Button>,
            ]}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          </Modal>
        </Header>



  );
};
export default Headers;