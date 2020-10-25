import React, { Component,useState, useEffect } from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client'
import  * as ACTIONS from '../reduxweb/actions'
import {Redirect} from 'react-router-dom'
import './optionPage.css'
import {withRouter} from 'react-router-dom';

  import './todo.css'
  import AddModal from './addTodoModal'
  import EditModal from './editTodoModal'

  import EditUser from './EditUser'
 

  
 
  
  const Events=(props)=>{
    


  const [isAddModalActive,setIsAddModalActive]=useState(false)
  const [isEditModalActive,setIsEditModalActive]=useState(false)
  const [listBy,setListBy]=useState(1);
  const [redirect,setRedirect]=useState(false);
  const [item,setItem]=useState();
  const [events,setEvents]=useState([]);
    const generate = () => {
  
      if(props.items && props.items.length>0)
      {
      return props.items.filter((item)=>{
  
        if(listBy==1)
        {
          return true
        }
        else
        if(listBy==2 && item.isCompleted==false)
        {
          return true
        }
        else
        if(listBy==3 && item.isCompleted==true)
        {
         return true
        }
        return false
  
      }).map(item => (
        <div className={item.isCompleted?"listitem completed":'listitem'} key={item.id}>
        
          <div className='data'>
          <div className='dateItems'>{item.description} </div> 
          <div className='dateItems'>{item.date.toISOString().substring(0, 10)} </div>
  </div>
           <div className='todoicons'>
  
           <img className='listicons' onClick={handleDelete} src={'https://img.icons8.com/cute-clipart/2x/delete-forever.png'} />
             <img className='listicons' onClick={()=>{
               setItem(item);
               setIsEditModalActive(true)}} src={'https://www.flaticon.com/svg/static/icons/svg/3603/3603470.svg'} />
            
             </div>      
            
          </div>
    
      ));
      }
    };
  
    
    useEffect(()=>{


      if(!props.user || !props.user.data)
      {
        console.log("here")
        props.history.push("/");
        return
      
      }


      console.log(props.user.data)

    fetch("http://localhost:4000/api/event/getAll",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + props.user.data.token,
         
        },
        method: "GET",
   
       
  
    }).then(res=>res.json()).then(res=>{
    
      
      console.log(res)
      if (res.success==false)
      {
        if(res.message=='User not loggedIn')
        {
        props.addUser(null);
        setRedirect(true);
        return
        }
      }
     
   setEvents(res.data)
      
   
        
    
      
    
    
    }).catch(error=>{
        alert(error);
    })


    },[])

    const newEvents=()=>{
      fetch("http://localhost:4000/api/event/getAll",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + props.user.data.token,
           
          },
          method: "GET",
     
         
    
      }).then(res=>res.json()).then(res=>{
      
        
        console.log(res)
        if (res.success==false)
        {
          if(res.message=='User not loggedIn')
          {
          props.addUser(null);
          setRedirect(true);
          return
          }
        }
       
     setEvents(res.data)
        
     
          
      
        
      
      
      }).catch(error=>{
          alert(error);
      })
  
 
    }

    const closeModals=()=>
    {
      
        setIsAddModalActive(false)
        setIsEditModalActive(false)
        setIsUserModelActive(false)


       newEvents()
        
    }

    const [isUserEditActive,setIsUserModelActive]=useState(false);
  
    const  handleDelete = event => {
      fetch("http://localhost:4000/api/event/delete",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + props.user.data.token,
           
          },
          method: "DELETE",
          body:JSON.stringify({
            id:event,
          })
     
         
    
      }).then(res=>res.json()).then(res=>{
      
        
        console.log(res)
        if (res.success==false)
        {
          if(res.message=='User not loggedIn')
          {
          props.addUser(null);
          setRedirect(true);
          return
          }
        }

        newEvents();
      
      }).catch(error=>{
          alert(error);
      })
  
    };
  
   
    
      const { classes } = props;
      if(redirect)
      {
        props.history.push("/");
      }
      return (
        <div className='container'>
          <div className='Form_Container'>
            <div className='header'>
          <h1 className='title'>Events's</h1>
          <div className='adddiv'>
  
  <img className='addIcon' onClick={()=>setIsAddModalActive(true)} src={'https://t3.ftcdn.net/jpg/03/59/40/34/240_F_359403494_bFUNC8BUgYEFyYjtgrEV4fRqHby56nIY.jpg'} />
  
          
            </div>
  
          </div>
          <div className='events'>

          <table className='table'>
            <thead>
  <tr>
    <th>Event Name</th>
    <th>Event Date</th>
    <th>Event Type</th>
    <th>Description</th>
    <th>Location</th>
    <th>Edit</th>
    <th>Delete</th>
    
    
  </tr>
 </thead>
 <tbody>
{



events.map(event=>{

  return (

    <tr>
      <td>
{event.eventName}

        </td>

        <td>
{event.eventDate}

        </td>


      <td>
{event.eventType}

        </td>


      <td>
{event.description}

        </td>

      <td>
{event.location}

        </td>
        <td><img className='listicons' onClick={()=>{
             setItem(event._id);
             setIsEditModalActive(true)}} src={'https://www.flaticon.com/svg/static/icons/svg/3603/3603470.svg'} /></td>

             <td><img className='listicons' onClick={()=>handleDelete(event._id)} src={'https://img.icons8.com/cute-clipart/2x/delete-forever.png'} /></td>
    



          


      </tr>



  );




})

}


   </tbody>

</table>
           
          </div>
          </div>
          <AddModal
           isOpen={isAddModalActive}
          
           close={()=>{closeModals()}}
           
          />
          {
            isEditModalActive?
           <EditModal
           isOpen={isEditModalActive}
           item={item}
           close={()=>{closeModals()}}
           
          />:null
          }
{
            isUserEditActive?
           <EditUser
           isOpen={isUserEditActive}
        
           close={()=>{closeModals(false)}}
           
          />:null
          }








<div className='userProf'>

    
          <button className='logout' onClick={()=>{


             props.addUser("");
             props.history.push("/");


          }} type='button'>Logout</button>
 
    </div>
          </div>
      );
    }

  

  
  const mapStateToProps = state => ({
  user:state.user
  });
  
  const mapDispatchToProps = dispatch => ({
    
    deleteItem: id => dispatch(ACTIONS.deleteEvent(id)),
    addUser:(payload)=>{dispatch(ACTIONS.AddUser(payload))}
   
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Events));