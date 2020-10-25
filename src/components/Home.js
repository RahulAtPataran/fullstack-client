import React, { Component, useState } from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client'
import  * as Actions from '../reduxweb/actions'
import {Redirect} from 'react-router-dom'
import './home.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {withRouter} from 'react-router-dom';

const Home=(props)=>{



    const [redirect,setRedirect]=useState(false);
    const [activeScreen,setActiveScreen]=useState("login");
 

     const [email,setEmail]=useState("")
     const [first_name,setFirstName]=useState("")
     const [last_name,setLastName]=useState("");
     const [address,setAddress]=useState("");
     const [email2,setEmail2]=useState("")
     const [password,setPassword]=useState("")
     const [password2,setPassword2]=useState("");
     const [confirmPassword,setConfirmPassword]=useState("");
  
     const [passMatch,setPassMatch]=useState(true)

useState(()=>{

if(props.state.user)
{
    setRedirect(true);

}

},[])


const onLogin=()=>
{

    if(!(email && password))
    {
      alert("All Field Required");
    }

    fetch("http://localhost:4000/api/auth/login",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            email,
            password,

        })
    }).then(res=>res.json()).then(res=>{


        if(res)
        {

        props.addUser(res);

             
    setRedirect(true);

        }
        else
        {
            alert(res.message);
            alert("error")
        }
    
    
    
    
    }).catch(error=>{
        alert(error);
    })


 
    
}



const onRegister=()=>{
if(!(email2 && first_name && last_name && address && password2))
{
    alert("All Fields required");
    return;
}

    fetch("http://localhost:4000/api/auth/register",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
        "email": email2,
        "firstName": first_name,
        "lastName": last_name,
        "address": address,
        "password":password2
    }
    )
}).then(res=>res.json()).then(res=>{

  
    props.addUser(res);
         
    setRedirect(true);

  


}).catch(error=>{
    alert(error);
})

}

const verifyPassword=(pass)=>{

    if(pass===password2)
    {

        setPassMatch(true)
    }
    else
    {
        setPassMatch(false);
    }

}

        if(redirect)
        {
          props.history.push("/events");
        }
        return (
            <div className='outerContainer'>

        <div className='FormContainer'>
            <div style={{display:'flex',flexDirection:"row"}}>
            <h2 onClick={()=>{setActiveScreen('login')}} className="loginDivButton">Login</h2>

            <h2> / </h2>

            <h2 onClick={()=>{setActiveScreen('register')}} className="registerDivButton" >Register</h2>

            </div>
            {
                activeScreen==='login'?
                <div style={{alignSelf:'center',width:'90%'}}>
              <h4>Email</h4>
                 <div className='mardiv'>
                   
             <input className='nameInput' name='email'  onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <h4>Password</h4>
                 <div className='mardiv'>
                   
             <input className='nameInput' type='password' name='password'  onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className='button'>
             <button className='submitButton' onClick={onLogin} > Login</button>
             </div>
            
            </div>:
            <div style={{alignSelf:'center',width:'90%'}}>
                   <h4>Email</h4>
                 <div className='mardiv'>
                   
             <input className='nameInput' name='email'  onChange={(e)=>setEmail2(e.target.value)} />
            </div>

         
           
            <h4>First Name</h4>
            <div className='mardiv'>
            
             <input className='nameInput' name='first_name'  onChange={(e)=>setFirstName(e.target.value)}  />
             </div>
             <h4>Last Name</h4>
             <div className='mardiv'>
            
             <input className='nameInput' name='last_name'  onChange={(e)=>setLastName(e.target.value)}  />
            </div>
            <h4>Address</h4>
            <div className='mardiv'>
            
             <input className='nameInput' name='address'  onChange={(e)=>setAddress(e.target.value)}  />
            </div>
            <h4>Password</h4>
            <div className='mardiv'>
             <input className='nameInput' type='password' security={true} onChange={(e)=>setPassword2(e.target.value)} placeholder='Enter Password' />
            </div>
            <h4>Confirm Password</h4>
            <div className='mardiv'>
             <input className={"nameInput"} type='password' onChange={(e)=>verifyPassword(e.target.value)} security={true}  placeholder='ReEnter Password' />
           
            </div>
            {passMatch?"":<p style={{color:'red'}}>Password does not match</p>}

             <div className='button'>
             <button className='submitButton' onClick={onRegister} > Register</button>
             </div>
             </div>
           

    }
            </div>
            </div>
          );
    }
const mountStateToProps=(state)=>({
state:state
})

const mountDispatchToProps=(dispatch)=>({

addUser:(payload)=>{dispatch(Actions.AddUser(payload))}

})
    

export default  connect(mountStateToProps,mountDispatchToProps)(withRouter(Home));