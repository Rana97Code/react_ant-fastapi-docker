import React, { useState, Component } from 'react';
import { Layout,theme, Button, Modal, Calendar } from 'antd';
import Sidebar from '../components/dashboard/sidebar';
import Headers from '../components/dashboard/header';
import { useParams,useNavigate } from 'react-router-dom';
import ProfileModal from './profile_modal';
// const { Link } = Anchor;
const {  Content } = Layout;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleModal = (status) => {
    this.setState({
      visible: status
    });
  };
  
render(){
  return (
    <>
      <Layout style={{ minHeight: '100vh'}}>
        <Sidebar />
        <Layout>
          <Headers />
          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280,  overflow: "hidden" }} >
           
            <Calendar fullscreen={false} style={{ float: 'right', width: 300 }} />
            <Button onClick={() => this.handleModal(true)}>User Details</Button>
            <ProfileModal visible={this.state.visible} handleModal={this.handleModal} />

          </Content>
        </Layout>
    </Layout>
    </>
  );
};
};
export default Profile;