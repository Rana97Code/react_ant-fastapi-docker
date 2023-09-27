// import React, { Component } from 'react';
// import { Layout,Table, Button, Image, Typography, Col } from 'antd';

// import Sidebar from '../components/dashboard/sidebar';
// import Headers from '../components/dashboard/header';

// class CheckboxForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             checkboxData: [
//                 { id: 1, label: 'Option 1', isChecked: false },
//                 { id: 2, label: 'Option 2', isChecked: false },
//                 { id: 3, label: 'Option 3', isChecked: false },
//                 // Add more options as needed
//             ],
//         };
//     }

//     handleCheckboxChange = (id) => {
//         this.setState((prevState) => ({
//             checkboxData: prevState.checkboxData.map((checkbox) =>
//                 checkbox.id === id
//                     ? { ...checkbox, isChecked: !checkbox.isChecked }
//                     : checkbox
//             ),
//         }));
//     };

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const selectedCheckboxes = this.state.checkboxData
//             .filter((checkbox) => checkbox.isChecked)
//             .map((checkbox) => checkbox.label);
        
//         // Submit or process selectedCheckboxes as needed
//         console.log('Selected Checkboxes:', selectedCheckboxes);
//     };

//     render() {
//         return (

//             <Layout style={{ minHeight: '100vh'}}>
//             <Sidebar />
//             <Layout>
//               <Headers />
//             <form onSubmit={this.handleSubmit}>
//                 {this.state.checkboxData.map((checkbox) => (
//                     <div key={checkbox.id}>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 value={checkbox.label}
//                                 checked={checkbox.isChecked}
//                                 onChange={() => this.handleCheckboxChange(checkbox.id)}
//                             />
//                             {checkbox.label}
//                         </label>
//                     </div>
//                 ))}
//                 <button type="submit">Submit</button>
//             </form>
//             </Layout>
//     </Layout>
//         );
//     }
// }

// export default CheckboxForm;


import React, { useState, useEffect } from 'react';
import { Checkbox, Divider, Layout,Button } from 'antd';
import Sidebar from '../components/dashboard/sidebar';
import Headers from '../components/dashboard/header';
import { useNavigate, useParams } from 'react-router-dom';


const CheckboxGroup = Checkbox.Group;


const CheckboxForm = () => {
  const navigate = useNavigate(); //for redirect

  const [usrroles, setUsrRoles] = useState([]);
  const [roles, setRoles] = useState([]);

  const defaultCheckedList1 = usrroles.map((rollacc) =>rollacc.id);

  const plainOptions = roles.map((rollacc) => rollacc.id);
//   const defaultCheckedList = [1, 4];
  const defaultCheckedList = defaultCheckedList1;
//   console.log(defaultCheckedList);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;


  const getUnit = async () => {

    const url=`http://127.0.0.1:8000/get_all_access/${1}`
    const res1=await fetch(url)
    const data1= await res1.json()
    setUsrRoles(data1);


    const data = await fetch(`http://127.0.0.1:8000/rolls`);
    if (!data.ok){
      throw new Error('Could not data exist');
    }
    let res = await data.json();
    setRoles(res);

  };

  const Update =  async() => {
    const user_type = 2;
    const role_id = checkedList;
    console.log(role_id);
    let result = await fetch(`http://127.0.0.1:8000/update_user_access/${user_type}`,{
        method: 'put',
        body:JSON.stringify({user_type,role_id}),
        headers:{
            'Content-type':'application/json',
        }
    });
    if(result.ok){
        const data = await result.json();
        // alert("Add Successfully")
        navigate('/check')
      }else{
        alert('Data not Update');
        navigate('/check')
      }
  
  }

  useEffect(()=>{
    getUnit();
    // Update();
    },[])  


  const onChange = (list) => {
    setCheckedList(list);
    // console.log(list);

  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };


  return (
    <>     
    <Layout style={{ minHeight: '100vh'}}>
        <Sidebar />     
        <Layout>
        <Headers />
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />

      <Button style={{ width: '100px'}} onClick={Update}>Submit</Button>

      </Layout>
    </Layout>
    </>
  );
};
export default CheckboxForm;
