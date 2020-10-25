import React, { Component, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import * as ACTIONS from "../reduxweb/actions";
import { connect } from "react-redux";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    height                : '50vh',
    borderRadius          : '20px',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
   
  }
};


const AddModal=(props)=>{

 const   [ eventName,setEventName]=useState('')
   const [eventDate,setEventDate]=useState('')
   const  [eventType,setEventType]=useState('')
   const  [description,setDescription]=useState('')
   const [location,setLocation]=useState('')
    

    const create=()=>{




       const item={
        eventName,
        eventDate,
        eventType,
        description,
        location,
        
       }

       fetch("http://localhost:4000/api/event/add",
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
   
       }).catch(error=>{
           alert(error);
       })



   
   

        props.close();
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

            <button className='modalButton' type='button' onClick={create}>Create Event</button>
           
          </div>
        </Modal>
)
}

const mapStateToProps = state => ({
  user:state.user.data
});

const mapDispatchToProps = dispatch => ({
  createItem: item => dispatch(ACTIONS.createEvent(item)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddModal);