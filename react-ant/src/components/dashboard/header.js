import React, { useState, useEffect  } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { UserOutlined, MailOutlined ,MobileOutlined, LogoutOutlined  } from '@ant-design/icons';
import { Layout, Dropdown, Form, Input, Col, Row, Button, Modal, Tooltip, theme, Space, Spin, Upload  } from 'antd';
import '../../App.css';
import jwtDecode from 'jwt-decode'
import Profile from '../../user/user_profile';


// const { Link } = Anchor;
const { Header } = Layout;


const Headers = () => {
  const [profile, setProfile] = useState()
  const [id,setId]=useState("");
  const [user_name,setName]=useState("");
  const [user_email,setEmail]=useState("");
  const [user_phone,setPhone]=useState("");

  // const [isModalOpen, setIsModalOpen] = useState(false);


  const { token: { colorBgContainer }, } = theme.useToken();

  const params = useParams();   ///FOR Parameter Pass
  const navigate = useNavigate(); //for redirect

  // const u_email = profile;
  // const getUserDetails = async()=>{
  //   let result = await fetch( `http://127.0.0.1:8000/get_me/${u_email}`,{
  //     method: 'get',
  //     headers:{
  //         'Content-type':'application/json',
  //     }
  //   });
  //   if(result.ok){
  //     const data = await result.json();
  //     console.warn(data);
  //     if(data){
  //     setName(data.user_name)    
  //     setEmail(data.user_email)
  //     setPhone(data.user_phone)
  //     setId(data.id)
  //     }
  //     }
  //   }

  //   const u_id = id;

  //   const onSubmit = async (e)=>{
  //     console.warn(user_name,user_email);
  //     // const user_id= JSON.parse(localStorage.getItem('user'))._id;   //for get logedin userid
  //     let result = await fetch(`http://127.0.0.1:8000/update_user/${u_id}`,{
  //         method: 'put',
  //         body:JSON.stringify({user_name,user_email}),
  //         headers:{
  //             'Content-type':'application/json',
  //             // authorization: `bearer ${JSON.parse(localStorage.getItem('usertoken'))}` //for using middleware authontigation
  //         }
  //     });
  //     if(result.ok){
  //         const data = await result.json();
  //         // alert("Add Successfully")
  //         navigate('/dashboard')
  //       }
    
  // }

  useEffect(() =>{

    const auth= JSON.parse(localStorage.getItem('user'));
    setProfile(auth)

    // getUserDetails();
    
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


  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const showProfile=()=>{
    navigate("/profile");
    }

  const logout=()=>{
    localStorage.clear();
    navigate("/signin");
    }

  const items = [
    { icon: <Button style={{ width: 130 }}  ><Spin />Edit Profile</Button>},
    { icon: <Button style={{ width: 130 }} onClick={showProfile} >Profile Details</Button>},
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
          {/* <Button onClick={() => this.handleModal(true)}>New Modal</Button> */}
          <Space wrap style={{ float: 'right', margin: 14, marginRight: 40 }}> 
            {/* <Button onClick={showModal} >modal</Button> */}
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}  > 
              {profile}
            </Dropdown.Button>
          </Space>

          {/* <User_Profile open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  handleShowB={() => setShowB(false)} /> */}
          {/* User Profile Modal */}
          
          {/* <Profile visible={this.state.visible} handleModal={this.handleModal} /> */}
        </Header>

  );
};

export default Headers;