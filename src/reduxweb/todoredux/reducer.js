import Actions from './action'
import _ from  'lodash'

const defaultstate={
    items:[],
}

const todoReducer=(state=defaultstate,action)=>
{
switch(action.type)
{
    case Actions.Types.CREATE_ITEM:
        {
            console.log(action);

            let item=action.payload;
            let newItems={id:state.items.length+1,description:item.name,date:item.date,isCompleted:false}
            let newState= _.cloneDeep(state);
            newState.items.push(newItems);
            return newState;

        }
    case Actions.Types.DELETE_ITEM:
        {
            let newState=_.cloneDeep(state);
            let index=_.findIndex(newState.items,{id:action.payload})
            newState.items.splice(index,1);
            return newState


        }
    case Actions.Types.EDIT_ITEM:
        {
                console.log(action);


                let newState=_.cloneDeep(state);
                let item=action.payload;
                let index=_.findIndex(newState.items,{id:item.id})
              newState.items[index]=item;
                return newState
    
                

               
    
        }

        case Actions.Types.MARK_COMPLETE:
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

export default todoReducer;