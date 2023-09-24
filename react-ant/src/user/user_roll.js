import React, { useState, useEffect } from 'react';
import { Layout,Table, Button, Radio, Typography, Col, Form, Input } from 'antd';
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
      rollinfo:[],
      radio: 1,
      accessinfo: []

    };
  }


  rollModal = (status2) => {
    this.setState({
      visible2: status2
    });
  };


 async handle(e) {
    // alert(e.target.value);
    const rvalue = e.target.value;
    console.log(rvalue);
  
    if(rvalue == 2){
      const url=`http://127.0.0.1:8000/get_all_access/${rvalue}`
      const res=await fetch(url)
      const data= await res.json()
      this.setState({accessinfo:data})
    }else if(rvalue == 1){
      const url=`http://127.0.0.1:8000/get_all_access/${rvalue}`
      const res=await fetch(url)
      const data= await res.json()
      this.setState({accessinfo:data})
    }  
  };

// Mount for fetch info


async fetchInfo(){
  const url=`http://127.0.0.1:8000/rolls`
  const res=await fetch(url)
  const data= await res.json()
  this.setState({rollinfo:data})
  // console.log(data);
  this.setState({accessinfo:data})
}

async componentDidMount(){
  this.fetchInfo();
  // this.handle();
}
  
render(){

  const info = this.state.rollinfo;
  const columns = [{  title: 'Role Tag', dataIndex: 'rt' }, { title: 'Role Details', dataIndex: 'rd', }];
  const data = [];
  info.map((roll) =>[ data.push({rt:roll.roll_tag, rd:roll.roll_details})]);

  const uaccess = this.state.accessinfo;
  console.log(uaccess);
  const acccolumns = [{ title: 'Roles', dataIndex: 'rd', }];
  const accdata = [];
  uaccess.map((rollacc) =>[ accdata.push({rd:rollacc.roll_details})]);

  const usr = this.state.radio;
  // console.log(usr);

  return (
    <>
      <Layout style={{ minHeight: '100vh'}}>
        <Sidebar />
        <Layout>
          <Headers />
          <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, width: 1400, overflow: "hidden" }} >
          
            <Col style={{ width: 700, marginLeft: 20, position: 'absolute'  }}>
              <Title style={{ position: 'absolute'}}>User Roles</Title> 
              <Button style={{  marginLeft: 500 }} onClick={() => this.rollModal(true)}>Add Roll</Button>
              <Table style={{ width: 600, paddingTop: 50}} rowSelection={{ ...rowSelection, }} columns={columns} dataSource={data}/>
            </Col>

            <Col style={{ width: 400, float: 'right'  }}>
              <Title style={{ position: 'absolute'}}>User Access</Title> 
              <Radio.Group style={{ marginTop: 70}} onChange={(e)=>this.handle(e)} defaultValue={usr} >
                <Radio value={1}>Super Admin</Radio>
                <Radio value={2}>User</Radio>
              </Radio.Group>
  
              {/* <Table style={{ width: 400, paddingTop: 20}} rowSelection={{ ...rowSelection, }} columns={acccolumns} dataSource={accdata}/> */}

              <Form.Item label="Check Access">
                <Radio.Group>
                   {uaccess.map((acces) =>(
                     <Radio value={acces.id}> {acces.roll_details} </Radio>
                  ))}
                  {/* <Radio value="pear"> Pear </Radio>
                  <Radio value="pear"> Pear </Radio>
                  <Radio value="pear"> Pear </Radio>
                  <Radio value="pear"> Pear </Radio>
                  <Radio value="pear"> Pear </Radio>
                  <Radio value="pear"> Pear </Radio> */}
                </Radio.Group>
              </Form.Item>

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