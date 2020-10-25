import React, { Component, useState } from 'react';
import {
  withStyles,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Grid,
  TextField,
  Button,
  FormControl
} from "@material-ui/core";
import './todo.css'
import AddModal from './addTodoModal'
import EditModal from './editTodoModal'
import DeleteIcon from "@material-ui/icons/Delete";
import CheckBox from "react-animated-checkbox"
import ACTIONS from "../todoredux/action";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

const Todo=(props)=>{
  
const [isAddModalActive,setIsAddModalActive]=useState(false)
const [isEditModalActive,setIsEditModalActive]=useState(false)
const [listBy,setListBy]=useState(1);
const [item,setItem]=useState();
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
        <CheckBox
  checked={item.isCompleted}
  checkBoxStyle={{
    checkedColor: "#34b93d",
    size: 30,
    unCheckedColor: "#b8b8b8"
  }}
  duration={400}
  onClick={()=>props.markComplete(item.id)}
/>
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

  

  const  handleDelete = event => {
    // delete the item from the store
   props.deleteItem(event.target.value);
  };

 
  
    const { classes } = props;

    return (
      <div className='container'>
        <div className='innerContainer'>
          <div className='header'>
        <h1 className='title'>Todo's</h1>
        <div className='adddiv'>

<img className='addIcon' onClick={()=>setIsAddModalActive(true)} src={'https://t3.ftcdn.net/jpg/03/59/40/34/240_F_359403494_bFUNC8BUgYEFyYjtgrEV4fRqHby56nIY.jpg'} />
<select onChange={(e)=>{setListBy(e.target.value)
console.log(listBy)
}} className='select' name="sort" id="sort">

  <option value={1}>All</option>
  <option value={2}>Active</option>
  <option value={3}>Completed</option>
  
</select>
        
          </div>

        </div>
        <div className='todos'>
          <Grid item container>
            <div className={classes.demo}>
             {generate()}
            </div>
          </Grid>
        </div>
        </div>
        <AddModal
         isOpen={isAddModalActive}
        
         close={()=>{setIsAddModalActive(false)}}
         
        />
        {
          isEditModalActive?
         <EditModal
         isOpen={isEditModalActive}
         item={item}
         close={()=>{setIsEditModalActive(false)}}
         
        />:null
        }
        </div>
    );
  }


const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  
  deleteItem: id => dispatch(ACTIONS.deleteItem(id)),
  markComplete: id=> dispatch(ACTIONS.markComplete(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Todo));