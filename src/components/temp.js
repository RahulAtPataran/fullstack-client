import React, { Component } from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client'
import  * as Actions from '../reduxweb/actions'
import {Redirect} from 'react-router-dom'
import './optionPage.css'
import { response } from 'express';

class OptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
 
 redirect:false,
 socket:null,
 roomId:'',
 users:[],
 userToCall:null,
 callStatus:false,

          }
        this.createRoom=this.createRoom.bind(this);
        this.socket=io('localhost:4000')
        this.joinRoom=this.joinRoom.bind(this);
        this.call=this.call.bind(this)

    }
  call(user)
  {
    let result=window.confirm(`Do You Wish to Call ${user.name}`)
    if(result)
    {
        this.socket.emit('call',{to:user,from:{name:this.props.state.name,email:this.props.state.email}});
        this.setState({userToCall:user})
    }
  }
    componentDidMount()
    {

        this.socket.emit('cJoin',{name:this.props.state.name,email:this.props.state.email});
        this.socket.on('users',({users})=>{

            
            this.setState({users:users});

        })

        this.socket.on('callFrom',(user)=>{
            
            let result=window.confirm(`${user.name} is Calling You,Do you Wish to accept`)
    if(result)
    {
        this.socket.emit('callAnswer',{success:true,status:"Accepted",to:this.props.state.email});
    }
    else
    {
        this.socket.emit('callAnswer',{success:false,status:"Rejected",to:this.props.state.email});
    }
        })


        this.socket.on('AnswerToCall',(responseData)=>
        {
            alert('call response aaya')
            if(responseData.success)
            {
             this.setState({callStatus:true})
            }
            else
            {
                this.setState({callStatus:false})
                
            }
        })
    }


    createRoom()
    {
        
        
        fetch('http://localhost:4000/generateRoomId').then(response => response.json()).then((response)=>{
            
            console.log(response)
           
          
            if(response.success)
            {
                this.props.setRoom(response.roomId)
             
                this.setState({redirect:true})
            }
        })
    }


    joinRoom()
    {
        if(!this.state.roomId) 
        {

            alert("Please Enter room Id");
            return;
        }
                this.props.setRoom(this.state.roomId)
                this.setState({redirect:true})
            
        
    }

    render() { 
       console.log(this.props.state)
       if(this.state.redirect)
       {
           return <Redirect to='/room' />
       }
        return (
            <div className='outerContainer'>

        <div className='Form_Container'>

        <div className='header'>
        <div> <h4>Welcome, {this.props.state.name}</h4></div>
                   </div>
           <div className='createRoom'>
               <div className='createRoomTitle'><h3>create Room:-</h3></div>
               <button className='createRoomButton' onClick={this.createRoom}> Click</button>
               </div>
               <div className='Join'>
                 <h4>Join Room</h4>
               <div className='joinContainers'>
               <div className='connectUser'>
                   
                   < div className='header'><h3>Users:-</h3></ div>
                   <div className='listUsers'>
                    
                    {
this.state.users.filter((user)=>user.email!==this.props.state.email).map((user)=>{
   
    console.log("user")
return (
    <div className='userRow'>
        <div className="userName">{user.name}</div><div className='callicon' onClick={()=>this.call(user)}><img src={require('../images/call.png')} /></div>
        </div>
)})
                    }
                       </div>
                       </div>


               <div className='joinRoom'>


               <h8>Join Video Call</h8>
                   <input placeholder='Enter Unique Room Id:-' onChange={(e)=>this.setState({roomId:e.target.value})} />
                       <button onClick={this.joinRoom}>Join</button>
                   </div>
</div>
                   </div>
            </div>
            </div>
          );
    }
}
const mountStateToProps=(state)=>({
state:state
})

const mountDispatchToProps=(dispatch)=>({

setRoom:(room)=>dispatch(Actions.SetRoomIdAction(room)),


})
    

export default  connect(mountStateToProps,mountDispatchToProps)(OptionPage);