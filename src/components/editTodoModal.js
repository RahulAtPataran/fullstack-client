import React, { Component, useState, useEffect } from 'react';
import Modal from 'react-modal';

import * as ACTIONS from "../reduxweb/actions";
import { connect } from "react-redux";
import DateTimePicker from 'react-datetime-picker';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    height                : '50vh',
    borderRadius          : '20px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const EditModal=(props)=>{

    
  const   [ eventName,setEventName]=useState('')
  const [eventDate,setEventDate]=useState('')
  const  [eventType,setEventType]=useState('')
  const  [description,setDescription]=useState('')
  const [location,setLocation]=useState('')
   

useEffect(()=>{
  fetch("http://localhost:4000/api/event/getEvent/"+props.item,
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + props.user.token,
       
      },
      method: "GET",
  
  }).then(res=>res.json()).then(res=>{

      console.log(res)

      setEventName(res.data.eventName)
      setEventDate(res.data.eventDate)
      setEventType(res.data.eventType)
      setDescription(res.data.description)
      setLocation(res.data.location);

  }).catch(error=>{
      alert(error);
  })
},[])
const edit=()=>{
  const item={
    id:props.item,
    eventName,
    eventDate,
    eventType,
    description,
    location,
    
   }

   fetch("http://localhost:4000/api/event/edit",
   {
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + props.user.token,
        
       },
       method: "POST",
       body: JSON.stringify(item)
   }).then(res=>res.json()).then(res=>{

       console.log(res)
       props.close()

   }).catch(error=>{
       alert(error);
   })



   
}

    return (
    <Modal
          isOpen={props.isOpen}
          onAfterOpen={props.afterOpen}
          onRequestClose={props.close}
          style={customStyles}
          contentLabel="Edit Todo"
          overlayClassName="Overlay"
        >
  <div className='modals'>
             <div className='modalItem'>
                 <label for='name'>Name of Event</label>
            <input className='inputs' name='name' placeholder='' value={eventName} onChange={(e)=>setEventName(e.target.value)} />
    </div>
         
         <div className='modalItem'>
         <label for='date'>Date</label>
         <DateTimePicker
        onChange={(date)=>setEventDate(date)}
        value={eventDate}
      />
</div>

<div className='modalItem'>
                 <label for='name'>Event Description</label>
            <input className='inputs' name='name' placeholder='' value={description} onChange={(e)=>setDescription(e.target.value)} />
    </div>

    
             <div className='modalItem'>
                 <label for='name'>Event Type</label>
            <input className='inputs' name='name' placeholder='' value={eventType} onChange={(e)=>setEventType(e.target.value)} />
    </div>

  
             <div className='modalItem'>
                 <label for='name'>Event Location</label>
            <input className='inputs' name='name' placeholder='' value={location} onChange={(e)=>setLocation(e.target.value)} />
    </div>

            <button className='modalButton' type='button' onClick={edit}>Edit Event</button>
           
          </div>
        </Modal>
)
}

const mapStateToProps = state => ({
  user:state.user.data
  });
  
  const mapDispatchToProps = dispatch => ({
    editItem: item => dispatch(ACTIONS.editEvent(item)),
  
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditModal);