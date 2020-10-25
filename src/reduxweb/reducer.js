import {Types} from './types'
import _ from  'lodash'
let initialState={
    firstName:'',
    email:'',
    user:null,
}
const reducer=(state=initialState,action)=>{

    switch (action.type) {
        case Types.AddUserName:
            return  {...state,firstName:action.payload};
            
        case Types.AddEmail:
            
            return {...state,email:action.payload};    
       
        case Types.AddUser:
            return {...state,user:action.payload};  
     case Types.CREATE_ITEM:
        {
            console.log(action);

            let item=action.payload;
            let newItems={id:state.items.length+1,description:item.name,date:item.date,isCompleted:false}
            let newState= _.cloneDeep(state);
            newState.items.push(newItems);
            return newState;

        }
    case Types.DELETE_ITEM:
        {
            let newState=_.cloneDeep(state);
            let index=_.findIndex(newState.items,{id:action.payload})
            newState.items.splice(index,1);
            return newState


        }
    case Types.EDIT_ITEM:
        {
                console.log(action);


                let newState=_.cloneDeep(state);
                let item=action.payload;
                let index=_.findIndex(newState.items,{id:item.id})
              newState.items[index]=item;
                return newState
    
                

               
    
        }

        case Types.MARK_COMPLETE:
            {
                let newState=_.cloneDeep(state);
                let index=_.findIndex(newState.items,{id:action.payload})
              newState.items[index].isCompleted=true;
                return newState
    
    
            }
    
        default:
            return state;
         
    
    }

}


export default reducer;