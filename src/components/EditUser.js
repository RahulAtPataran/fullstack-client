import React, { Component, useState, useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import * as ACTIONS from "../reduxweb/actions";
import { connect } from "react-redux";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    height                : '40vh',
    borderRadius          : '20px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const EditUser=(props)=>{

    
  const [id,setId]=useState("");
  const [first_name,setFirst_name]=useState("");
  const [last_name,setLast_name]=useState("");
  const [email,setEmail]=useState('');


useEffect(()=>{
   
      fetch("https://calendlio.sarayulabs.com//api/me",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + props.user.auth_token,
            'Access-Control-Allow-Origin':'*'
          },
          method: "GET",
       
       
      }).then(res=>res.json()).then(res=>{
    
     setEmail(res.email)
     setFirst_name(res.first_name)
     setLast_name(res.last_name)
     setId(res.id)
    
       
    
         
      
      
      
      }).catch(error=>{
          alert(error);
      })

   
},[])
const edit=()=>{
  fetch("https://calendlio.sarayulabs.com/api/me",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + props.user.auth_token,
        'Access-Control-Allow-Origin':'*'
      },
      method: "PATCH",
      body: JSON.stringify({
        "first_name": first_name,
        "last_name": last_name
    }
    )
  }).then(res=>res.json()).then(res=>{

      console.log(res)

   

     
  
  
  
  }).catch(error=>{
      alert(error);
  })

  
     
     props.close()
}

    return (
      <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.afterOpen}
      onRequestClose={props.close}
      style={customStyles}
      contentLabel="Create Todo"
      overlayClassName="Overlay"
    >

     <div className='modals'>
         <div className='modalItem'>
             <label for='name'>First Name</label>
        <input className='inputs' name='name' placeholder='' value={first_name} onChange={(e)=>setFirst_name(e.target.value)} />
</div>
     
<div className='modalItem'>
             <label for='name'>Last Name</label>
        <input className='inputs' name='name' placeholder='' value={last_name} onChange={(e)=>setLast_name(e.target.value)} />
</div>

<div className='modalItem'>
             <label for='name'>email</label>
        <input className='inputs' name='name' placeholder='' value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
</div>
  

        <button className='modalButton' type='button' onClick={edit}>Edit Profile</button>
       
      </div>
    </Modal>
)
}

const mapStateToProps = state => ({
  user:state.user
  });
  
  const mapDispatchToProps = dispatch => ({
    editItem: item => dispatch(ACTIONS.editEvent(item)),
  
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditUser);