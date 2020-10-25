
const Types={
    CREATE_ITEM: "CREATE_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    EDIT_ITEM: 'EDIT_ITEM',
    MARK_COMPLETE:'MARK_COMPLETE',
};


const createItem=task=>
({
    type: Types.CREATE_ITEM,
    payload :task
});

const deleteItem =id =>
({
    type: Types.DELETE_ITEM,
    payload: id
});


const editItem=task=>
({
    type: Types.EDIT_ITEM,
    payload :task
});

const markComplete=id=>
({
    type: Types.MARK_COMPLETE,
    payload :id
});

export default {
    createItem,deleteItem,editItem,markComplete,Types
}