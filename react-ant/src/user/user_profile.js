import React, { useState, useEffect } from 'react';
import { Layout,Table, Button, Image, Typography, Col } from 'antd';
import Sidebar from '../components/dashboard/sidebar';
import Headers from '../components/dashboard/header';
import { useParams,useNavigate } from 'react-router-dom';
import ProfileModal from './profile_modal';
import RollModal from './roll_modal';
const { Title } = Typography;
const {  Content } = Layout;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible1: false
    };
    this.state ={ username:undefined, userimg:undefined };
  }

  handleModal = (status1) => {
    this.setState({
      visible1: status1
    });
  };


// Mount for fetch info


async getuser(){
  const auth= JSON.parse(localStorage.getItem('user'));
  const url=`http://127.0.0.1:8000/get_me/${auth}`
  const res=await fetch(url)
  const data= await res.json()
  this.setState({username:data.user_name, userimg:data.user_img})
      // console.log(data);

}


async componentDidMount(){
  this.getuser();
  // this.fetchInfo();
}
  
render(){

  const name =this.state.username;
  const img =this.state.userimg;
  // console.log(name);

  return (
    <>
      <Layout style={{ minHeight: '100vh'}}>
        <Sidebar />
        <Layout>
          <Headers />
          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280,  overflow: "hidden" }} >
          
            <Col style={{ width: 200, position: 'absolute' }}>
              <Image style={{ width: 180 }} src={'/images/'+img} />
              <Title level={3} style={{ width: 180, textAlign: 'center' }}>{name}</Title>
              <Button style={{ width: 180 }} onClick={() => this.handleModal(true)}>Edit User Profile</Button>
            </Col>

            <ProfileModal visible={this.state.visible1} handleModal={this.handleModal} />

          </Content>
        </Layout>
    </Layout>
    </>
  );
};

};



export default Profile;