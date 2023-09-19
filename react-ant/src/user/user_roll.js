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

class UserRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //   visible1: false,
      visible2: false,
      rollinfo:[]
    };
  }


  rollModal = (status2) => {
    this.setState({
      visible2: status2
    });
  };

// Mount for fetch info


async fetchInfo(){
  const url=`http://127.0.0.1:8000/rolls`
  const res=await fetch(url)
  const data= await res.json()
  this.setState({rollinfo:data})
  // console.log(data);
}

async componentDidMount(){
  this.fetchInfo();
}
  
render(){

  // console.log(name);

  const info = this.state.rollinfo;
  const columns = [ {  title: 'Roll Tag', dataIndex: 'rt' }, { title: 'Roll Details', dataIndex: 'rd', }];
  const data = [];
  info.map((roll) =>[ data.push({rt:roll.roll_tag, rd:roll.roll_details})]);

  return (
    <>
      <Layout style={{ minHeight: '100vh'}}>
        <Sidebar />
        <Layout>
          <Headers />
          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280,  overflow: "hidden" }} >
          
            <Col style={{ width: 700, marginLeft: 20, position: 'absolute'  }}>
              <Title style={{ position: 'absolute'}}>User Rolls</Title> 
              <Button style={{  marginLeft: 500 }} onClick={() => this.rollModal(true)}>Add Roll</Button>
              <Table style={{ width: 600, paddingTop: 50}} rowSelection={{ ...rowSelection, }} columns={columns} dataSource={data}/>
            </Col>

            <Col style={{ width: 600, float: 'right'  }}>
              <Title style={{ position: 'absolute'}}>User Access</Title> 
              <Table style={{ width: 400, paddingTop: 50}} rowSelection={{ ...rowSelection, }} columns={columns} dataSource={data}/>
            </Col>

            <RollModal visible={this.state.visible2} rollModal={this.rollModal} />

          </Content>
        </Layout>
    </Layout>
    </>
  );
};

};



export default UserRoll;