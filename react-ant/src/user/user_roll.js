import React, { useState, useEffect } from 'react';
import { Layout,Table, Button, Radio, Typography,Anchor, Col, Form, Input, Checkbox } from 'antd';
import Sidebar from '../components/dashboard/sidebar';
import Headers from '../components/dashboard/header';
import { useParams,useNavigate } from 'react-router-dom';
import ProfileModal from './profile_modal';
import RollModal from './roll_modal';
const { Title } = Typography;
const {  Content } = Layout;
const { Link } = Anchor;
const CheckboxGroup = Checkbox.Group;


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
}



class UserRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      rollinfo:[],
      radio: 1,
      accessinfo: [],
      // defaultinfo: [],
      checkedList: []
      

    };
    // this.handleCheck = this.handleCheck.bind(this);
  }


  rollModal = (status2) => {
    this.setState({
      visible2: status2
    });
  };

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
    // this.checkvalue();
  }


 async handle(e) {
    // alert(e.target.value);
    const rvalue = e.target.value;
    // console.log(rvalue);
  
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

// async handleCheck(e){
//   this.setState({defaultinfo:e.target.list});
//   console.log(`checked = ${e.target.list}`);
// }



  
render(){

  const info = this.state.rollinfo;
  const columns = [{  title: 'Role Tag', dataIndex: 'rt' }, { title: 'Role Details', dataIndex: 'rd', }];
  const data = [];
  info.map((roll) =>[ data.push({rt:roll.roll_tag, rd:roll.roll_details})]);

  const plainOptions = info.map((rollacc) =>rollacc.roll_details);
  const defaultv = this.state.accessinfo;
  const defaultCheckedList = defaultv.map((rollacc) =>rollacc.roll_details);

  const d = plainOptions.length;
  console.log(d);
  console.log(this.state.rollinfo.length);
  const checkAll = plainOptions.length === this.state.rollinfo.length;
  const indeterminate = this.state.accessinfo.length > 0 && this.state.accessinfo.length < plainOptions.length;

  const handleCheck = (list) => {
    this.setState({checkedList:list});
  };

  const onCheckAllChange = (e) => {
    // alert()
    this.setState({accessinfo:e.target.checked ? plainOptions : []});
  };

  // const defaultCheckedList = ['Renew Expired Service', 'Customer Insert'];
  // console.log(defaultCheckedList);

  const chackedv = this.state.defaultinfo;
  console.log(chackedv);


  const usr = this.state.radio;
  // console.log(usr);



  const Options = ['Apple', 'Pear', 'Orange'];
  const defaultList = ['Apple', 'Orange'];
  // this.setState({checkedList:defaultList});
  const indeter = this.state.checkedList.length > 0 && this.state.checkedList.length < Options.length;
  const All = Options.length === this.state.checkedList.length;
  const newcheck = (list) => {
    this.setState({checkedList:list});
  };
  const oncheck = (e) => {
    // alert()
    this.setState({checkedList:e.target.checked ? Options : []});
  };
  



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

            <Col style={{ width: 400, float: 'right' }}>
              <Title style={{ position: 'absolute'}}>User Access</Title> 
              <Radio.Group style={{ marginTop: 70, marginBottom: 30}} onChange={(e)=>this.handle(e)} defaultValue={usr} >
                <Radio value={1}>Super Admin</Radio>
                <Radio value={2}>User</Radio>
              </Radio.Group>
  
              {/* <Table style={{ width: 400, paddingTop: 20}} rowSelection={{ ...rowSelection, }} columns={acccolumns} dataSource={accdata}/> */}

              <Form.Item label="Check Access">
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                  Check all
                </Checkbox>
                <CheckboxGroup options={plainOptions} value={defaultCheckedList} onChange={handleCheck} />
              </Form.Item>

              <Button style={{  margin: 50 }} onClick={() => this.rollModal(true)}>Update Access</Button>


              <Form.Item label="Check Access">
                <Checkbox indeterminate={indeter} onChange={oncheck} checked={All}>
                  Check all
                </Checkbox>
                <CheckboxGroup options={Options} value={defaultList} onChange={newcheck} />
              </Form.Item>

              <a href="/check">Access Role</a>

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