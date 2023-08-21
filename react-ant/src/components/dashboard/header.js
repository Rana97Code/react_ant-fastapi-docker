import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined  } from '@ant-design/icons';
import { Layout, Dropdown,  Button, theme,Space } from 'antd';
import '../../App.css';
import jwtDecode from 'jwt-decode'


// const { Link } = Anchor;
const { Header } = Layout;


const Headers = () => {
  const [profile, setProfile] = useState()


  const { token: { colorBgContainer }, } = theme.useToken();

  const navigate = useNavigate(); //for redirect

  useEffect(() =>{

    // For Auto Refresh
    const interval = setInterval(() => {

      const token = localStorage.getItem('usertoken');
      if(token){
        const jwt = jwtDecode(token);
        var current_time = Date.now() / 1000;
        if ( jwt.exp < current_time) {
          localStorage.clear();
        }else{
          console.log("Token is Valid")
        }
      }

      const auth= JSON.parse(localStorage.getItem('user'));
      setProfile(auth)
      if(!auth){
        navigate("/signin")
      }

     },60*1000);
     return () => clearInterval(interval);
    
  }, [])


  const items = [
    { label: 'User Name',  key: '3', icon: <UserOutlined />, danger: true,disabled: true },
    { label: 'User Email',  key: '4',  icon: <UserOutlined />,  danger: true,disabled: true, },
    { label: 'Log Out',  key: '4', icon: <UserOutlined />, danger: true, },
  ];
  


  const logout=()=>{
    localStorage.clear();
    navigate("/signin");
    }

  const menuProps = {
    items,
    onClick: logout,
  };



  return (

        <Header style={{ padding: 0,  background: "#006d75", display: 'block', overflow: "hidden" }}  >
          <Space wrap style={{ float: 'right', margin: 14, marginRight: 40 }}> 
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}  > 
              {profile}
            </Dropdown.Button>
          </Space>
        </Header>

  );
};
export default Headers;